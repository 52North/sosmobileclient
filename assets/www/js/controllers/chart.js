var ChartController = (function() {


  function ChartController(currentTimeseries) {
    _.extend(this, Backbone.Events);

    this.currentTimeseries = currentTimeseries;
    
    this.listenTo(this.currentTimeseries, 'change', this.updateDataCollection);
    this.build();
    this.updateDataCollection();
  };

  ChartController.prototype.build = function() {
    this.el = $("#chart-content");

    var ccv = new ChartControlsView();
    $(this.el).append(ccv.render().$el);

    this.currentTimeseriesDataCollection = new TimeseriesDataCollection();

    this.chartView = new ChartView({'collection': this.currentTimeseriesDataCollection});
    $(this.el).append(this.chartView.render().el);
  };

  ChartController.prototype.updateDataCollection = function() {
    //add to this.currentTimeseriesDataCollection
    var tsData = this.currentTimeseriesDataCollection;
    tsData.reset();
    Backbone.Mediator.publish('chart:currentTimeseries:fetchingData');
    this.currentTimeseries.each(function(meta) {
      if (!meta.get('hidden')) {
        var tsd = new TimeseriesData({'timeseriesMetaData': meta, 'timespan': window.settings.get('timespan')});
        tsData.add(tsd);
        tsd.fetch();
      }
    });

  };
  
  return ChartController;

})();