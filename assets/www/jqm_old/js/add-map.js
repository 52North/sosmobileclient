function updateLocation(position) {
  coord = [position.coords.longitude, position.coords.latitude];
  if (map) {
    map.geomap("empty", false);
    var accuracyBuffer = position.coords.accuracy / map.geomap("option", "pixelSize");
    map.geomap("append", { type: "Point", coordinates: coord }, { color: "#cc0", width: accuracyBuffer, height: accuracyBuffer, borderRadius: accuracyBuffer }, false);
    map.geomap("append", { type: "Point", coordinates: coord });
  }
};

$(document).on('click', "#locate", function(e) {
  e.preventDefault();
  if (typeof coord != "undefined") {
    map.geomap("option", "center", coord);
  } else {
    console.log("Position is not ready jet.");
  }
});


function onError(error) {
  console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

var map, coord;
navigator.geolocation.watchPosition(updateLocation, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });