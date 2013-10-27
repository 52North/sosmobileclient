var Services = (function() {
  return Backbone.Collection.extend({
    model: Service,
    url: 'http://sosrest.irceline.be/api/v0/services.json',
  });
})();
