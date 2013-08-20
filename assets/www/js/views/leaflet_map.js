var MapView = Backbone.View.extend({ 
  events: {
    'click .posBtn': 'locate'
  },
  initialize: function(){
    me = this;
    this.settings = window.settings;

    me.listenTo(this.collection, 'reset', me.drawStations);

    Backbone.Mediator.subscribe('station:locate', function(timeseries) {
      me.map.geomap("option", "center", timeseries.get('location').coordinates);
      me.map.geomap("option", "zoom", 12)
      me.map.geomap( "refresh" );
    }, this);
  },

  render: function() {
    map = $("<div>");
    map.attr("id", "map");
    map.width(this.$el.parent.width);
    map.height(500);
    this.$el.empty().append(map);

    var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
      cloudmadeAttribution = '',
      cloudmade = L.tileLayer(cloudmadeUrl, {maxZoom: 17, attribution: cloudmadeAttribution}),
      latlng = L.latLng(50, 10);
    L.Icon.Default.imagePath = '/img';

    this.map = L.map('map', {center: latlng, zoom: 5, layers: [cloudmade]});
    this.markers = L.markerClusterGroup();

    //my position btn
    posBtnWrapper = $("<div>").addClass('map-buttons');
    this.posBtn = $("<a>").addClass('btn posBtn btn-primary');
    this.posBtn.html("<i class='icon-screenshot' id='posBtnIcon'></i>");
    posBtnWrapper.append(this.posBtn);

    this.$el.append(posBtnWrapper);
  },
  drawStations: function() {
    if (this.collection.length > 0) {
      if (this.map.hasLayer(this.markers)) {
        this.map.removeLayer(this.markers);
      }

      this.markers = L.markerClusterGroup();
      var markers = this.markers;
      _.each(this.collection.models, function (elem, index) {
        var geom = elem.get('geometry').coordinates;
        var marker = L.marker(new L.LatLng(geom[1], geom[0]), { title: "title" });
        marker.on('click', me.findAndAdd);
        markers.addLayer(marker);
      });
      this.map.addLayer(this.markers);

      //zoom to extend
      this.map.fitBounds(boundingBoxFromStations(this.collection));
    }
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
      //me.markerLayer.geomap("remove", me.point);
      me.point = { type: "Point", coordinates: coord };

      //me.markerLayer.geomap( "append", me.point, "" );

      //this.map.geomap("option", "center", coord);
      //this.map.geomap("option", "zoom", 12)
    }

  },
  onError: function(error) {
    me.posBtn.find('#posBtnIcon').removeClass("icon-spinner icon-spin");
    me.posBtn.find('#posBtnIcon').addClass("icon-screenshot");

    showErrorMessage("Can't locate you", error.message);
  },

  findAndAdd: function (e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    matches = me.collection.getByCoordinates([lng, lat]);
    stationsView = new StationsView({'collection': matches});

    $('#temp-modals').html(stationsView.render().el);
    $(stationsView.el).modal();
  }
});