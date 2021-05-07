/* global L, carto */

var map = L.map("map").setView([15.972552, 30.204163], 6);

// Add base layer
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
  {
    maxZoom: 18,
  }
).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: "default_public",
  username: "hassabum",
});

// Initialze data source
var source = new carto.source.SQL("SELECT * FROM combined_layers_1");

// Create style for the data
var style = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: red;
  }
`);

// Add style to the data
var layer = new carto.layer.Layer(source, style, {
  featureClickColumns: ["name", "wiki_link"],
});

layer.on("featureClicked", function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = "<h1>" + event.data["name"] + "</h1>";
  content += "<div>" + event.data["wiki_link"] + "</div>";

  // If you're not sure what data is available, log it out:
  console.log(event.data);

  var popup = L.popup();
  popup.setContent(content);

  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});

// Add the data to the map as a layer
client.addLayer(layer);
client.getLeafletLayer().addTo(map);

var dropdownChoice = document.querySelector(".dropdown");
var suakinContainer = document.getElementById("suakin-info");
var natMuseumContainer = document.getElementById("national-museum-info");

dropdownChoice.addEventListener("change", function (e) {
  var locationSelected = e.target.value;

  if (locationSelected === "suakin") {
    natMuseumContainer.style.display = "none";
    suakinContainer.style.display = "block";
    map.setView([19.111307, 37.336961], 11);
  } else if (locationSelected === "national-museum") {
    suakinContainer.style.display = "none";
    natMuseumContainer.style.display = "block";
    map.setView([15.60597, 32.510107], 17);
  } else {
    suakinContainer.style.display = "none";
    natMuseumContainer.style.display = "none";
    map.setView([15.972552, 30.204163], 6);
  }
});
