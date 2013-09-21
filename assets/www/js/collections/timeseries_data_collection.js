var TimeseriesDataCollection = (function() {
  return Backbone.Collection.extend({
    model: TimeseriesData,
  });
})();