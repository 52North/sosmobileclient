var MapView = Backbone.View.extend({
  events: {
    'click .posBtn': 'locate',
    'click .providerBtn': 'openProviderModal',
  },

  initialize: function(){
    me = this;
    this.settings = window.settings;

    $(document).on("click", ".availableServiceLink", function(event){
      me.changeProvider(event);
    });

    this.listenTo(this.collection, 'reset', this.drawStations);
    this.listenTo(this.collection, 'sync:start', this.stationUpdateStart);
    this.listenTo(this.collection, 'sync', this.stationUpdateSuccess);
    this.listenTo(this.options.services, 'sync', this.renderProviderModal);

    Backbone.Mediator.subscribe('station:locate', function(timeseries) {
      var pos = new L.LatLng(timeseries.get('station').geometry.coordinates[1], timeseries.get('station').geometry.coordinates[0]);
      this.map.setZoom(17);
      this.map.panTo(pos);
    }, this);
  },

  render: function() {
    this.map = $("<div>");
    this.map.attr("id", "map");
    this.$el.empty().append(this.map);

    var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
      cloudmadeAttribution = '&copy; OpenStreetMap &amp; Contributors',
      cloudmade = L.tileLayer(cloudmadeUrl, {maxZoom: 17, attribution: cloudmadeAttribution}),
      latlng = L.latLng(50, 10);
    L.Icon.Default.imagePath = 'img';

    this.map = L.map('map', {center: latlng, zoom: 5, layers: [cloudmade]});
    this.markers = L.markerClusterGroup();

    //my position btn
    this.btnWrapper = $("<div>").addClass('map-buttons');
    this.posBtn = $("<a>").addClass('btn posBtn btn-primary');
    this.posBtn.html("<i class='icon-screenshot' id='posBtnIcon'></i>");
    
    var providerBtn = $("<a>").addClass('btn providerBtn btn-primary');
    providerBtn.html("<i class='icon-cloud-download' id='provider-icon'></i>");
    this.btnWrapper.prepend(providerBtn);

    this.btnWrapper.append(this.posBtn);
    this.$el.append(this.btnWrapper);
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
        var marker = L.marker(new L.LatLng(geom[1], geom[0]), { /* title: 'station name' */ });
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

    if (me.map.hasLayer(me.yourPos)) {
      me.map.removeLayer(me.yourPos);
    }

    var myIcon = L.icon({
      iconUrl: 'img/marker.png',
      shadowUrl: 'img/marker-shadow.png',

      iconSize:     [40, 46], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [20, 46], // point of the icon which will correspond to marker's location
      shadowAnchor: [10, 41],  // the same for the shadow
      popupAnchor:  [0, -46] // point from which the popup should open relative to the iconAnchor
    });

    me.yourPos = L.marker(new L.LatLng(position.coords.latitude, position.coords.longitude), { title: "You are here.", icon: myIcon });
    me.map.addLayer(me.yourPos);

    me.map.panTo(me.yourPos.getLatLng(), {animate: true});
    me.map.setZoom(12);
  },
  onError: function(error) {
    me.posBtn.find('#posBtnIcon').removeClass("icon-spinner icon-spin");
    me.posBtn.find('#posBtnIcon').addClass("icon-screenshot");

    showErrorMessage("Positioning error", error.message);
  },

  findAndAdd: function (e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    matches = me.collection.getByCoordinates([lng, lat]);

    stationsView = new StationsView({'collection': matches});

    $('#temp-modals').html(stationsView.render().el);
    $(stationsView.el).modal();
  },

  openProviderModal: function(event) {
    event.preventDefault();
    Backbone.Mediator.publish("service:choose", event);
  },

  stationUpdateStart: function() {
    $('#provider-icon').removeClass('icon-cloud-download');
    $('#provider-icon').addClass('icon-spinner icon-spin');
  },

  stationUpdateSuccess: function() {
    $('#provider-icon').removeClass('icon-spinner icon-spin');
    $('#provider-icon').addClass('icon-ok');
    setTimeout(function() {
      $('#provider-icon').removeClass('icon-ok');
      $('#provider-icon').addClass('icon-cloud-download');
    }, 750);
  }


});