
// This is our API key
var APIKey = "MW9S-E7SL-26DU-VV8V";

// Here we are building the URL we need to query the database
var queryURL = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=19th&key=" + APIKey + '&json=y';

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})

  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    // console.log(queryURL);

    // Log the resulting object
    var results = response.data;

    console.log(response);

    
    
    // var example = response.childNodes[0].innerHTML;
    var date = response.root.date;
    var time = response.root.time;
    var stationName = response.root.station[0].name;
    var stationEtd = response.root.station[0].etd;

// var jsonStation = JSON.stringify(station);
console.log(stationEtd[0].estimate[0]);
    console.log(stationName);
    console.log(stationEtd[0].estimate[0].minutes);
    console.log(stationEtd[0].estimate[0].direction);
    // console.log(stationEtd[0].estimate[0].length);
    // console.log(stationEtd[0].estimate[0].delay);


// ========== for loop


    for (var i = 0; i < stationEtd.length; i++) {
      var destinationData = $("<div class='destination'></div>");
      // var rating = results[i].rating;
      var p = $("<h3>").html("Destination: " + stationEtd[i].destination + " - Direction: " + stationEtd[i].estimate[0].direction);

        destinationData.append(p);

        // console.log(stationEtd[0].estimate.length);

      for (var j = 0; j < stationEtd[i].estimate.length; j++) {
        var p2 = $("<p>").html("Arrives in: " + stationEtd[i].estimate[j].minutes);

        // console.log(stationEtd[i].estimate[j].minutes);
        destinationData.append(p2);

      }


      $(".misc").append(destinationData);
    }



    // Transfer content to HTML
    $(".info").html("<h2>" + date + "</h2>");
    $(".station").html("<h3>" + time + "</h3>");
    $(".etd").html("<h1>" + stationName + "</h1>");



  });