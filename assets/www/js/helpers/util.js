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

function stringToColor(string) {
	if (string == undefined)
		return "000000";
	//luminance is: (0.2126*R) + (0.7152*G) + (0.0722*B)  has to be > 50 ??
	return intToRGB(hashCode(string));
}

//M. Jessup, http://stackoverflow.com/questions/2464745/compute-hex-color-code-for-an-arbitrary-string
function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    return ((i>>16)&0xFF).toString(16) + 
           ((i>>8)&0xFF).toString(16) + 
           (i&0xFF).toString(16);
}