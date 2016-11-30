var getCity = function() {
    var request = {
        city: $("#cities").val(),
        country: $("#country").val().toLowerCase(),
        coordinates: 'coordinates',
        url: 'url'
    };
    // console.log(request);
    $.ajax({
            url: "http://www.muselia.com/apimuseums",
            data: request,
            dataType: "JSONP",
            type: "GET",
        })
        .done(function(result) {
            showSearchResults(result);
            // finished//
            initMap(result);
        });
};


var showSearchResults = function(museums) {
    // what is museum? some obj
    var result = $(".templates-hidden").clone();
    var html = "";
    var results = [];
    for (var i = 0; i < museums.length; i++) {
        //console.log(museums[i]);
        var museumElem = result.find(".museum_name a");
        html += "<li><a href='museums[i].url '>" + museums[i].name + "</a>" + "<br/>" + museums[i].address + "<br/>" + "<img src='" + museums[i].image + "'></li>";
        // results.push(museumElem);
        // console.log(museumElem);
    }
    // console.log(results);
    $(".results").append(html);
    // hints: Museums is an array
    // when we have arrays, to work with them the best way is usually
    // by looping. We can loop using "for" loops

    // var result = $(".templates-hidden").clone();
    // var museumElem = result.find(".museum_name a");
    // museumElem.text(?.name);
    // museumElem.attr()

};

var infowindow;

function initMap(locations) {
    // this is what happens when the page is loaded
    // extracting coordinates from the API
    //grab lat and long from coordinates, 
    //split into location using parseFloat

    var location = locations[0];
    var coords = location["coordinates"].split(",");
    var uluru = {
        lat: parseFloat(coords[0]),
        lng: parseFloat(coords[1])
    };
    //console.log(uluru);
    var map = new google.maps.Map(document.getElementById("museum_map"), {
        zoom: 10,
        center: uluru
    });
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //console.log(locations);

    var markers = locations.map(function(location, i) {

        var coords = location["coordinates"].split(",");
        var marker = new google.maps.Marker({
            position: {
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1])
            },
            label: labels[i % labels.length],
        });
        var contentString = "<div id='content'>" +
            "<div id='siteNotice'>" + "</div>" +
            "<h1 id='firstHeading' class='firstHeading'>" + location.name + "</h1>" +
            "<div id='bodyContent'>" + location.address + "</div>";

        infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        });
        marker.addListener('click', function() {
            if (infowindow) {
                infowindow.close();
            }
            infowindow.open(map, marker);
        });

        return marker;

    });
    //    markers.addListener("click", function(){
    //        infowindow.open(map, marker);
    //    });
    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });


};


var countryCity = {
    spain: ["Madrid", "Barcelona"],
    france: ["Paris", "Lyon", "Marseille"],
    ireland: ["Dublin", "Cork"]
};

$(document).ready(function() {
    $(".museumSearch").click(function(event) {
        event.preventDefault();
        $(".results").html("");
        getCity();
    });
    // handles our dropdowns
    $("#country").on('input', function() {

        var country = this.value.toLowerCase();
        //console.log(country);//
        /// start here.
        var cities = countryCity[country]; // spain
        //console.log(cities);
        var html = "";
        for (var i = 0; i < cities.length; i++) {
            // cities[0] ; or i <<-----
            html += '<option value="' + cities[i].toLowerCase() + '">' + cities[i] + '</option>';
        }

        $("#cities").empty();
        $("#cities").append(html);

    });

});
