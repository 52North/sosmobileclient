var ServiceController = (function() {

  function ServiceController(services, stations) {
    this.services = services;
    this.stations = stations;

    Backbone.Mediator.subscribe('service:change', this.changeService, this);

    this.build();
  };

  ServiceController.prototype.build = function() {
    var servicesView = new ServicesView({'collection': this.services});
    var serviceModalContainer = $("<div id='service-modal'>");
    serviceModalContainer.append(servicesView.render().el);
    $('#global-modals').append(serviceModalContainer);
  };

  ServiceController.prototype.changeService = function(newServiceName) {
    window.settings.set('currentProvider', newServiceName);
    this.stations.url = generateStationsUrl(newServiceName);
    
    this.stations.fetch({'reset': true});
    //Todo after sync event!! window.settings.set('lastStationUpdate', new Date().toLocaleString());
  };
  
  return ServiceController;

})();