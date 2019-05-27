$(document).ready(function() {

  var stationAbbr = "19th";

$.ajax({
  type: 'GET',//or 'GET'
  url: 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y',
  data: {/*second_api_data*/}
})

.done(function(data){

var stationData = data.root.stations.station;
// console.log(stationData[0].abbr);

console.log(stationData.length);


var stations = $("<select id='select'></select>");


for (var i = 0; i < stationData.length; i++) {
  // var rating = results[i].rating;
  // var p = $("<p>").html("Station: " + stationData[i].name);
  

  stations.append($("<option value=" + stationData[i].abbr + ">" + stationData[i].name + "</option>"));
  // var p = $("<option>").html($("<option value=" + stationData[i].abbr + ">" + stationData[i].name + "</option>"));

    // stations.append(p);

  }

  $(".stations").append(stations);

//   var e = document.getElementById("select");
// var strUser = e.options[e.selectedIndex].value;
// console.log(strUser);



});


// on click event to set abbr station data.
var po = document.getElementById("foo"); // Find the paragraph element in the page
po.onclick = showAlert; // Add onclick function to element
  
function showAlert(event) {
    var e = document.getElementById("select");
  var strUser = e.options[e.selectedIndex].value;
console.log(strUser);


stationAbbr = strUser;
loadStation();
}







function loadStation() {


// This is our API key
var APIKey = "MW9S-E7SL-26DU-VV8V";

// Here we are building the URL we need to query the database
var queryURL = "https://api.bart.gov/api/etd.aspx?cmd=etd&orig=" +stationAbbr + "&key=" + APIKey + '&json=y';

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})


  // We store all of the retrieved data inside of an object called "data"
  .done(function(data) {

    // Log the resulting object
    var results = data.data;

    // console.log(data);
    
    // var example = data.childNodes[0].innerHTML;
     date = data.root.date;
     time = data.root.time;
     stationName = data.root.station[0].name;
     stationEtd = data.root.station[0].etd;

// var jsonStation = JSON.stringify(station);
// console.log(stationEtd[0].estimate[0]);
//     console.log(stationName);
//     console.log(stationEtd[0].estimate[0].minutes);
//     console.log(stationEtd[0].estimate[0].direction);
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

}

loadStation();

});