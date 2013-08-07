function generateStationsUrl(provider) {
  if (!provider) {
    provider = "PEGELONLINE";
  }
  return "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services/" + provider.toString() + "/stations.json";
}

function collectionModelsToJSONArray(collection) {
  json_array = [];
  _.each(collection.models, function (elem) {
  	json_array.push(elem.toJSON());
  });
  return json_array;
}