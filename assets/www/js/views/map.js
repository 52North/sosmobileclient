var MapView = Backbone.View.extend({ 

  events: {
    'click .posBtn': 'toggleTracking'
  },

  initialize: function(){
    this.collection = this.options.stations;
    me = this;
    me.listenTo(me.collection, 'reset', me.render);
    me.collection.fetch({reset: true});
    
    tracking = false;
  },

  render: function() {
    map = $("<div>");
    map.attr("id", "map");
    this.$el.append(map);

    this.map = map.geomap({
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
      this.map.geomap("append", stations.at(model).get('geometry'), { color: "#bb0000", width: 10, height: 10, borderRadius: 10 }, false);
    });

    //my position switch
    posBtnWrapper = $("<div>").addClass('map-buttons');
    this.posBtn = $("<a>").addClass('btn posBtn');
    this.updatePosBtn();
    this.posBtn.html("<i class='icon-map-marker'></i>");
    posBtnWrapper.append(this.posBtn);

    this.$el.append(posBtnWrapper);
  },
  updatePosBtn: function() {
    if (tracking) {
      this.posBtn.removeClass('btn-default');
      this.posBtn.addClass('btn-primary');
    } else {
      this.posBtn.removeClass('btn-primary');
      this.posBtn.addClass('btn-default');
    }
  },
  toggleTracking: function(event) {
    tracking = !tracking;
    if (tracking) {
      this.watchId = navigator.geolocation.watchPosition(this.updateLocation, this.onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    } else {
      navigator.geolocation.clearWatch(this.watchId);
    }
    this.updatePosBtn();
  },
  updateLocation: function(position) {
    coord = [position.coords.longitude, position.coords.latitude];
    if (this.map) {
      var accuracyBuffer = position.coords.accuracy / this.map.geomap("option", "pixelSize");
      this.map.geomap("append", { type: "Point", coordinates: coord }, { color: "#2176B7", width: accuracyBuffer, height: accuracyBuffer, borderRadius: accuracyBuffer }, false);
      this.map.geomap("option", "center", coord);
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