var MapController = (function() {

  function MapController(stations, services, element) {
    this.services = services;
    this.stations = stations;
    this.el = element;

    Backbone.Mediator.subscribe('map:station:findAndShow', this.findAndAdd, this);
    Backbone.Mediator.subscribe('map:user:locate', this.locateUser, this);

    this.build();
  };

  MapController.prototype.build = function() {
    var mv = new MapView({'collection': this.stations, 'services': this.services});
    mv.setElement(this.el);
    mv.render();
    mv.drawStations(); //TODO necessary?
  };

  MapController.prototype.findAndAdd = function (latlng) {
    var lat = latlng.lat;
    var lng = latlng.lng;
    
    var matches = this.stations.getByCoordinates([lng, lat]);
    var stationsView = new StationsView({'collection': matches});

    $('#temp-modals').html(stationsView.render().el);
    $(stationsView.el).modal('show');
  };

  MapController.prototype.locateUser = function () {
    var geolocationSuccess = function(location) {
      Backbone.Mediator.publish('map:user:locate:success', location);
    };
    var geolocationError = function(error) {
      Backbone.Mediator.publish('map:user:locate:error', error);
      Helpers.showErrorMessage("Positioning error", error.message);
    };

    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, { timeout: 60000, enableHighAccuracy: true });
  };

  
  return MapController;

})();