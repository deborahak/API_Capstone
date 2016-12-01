var getCity = function() {
    var request = {
        city: $("#cities").val(),
        country: $("#country").val().toLowerCase(),
        coordinates: 'coordinates',
        url: 'url'
    };
    $.ajax({
            url: "http://www.muselia.com/apimuseums",
            data: request,
            dataType: "JSONP",
            type: "GET",
        })
        .done(function(result) {
            showSearchResults(result);
            initMap(result);
        });
};


var showSearchResults = function(museums) {
    //museum info in ul format
    var result = $(".templates-hidden").clone();
    var html = "";
    var results = [];
    for (var i = 0; i < museums.length; i++) {

        var museumElem = result.find(".museum_name a");
        html += "<li><a href='" + museums[i].url + "' target='_blank'>" + museums[i].name + "</a>" + "<br/>" + museums[i].address + "<br/>" + "<img src='" + museums[i].image + "'></li>";
    };

    $(".results").append(html);
};

var infowindow;

function initMap(locations) {
    //grab latitude and longitude from coordinates, 
    //split into location using parseFloat
    var location = locations[0];
    var coords = location["coordinates"].split(",");
    var centerpoint = {
        lat: parseFloat(coords[0]),
        lng: parseFloat(coords[1])
    };
    var map = new google.maps.Map(document.getElementById("museum_map"), {
        zoom: 10,
        center: centerpoint
    });
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //clickable map markers
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


        marker.addListener('click', function() {
            console.log(infowindow);
            if (infowindow) {
                infowindow.close();
            }
            infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 200
            });
            infowindow.open(map, marker);
        });

        return marker;

    });
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

        var cities = countryCity[country];

        var html = "";
        for (var i = 0; i < cities.length; i++) {
            html += '<option value="' + cities[i].toLowerCase() + '">' + cities[i] + '</option>';
        }

        $("#cities").empty();
        $("#cities").append(html);

    });

});
