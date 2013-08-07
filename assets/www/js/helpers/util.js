function generateStationsUrl(provider) {
  if (!provider) {
  	provider = "PEGELONLINE";
  }
  return "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services/" + provider.toString() + "/stations.json";
}