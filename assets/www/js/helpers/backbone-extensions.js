(function() {
  var sync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    model.trigger('sync:start', method, model, options);
    sync.apply(this, arguments);
  };

  
})();