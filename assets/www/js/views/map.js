define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'jquerygeo'
],
function($, _, Backbone, Handlebars, JqueryGeo){
  var MapView = Backbone.View.extend({
    
    
    initialize: function(){
      //navigator.geolocation.watchPosition(updateLocation, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
      this.variable = "I'm public";
    },

    render: function() {
      this.$el.geomap({
        center : [ 7.652469,51.934145 ],
        zoom : 20,
        click : function(e, geo) {
          //this.$el.geomap("append", geo);
        },
        services: [{
          "class" : "osm",
          type : "tiled",
          src : function(view) {
            return "http://tile.openstreetmap.org/" + view.zoom + "/"
                + view.tile.column + "/" + view.tile.row + ".png";
          },
          attr : "&copy; OpenStreetMap (CC-BY-SA)",
          style : {
            visibility : "visible",
            opacity : 1.0
          }
        }]
      });
    }


  });

  function updateLocation(position) {
    coord = [position.coords.longitude, position.coords.latitude];
    if (map) {
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

  return MapView;
});