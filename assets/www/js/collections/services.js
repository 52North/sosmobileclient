var Services = Backbone.Collection.extend({
  model: Service,
  url: 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services.json',
  //url: 'js/_json/services.json',

  initialize: function() {
  	this.fetch();
  }
});