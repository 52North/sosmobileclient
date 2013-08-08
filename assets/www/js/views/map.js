var MapView = Backbone.View.extend({ 

  currentSettings: null,

  events: {
    'click .posBtn': 'toggleTracking'
  },

  initialize: function(){
    me = this;
    tracking = false;

    me.listenTo(this.collection, 'reset', me.drawStations); //only redraw points TODO
  },

  render: function() {
    console.log("render map");
    map = $("<div>");
    map.attr("id", "map");
    this.$el.empty().append(map);

    this.map = map.geomap({
      center : [ 7.5, 52 ],
      zoom : 5,
      mode: "find",
      cursors: { find: "crosshair" },
      click: me.findAndAdd,
      services: [{
        "class" : "osm",
        type : "tiled",
        src : function(view) {
          return "http://tile.openstreetmap.org/" + view.zoom + "/" + view.tile.column + "/" + view.tile.row + ".png";
        },
        attr : "&copy; OpenStreetMap (CC-BY-SA)",
        style : {
          visibility : "visible",
          opacity : 1.0
        }
      }]
    });

    //my position switch
    posBtnWrapper = $("<div>").addClass('map-buttons');
    this.posBtn = $("<a>").addClass('btn posBtn');
    this.updatePosBtn();
    this.posBtn.html("<i class='icon-screenshot'></i>");
    posBtnWrapper.append(this.posBtn);

    this.$el.append(posBtnWrapper);

  },
  drawStations: function() {
    this.map.geomap( "empty", false );
    color = stringToColor(this.options.currentSettings.get('currentProvider'));
    _.each(this.collection.models, function (elem, index) {
      this.map.geomap("append", elem.get('geometry'), { color: "#" + color, width: 10, height: 10, borderRadius: 10 }, false);
    });

    $("#map").geomap( "refresh" );
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
      this.map.geomap("remove", me.point);
      me.point = { type: "Point", coordinates: coord };
      this.map.geomap("append", me.point, { color: "#2176B7", width: 20, height: 20, borderRadius: 20 }, true);
      this.map.geomap("option", "center", coord);
      this.map.geomap("option", "zoom", 12)
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
    default:
      coords = [];
      $.each(result, function () {
        coords.push( this.coordinates );
      });

      matches = me.collection.getByCoordinates(coords);

      var modalsTemplate = Handlebars.helpers.getTemplate('map-choose-station-dialog');
      var modalsHtml = modalsTemplate({'stations': matches}); //obj
      $('#temp-modals').html(modalsHtml);
      $('#map-choose-station-dialog').modal();
    }   
  }
});