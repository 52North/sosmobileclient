var Services = Backbone.Collection.extend({
  model: Service,
  url: 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services.json',
  areYouThere: function() {
    alert("yes sir");
  }
});