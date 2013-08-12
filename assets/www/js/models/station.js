var Station = Backbone.Model.extend({

  initialize: function() {
    this.parseTimeseries();
    this.on('change:timeseries', this.parseTimeseries);
  },

  parseTimeseries: function() {
    timeseries = new TimeseriesCollection();
    station = this;
    $.each(this.get('properties').timeseries, function(index, element) {
      element['station'] = station;
      timeseries.add(new Timeseries(element));
    });
    this.timeseries = timeseries;
  }
});
