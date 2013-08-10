var MapView = Backbone.View.extend({ 

  currentSettings: null,

  events: {
    'click .posBtn': 'locate'
  },

  initialize: function(){
    me = this;

    me.listenTo(this.collection, 'reset', me.drawStations);
    //mediator listen to loading -> draw stations
  },

  render: function() {
    console.log("render map");
    map = $("<div>");
    map.attr("id", "map");
    this.$el.empty().append(map);

    this.map = map.geomap({
      center: [10,50],
      zoom: 4,
      mode: "find",
      cursors: {'find': 'crosshair'},
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
      },
      {
        id: "marker-layer",
        type: "shingled",
        src: ""
      }]
    });

    this.markerLayer = $("#marker-layer").geomap( "option", "shapeStyle", { width: 0, height: 0 } );

    //my position switch
    posBtnWrapper = $("<div>").addClass('map-buttons');
    this.posBtn = $("<a>").addClass('btn posBtn btn-primary');
    this.posBtn.html("<i class='icon-screenshot' id='posBtnIcon'></i>");
    posBtnWrapper.append(this.posBtn);

    this.$el.append(posBtnWrapper);
  },
  drawStations: function() {
    this.map.geomap( "empty", false );

    color = stringToColor(this.options.currentSettings.get('currentProvider'));
    _.each(this.collection.models, function (elem, index) {
      this.map.geomap("append", elem.get('geometry'), { color: "#" + color, width: 10, height: 10, borderRadius: 10 }, false);
    });

    this.map.geomap( "refresh" );
  },
  locate: function(event) {
    this.posBtn.find('#posBtnIcon').removeClass("icon-screenshot");
    this.posBtn.find('#posBtnIcon').addClass("icon-spinner icon-spin");

    navigator.geolocation.getCurrentPosition(this.updateLocation, this.onError, { timeout: 5000, enableHighAccuracy: true });
  },
  updateLocation: function(position) {
    me.posBtn.find('#posBtnIcon').removeClass("icon-spinner icon-spin");
    me.posBtn.find('#posBtnIcon').addClass("icon-screenshot");

    coord = [position.coords.longitude, position.coords.latitude];
    if (this.map) {
      me.markerLayer.geomap("remove", me.point);
      me.point = { type: "Point", coordinates: coord };

      me.markerLayer.geomap( "append", me.point, "" );

      this.map.geomap("option", "center", coord);
      this.map.geomap("option", "zoom", 12)
    }
  },
  onError: function(error) {
    me.posBtn.find('#posBtnIcon').removeClass("icon-spinner icon-spin");
    me.posBtn.find('#posBtnIcon').addClass("icon-screenshot");

    showErrorMessage("Can't locate you", error.message);
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