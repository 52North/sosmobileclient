var TimeseriesCollection = (function() {
  return Backbone.Collection.extend({
    model: Timeseries,
    fetch: function() {
      //no fetch
    }
  });
})();