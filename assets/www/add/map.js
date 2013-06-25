$('#map').live("created", function() {
          $("#map").height(calcContentHeight());
          var map = $("#map").geomap(
              {
                center : [ -71.147, 42.472 ],
                zoom : 10,
                click : function(e, geo) {
                  map.geomap("append", geo);
                },
                services : [ {
                  "class" : "osm",
                  type : "tiled",
                  src : function(view) {
                    return "http://tile.openstreetmap.org/" + view.zoom + "/"
                        + view.tile.column + "/" + view.tile.row + ".png";
                  },
                  attr : "&copy; OpenStreetMap &amp; contributors, CC-BY-SA",
                  style : {
                    visibility : "visible",
                    opacity : 1.0
                  }
                } ]
              });
          // onSuccess Callback
          // This method accepts a `Position` object, which contains
          // the current GPS coordinates
          //
          var onSuccess = function(position) {
            $('#loc').html('Latitude: ' + position.coords.latitude + '\n'
                + 'Longitude: ' + position.coords.longitude + '\n'
                + 'Altitude: ' + position.coords.altitude + '\n' + 'Accuracy: '
                + position.coords.accuracy + '\n' + 'Altitude Accuracy: '
                + position.coords.altitudeAccuracy + '\n' + 'Heading: '
                + position.coords.heading + '\n' + 'Speed: '
                + position.coords.speed + '\n' + 'Timestamp: '
                + position.timestamp + '\n');
          };

          // onError Callback receives a PositionError object
          //
          function onError(error) {
            alert('code: ' + error.code + '\n' + 'message: ' + error.message
                + '\n');
          }

          navigator.geolocation.watchPosition(onSuccess, onError);

        });