var errorId = 0;

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

function showErrorMessage(title, message) {
  id = 'error' + errorId++;
  template = Handlebars.helpers.getTemplate('errorMessage');
  html = template({
    id: id,
    icon: 'icon-warning-sign',
    title: title,
    message: message
  });
  $('#temp-modals').append(html);
  modal = $('#' + id);
  modal.modal('show');

  modal.on('hidden.bs.modal', function () {
    modal.remove();
  });
}

/*
 *  Finds the topmost/leftmost and the bottommost/rightmost station
 */
function boundingBoxFromStations(stationCollection) {
  if (stationCollection.length != 0) {
    firstElemCoord = stationCollection.at(0).get('geometry').coordinates;
    topmost = firstElemCoord[1];
    bottommost = firstElemCoord[1];
    leftmost = firstElemCoord[0];
    rightmost = firstElemCoord[0];

    stationCollection.each(function(element) {
      geom = element.get('geometry').coordinates; //[longitue, latitude] = [x,y]

      if (geom[0] > rightmost) {
        rightmost = geom[0];
      }
      if (geom[0] < leftmost) {
        leftmost = geom[0];
      }
      if (geom[1] > topmost) {
        topmost = geom[1];
      }
      if (geom[1] < bottommost) {
        bottommost = geom[1];
      }
    });
    return [parseFloat(leftmost), parseFloat(bottommost), parseFloat(rightmost), parseFloat(topmost)];
  }
}

window.ratio = $(document).width() / $(document).height(); 
    
$(window).resize(function() {
  newRatio = $(document).width() / $(document).height();
  
  if (newRatio != window.ratio) {
    window.ratio = newRatio;
    Backbone.Mediator.publish("screen:change:ratio", ratio);
    //console.log(window.ratio);
  }
});