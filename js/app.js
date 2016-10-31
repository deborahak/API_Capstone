//showResults --returns top 10 museums
/*var showSearchResults = function() {
    var results =
}*/
$(document).ready(function() {
    $(".city-search").submit(function(event) {
        event.preventDefault();
        $(".results").html("");
        var tags = $(this).find("input[name='cityMuseums']").val();
        getCity();
    });
    $(".country-search").submit(function(event) {
        event.preventDefault();
        $("results").html("");
        var tag = $(this).find("input[name='countryMuseums'").val();
        getCountry();
    });
});

var getCity = function(tags) {
    var request = {
        city: $("#city").val(), ///'new york, or berlin or any city on earth', // hint: use jQuery's .val() some how ;-)
        country: "united-states", // for now.
        //order:
    };

    $.ajax({
            url: "http://www.muselia.com/apimuseums",
            data: request,
            dataType: "JSONP",
            type: "GET",
        })
        .done(function(result) {
            console.log(result);

        });

}

var getCountry = function(tag) {
    var request = {
        country: $("#country").val(),
    };
    $.ajax({
        url: "http://www.muselia.com/apimuseums",
        data: request,
        dataType: "JSONP",
        type: "GET",
    })
    .done(function(result) {
            console.log(result);

        });
};
