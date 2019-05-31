$(document).ready(function() {
  var stationAbbr = "12th";
  var APIKey = "MW9S-E7SL-26DU-VV8V";

  $.ajax({
    type: "GET", //or 'GET'
    url:
      "https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y",
    data: {
      /*second_api_data*/
    }
  })
  .done(function(data) {
    var stationData = data.root.stations.station;
    // console.log(stationData[0].abbr);
    // console.log(stationData.length);
    var stations = $("<select id='select'></select>");

    for (var i = 0; i < stationData.length; i++) {
      stations.append( $( "<option value=" + stationData[i].abbr + ">" + stationData[i].name + "</option>" ) );
    }

    $(".stations").append(stations);
  });

  // on click event to set abbr station data.
  var btnSubmit = document.getElementById("submit"); // Find the paragraph element in the page
  btnSubmit.onclick = submitStation; // Add onclick function to element


  function submitStation() {
    var e = document.getElementById("select");
    var strUser = e.options[e.selectedIndex].value;
    console.log(strUser);

    stationAbbr = strUser;

    $(".station").empty();
    $(".etd-north").empty();
    $(".etd-south").empty();

    loadStationNorth();
    loadStationSouth();
  }

  // setInterval(function(){
  //   showAlert();

  // }, 30000);


  function loadStationNorth() {
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + stationAbbr + "&key=" + APIKey + "&dir=n&json=y";

    // Here we run our AJAX call 
    $.ajax({
      url: queryURL, method: "GET" })

      // We store all of the retrieved data inside of an object called "data"
      .done(function(data) {

        // date = data.root.date;
        // time = data.root.time;

        stationName = data.root.station[0].name.toUpperCase();
        stationEtd = data.root.station[0].etd;

        // ========== for loop
        for (var i = 0; i < stationEtd.length; i++) {
          var destinationData = $("<div class='destination'></div>");

          // var direction = $( "<h3 class='direction'>" + stationEtd[i].estimate[0].direction + "</h3>" );

          var p = $( "<h3><i class='fas fa-dot-circle' style='color:" + stationEtd[i].estimate[0].hexcolor + ";'></i><i class='fas fa-minus icon-minus' style='color:" + stationEtd[i].estimate[0].hexcolor + ";'></i> " + stationEtd[i].destination + "</h3>" );

          // destinationData.append(direction);
          destinationData.append(p);

          for (var j = 0; j < stationEtd[i].estimate.length; j++) {
            var p2 = $("<p>").html(
              "Arrives in: " +
                stationEtd[i].estimate[j].minutes +
                " - " +
                stationEtd[i].estimate[0].length +
                " car train"
            );

            destinationData.append(p2);
          }

          $(".etd-north").append(destinationData);
        }

        // Transfer content to HTML index page
        $(".date").html("<h2 class='bold'>" + data.root.date + "</h2>");
        $(".time").html("<h4>" + data.root.time + "</h4>");

        $(".station").html("<h1 class='bold'>" + stationName + "</h1>");
      });

  }



  function loadStationSouth() {
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + stationAbbr + "&key=" + APIKey + "&dir=s&json=y";

    // Here we run our AJAX call 
    $.ajax({
      url: queryURL, method: "GET" })

      // We store all of the retrieved data inside of an object called "data"
      .done(function(data) {

        stationName = data.root.station[0].name.toUpperCase();
        stationEtd = data.root.station[0].etd;

        // ========== for loop
        for (var i = 0; i < stationEtd.length; i++) {
          var destinationData = $("<div class='destination'></div>");
          // var rating = results[i].rating;
          console.log();
          var p = $( "<h3><i class='fas fa-dot-circle' style='color:" + stationEtd[i].estimate[0].hexcolor + ";'></i><i class='fas fa-minus icon-minus' style='color:" + stationEtd[i].estimate[0].hexcolor + ";'></i> " + stationEtd[i].destination + "</h3>" );

          destinationData.append(p);

          for (var j = 0; j < stationEtd[i].estimate.length; j++) {
            var p2 = $("<p>").html(
              "Arrives in: " +
                stationEtd[i].estimate[j].minutes +
                " - " +
                stationEtd[i].estimate[0].length +
                " car train"
            );

            destinationData.append(p2);
          }

          $(".etd-south").append(destinationData);
        }

 
      });

  }

  loadStationNorth();
  loadStationSouth();
});
