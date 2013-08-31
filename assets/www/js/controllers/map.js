var MapController = (function() {

  function MapController(stations, services, element) {
    this.services = services;
    this.stations = stations;
    this.el = element;

    this.build();
  };

  MapController.prototype.build = function() {
    var mv = new MapView({'collection': this.stations, 'services': this.services});
    mv.setElement(this.el);
    mv.render();
    mv.drawStations(); //TODO necessary?
  };
  
  return MapController;

})();