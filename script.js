var client = new carto.client({
  apiKey: "095b7a9eb18ae059b51c24894a3f89cfc027dac2",
  username: "Hassabum",
});

var source = new carto.source.SQL("SELECT * FROM Landmarks");

// var layer = new cart.layer.Layer(source, style);

// client.addLayer(layer);
// client.getLeafletLayer().addTo(map);

var dropdownChoice = document.querySelector(".dropdown");

dropdownChoice.addEventListener("change", function (e) {
  var locationSelected = e.target.value;

  if (locationSelected === "suakin") {
    var info = source.setQuery(
      "SELECT name FROM Landmarks WHERE name = '" + locationSelected + "'"
    );
    console.log("hello");
    console.log(info);
  }
});
