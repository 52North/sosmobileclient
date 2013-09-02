var Helpers = (function() {
  var errorId = 0;
  
  window.ratio = $(document).width() / $(document).height(); 
    
  $(window).resize(function() {
    var newRatio = $(document).width() / $(document).height();
    
    if (newRatio != window.ratio) {
      window.ratio = newRatio;
      Backbone.Mediator.publish("screen:change:ratio", ratio);
      //console.log(window.ratio);
    }
  });

  return  {
    generateStationsUrl: function(provider) {
      if (!provider) {
        var provider = "PEGELONLINE";
      }
      return "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services/" + provider.toString() + "/stations.json?show=expanded";
    },

    stringToColor: function(string) {
      if (string == undefined)
        return "000000";
      //luminance is: (0.2126*R) + (0.7152*G) + (0.0722*B)  has to be > 50 ??
      return this.intToRGB(this.hashCode(string));
    },

    //M. Jessup, http://stackoverflow.com/questions/2464745/compute-hex-color-code-for-an-arbitrary-string
    hashCode: function (str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    },

    intToRGB: function(i){
      var rgb = ((i>>16)&0xFF).toString(16) + 
             ((i>>8)&0xFF).toString(16) + 
             (i&0xFF).toString(16);
      rgb = rgb.toString();
      while (rgb.length < 6) {
        rgb = "0" + rgb;
      }
      return rgb;
    },

    showErrorMessage: function(title, message) {
      var id = 'error' + errorId++;
      var template = Handlebars.helpers.getTemplate('errorMessage');
      var html = template({
        id: id,
        icon: 'icon-warning-sign',
        title: title,
        message: message
      });
      $('#temp-modals').append(html);
      var modal = $('#' + id);
      modal.modal('show');

      modal.on('hidden.bs.modal', function () {
        modal.remove();
      });
    },

    calcLuminance: function(hex) { 
      var c = hex.substring(1);
      var rgb = parseInt(c, 16);   // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff;  // extract red
      var g = (rgb >>  8) & 0xff;  // extract green
      var b = (rgb >>  0) & 0xff;  // extract blue

      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    },

    /**
     *  Finds the topmost/leftmost and the bottommost/rightmost station
     */
    boundingBoxFromStations: function(stationCollection) {
      if (stationCollection.length != 0) {
        var firstElemCoord = stationCollection.at(0).get('geometry').coordinates;
        var topmost = firstElemCoord[1];
        var bottommost = firstElemCoord[1];
        var leftmost = firstElemCoord[0];
        var rightmost = firstElemCoord[0];

        stationCollection.each(function(element) {
          var geom = element.get('geometry').coordinates; //[longitue, latitude] = [x,y]

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
        return [[parseFloat(bottommost), parseFloat(leftmost)], [parseFloat(topmost), parseFloat(rightmost)]];
      }
    }
  };
})();