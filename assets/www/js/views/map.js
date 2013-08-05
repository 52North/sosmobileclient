var MapView = Backbone.View.extend({ 

  initialize: function(){
    this.collection = this.options.stations;
    me = this;
    me.listenTo(me.collection, 'reset', me.render);
    me.collection.fetch({reset: true});
    
    //navigator.geolocation.watchPosition(this.updateLocation, this.onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
  },


  render: function() {
    map = $("<div>");
    map.attr("id", "map");
    this.$el.append(map);

    map.geomap({
      center : [ 7.652469,51.934145 ],
      zoom : 10,
      mode: "find",
      cursors: { find: "crosshair" },
      click: me.findAndAdd,
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

    stations = this.collection;
    _.forEach(stations, function(index, model, list){
      map.geomap("append", stations.at(model).get('geometry'), { color: "#bb0000", width: 10, height: 10, borderRadius: 10 }, false);
    });

  },
  updateLocation: function(position) {
    coord = [position.coords.longitude, position.coords.latitude];
    if (this.$el) {
      var accuracyBuffer = position.coords.accuracy / this.$el.geomap("option", "pixelSize");
      this.$el.geomap("append", { type: "Point", coordinates: coord }, { color: "#cc0", width: accuracyBuffer, height: accuracyBuffer, borderRadius: accuracyBuffer }, false);
      this.$el.geomap("option", "center", coord);

    }
  },
  onError: function(error) {
    console.log(error);
  },

  findAndAdd: function (e, geo) {
    var result = map.geomap("find", geo, 8), outputHtml = "";
    switch(result.length) {
    case 0:
      //do nothing
      break;
    case 1:
      //render add
      console.log(result[0].coordinates);
      var addModalsTemplate = Handlebars.helpers.getTemplate('map-adddialog');
      var addModalsHtml = addModalsTemplate(); //obj
      //$('#global-modals').html(addModalsHtml);
      break;
    default:
      //render choose
       $.each(result, function () {
        outputHtml += ("Found a " + this.type + " at " + this.coordinates );
      });
      alert(outputHtml);
    }


   
  }
});