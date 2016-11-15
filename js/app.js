var getCity = function() {
    var request = {
        city: $("#cities").val(),
        country: $("#country").val().toLowerCase()
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
        });
};

var showSearchResults = function(museums) {
    // what is museum? some obj
    var result = $(".templates-hidden").clone();
    var html = "";
    var results = [];
    for (var i = 0; i < museums.length; i++) {
        console.log(museums[i]);
        var museumElem = result.find(".museum_name a");
        html += "<li><a href=''>" + museums[i].name + "</a>"+ museums[i].address + "<br/>" + "<img src='" + museums[i].image + "'></li>";
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

function initMap(){
    var map = new google.maps.Map(document.getElementById("museum_map"), {
        zoom: 4
    });
    var marker = new google.maps.Marker({
        marker_properties ,
      //  position: ,
        map: map
    });
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
            html += '<option value="' + cities[i].toLowerCase() + '">' + cities[i] + '</option>';        }

        $("#cities").empty();
        // #citis is empty
        $("#cities").append(html);

    });

});
