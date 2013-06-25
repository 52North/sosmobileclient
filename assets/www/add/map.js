function updateLocation(position) {
  $('#loc').html('Latitude: ' + position.coords.latitude + '\n'
      + 'Longitude: ' + position.coords.longitude + '\n'
      + 'Altitude: ' + position.coords.altitude + '\n' + 'Accuracy: '
      + position.coords.accuracy + '\n' + 'Altitude Accuracy: '
      + position.coords.altitudeAccuracy + '\n' + 'Heading: '
      + position.coords.heading + '\n' + 'Speed: '
      + position.coords.speed + '\n' + 'Timestamp: '
      + position.timestamp + '\n');
};

function onError(error) {
  console.log('code: ' + error.code + '\n' + 'message: ' + error.message
      + '\n');
}