var CurrentTimeseries = Backbone.Collection.extend({
  model: TimeSeries,
  areYouThere: function() {
    alert("yes sir");
  }
});