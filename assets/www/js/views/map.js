var MapView = Backbone.View.extend({ 

  events: {
    'click .posBtn': 'toggleTracking'
  },

  initialize: function(){
    me = this;
    tracking = false;

    me.render();
    // render with tab opening once => $('#addTabs').on('shown.bs.tab'
    me.listenTo(this.collection, 'sync', me.render);
    //this.options.stations.fetch({reset: true});
  },

  render: function() {
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

    _.each(this.collection.models, function (elem) {
      this.map.geomap("append", elem.get('geometry'), { color: "#bb0000", width: 10, height: 10, borderRadius: 10 }, false);
    });

    //my position switch
    posBtnWrapper = $("<div>").addClass('map-buttons');
    this.posBtn = $("<a>").addClass('btn posBtn');
    this.updatePosBtn();
    this.posBtn.html("<i class='icon-screenshot'></i>");
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
      this.map.geomap("append", { type: "Point", coordinates: coord }, { color: "#2176B7", width: 20, height: 20, borderRadius: 20 }, false);
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
      //render add
      var addModalsTemplate = Handlebars.helpers.getTemplate('map-add-dialog');
      match = me.collection.getByCoordinate(result[0].coordinates);
      var addModalsHtml = addModalsTemplate({'station': match.toJSON()});
      $('#temp-modals').html(addModalsHtml);
      $('#map-add-dialog').modal();
      break;
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