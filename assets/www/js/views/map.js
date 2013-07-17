var MapView = Backbone.View.extend({ 

  initialize: function(){
    console.log(this.options.services)
    //navigator.geolocation.watchPosition(this.updateLocation, this.onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
  },

  render: function() {
    //this.renderSelect();

    map = $("<div>");
    map.attr("id", "map");
    this.$el.append(map);
    this.calcSize();

    map.geomap({
      center : [ 7.652469,51.934145 ],
      zoom : 10,
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

  },
  renderSelect: function() {
    var compiledTemplate = Handlebars.helpers.getTemplate('service_select');
    var html = compiledTemplate({services: this.options.services.toJSON()});
    this.$el.append(html);
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

  calcSize: function() {
    winW = window.innerWidth;
    winH = window.innerHeight;
    console.log(winH, winW);
    console.log($("#map").position());

    setTimeout(function() {
      console.log($("#map").offset());
    }, 1000);

/*
    $("#map").css("min-height", winH + 'px');
    $("#map").css("max-height", winH + 'px');
    $("#map").css("height",     winH + 'px');

    $("#map").css("width", winW + 'px');
    $("#map").css("min-width", winW + 'px');
    $("#map").css("max-width", winW + 'px');
    
    $("#map").css("z-index", '1');

*/

  }
});