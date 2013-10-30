var MapView = (function() {
  return Backbone.View.extend({
    events: {
      'click .posBtn':      'requestUserLocation',
      'click .providerBtn': 'requestProviderChange',
      'click .delete-marker-btn': 'deleteLocateStationMarker'
    },
    subscriptions: {
      'station:locate':           'locateStation',
      'service:fetch:error':      'stationUpdateSuccess',
      'map:user:locate:success':  'drawUser',
      'map:user:locate:error':    'locateUserEnd'
    },

    initialize: function(){
      this.settings = window.settings;

      this.listenTo(this.collection, 'reset', this.drawStations);
      this.listenTo(this.collection, 'sync:start', this.stationUpdateStart);
      this.listenTo(this.collection, 'sync', this.stationUpdateSuccess);
      this.listenTo(this.options.services, 'sync', this.renderProviderModal);
    },

    render: function() {
      this.map = $("<div>");
      this.map.attr("id", "map");
      this.$el.empty().append(this.map);

      var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
        cloudmadeAttribution = '&copy; OpenStreetMap &amp; Contributors',
        cloudmade = L.tileLayer(cloudmadeUrl, {maxZoom: 17, attribution: false}),
        latlng = L.latLng(50, 10);
      L.Icon.Default.imagePath = 'img';

      this.map = L.map('map', {center: latlng, zoom: 5, layers: [cloudmade]});
      this.markers = L.markerClusterGroup();

      //my position btn
      this.btnWrapper = $("<div>").addClass('map-buttons');
      this.posBtn = $("<a>").addClass('btn posBtn btn-primary');
      this.posBtn.html("<i class='icon-screenshot' id='posBtnIcon'></i>");
      
      var providerBtn = $("<a>").addClass('btn providerBtn btn-primary');
      providerBtn.html("<i class='icon-folder-open' id='provider-icon'></i>");
      this.btnWrapper.append("<br/>");
      this.btnWrapper.append(providerBtn);

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
          marker.on('click', function(marker) {
            Backbone.Mediator.publish("map:station:findAndShow", marker.latlng);
          });
          markers.addLayer(marker);
        });
        this.map.addLayer(this.markers);

        //zoom to extend
        this.map.fitBounds(Helpers.boundingBoxFromStations(this.collection));
      }
    },
    
    locateStation: function(timeseries) {
      var station = timeseries.get('station');
      var position = new L.LatLng(station.geometry.coordinates[1], station.geometry.coordinates[0]);
    
      this.deleteLocateStationMarker();

      var myIcon = L.icon({
        iconUrl: 'img/marker-icon-red.png',
        shadowUrl: 'img/marker-shadow.png',
        iconSize:     [25, 41], // size of the icon
        shadowSize:   [41, 41], // size of the shadow
        iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 41],  // the same for the shadow
        popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
      });

      this.stationMarker = L.marker(position, { icon: myIcon, zIndexOffset: 1000 });

      var popup = L.popup()
        .setLatLng(position)
        .setContent("<h3><i class='icon-screenshot'></i> Station</h3>" + station.properties.label + "<p class='text-center'><button class='btn btn-xs btn-danger delete-marker-btn'>remove this info</button></p>")
        .openOn(this.map);

      this.stationMarker.bindPopup(popup);
      this.map.addLayer(this.stationMarker);

      this.map.panTo(this.stationMarker.getLatLng(), {animate: false});
      this.map.setZoom(14);
    },

    deleteLocateStationMarker: function() {
      if (this.map.hasLayer(this.stationMarker)) {
        this.map.removeLayer(this.stationMarker);
      }
    },

    requestUserLocation: function(event) {
      this.posBtn.find('#posBtnIcon').removeClass("icon-screenshot");
      this.posBtn.find('#posBtnIcon').addClass("icon-spinner icon-spin");
    
      Backbone.Mediator.publish("map:user:locate");   
    },

    locateUserEnd: function() {
      this.posBtn.find('#posBtnIcon').removeClass("icon-spinner icon-spin");
      this.posBtn.find('#posBtnIcon').addClass("icon-screenshot");
    },

    drawUser: function(position) {
      this.locateUserEnd();

      if (this.map.hasLayer(this.userPosition)) {
        this.map.removeLayer(this.userPosition);
      }

      var myIcon = L.icon({
        iconUrl: 'img/marker-icon-user.png',
        shadowUrl: 'img/marker-shadow.png',

        iconSize:     [25, 41], // size of the icon
        shadowSize:   [41, 41], // size of the shadow
        iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [10, 42],  // the same for the shadow
        popupAnchor:  [0, -46] // point from which the popup should open relative to the iconAnchor
      });

      this.userPosition = L.marker(new L.LatLng(position.coords.latitude, position.coords.longitude), { icon: myIcon });
      this.map.addLayer(this.userPosition);

      this.map.panTo(this.userPosition.getLatLng(), {animate: true});
      this.map.setZoom(12);
    },

    requestProviderChange: function(event) {
      event.preventDefault();
      event.stopPropagation();
      Backbone.Mediator.publish("service:choose", event);
    },

    stationUpdateStart: function() {
      $('#provider-icon').removeClass('icon-folder-open');
      $('#provider-icon').addClass('icon-spinner icon-spin');
    },

    stationUpdateSuccess: function() {
      $('#provider-icon').removeClass('icon-spinner icon-spin');
      $('#provider-icon').addClass('icon-ok');
      setTimeout(function() {
        $('#provider-icon').removeClass('icon-ok');
        $('#provider-icon').addClass('icon-folder-open');
      }, 750);
    }
  });
})();