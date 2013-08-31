var TimeseriesController = (function() {

  function TimeseriesController(currentTimeseries) {
    this.currentTimeseries = currentTimeseries;

    Backbone.Mediator.subscribe('timeseries:add', this.addTimeseries, this);
    Backbone.Mediator.subscribe('legend:timeseries:delete', this.removeTimeseries, this);
  };

  TimeseriesController.prototype.addTimeseries = function(timeseries) {
    timeseries.set('addedAt', new Date().getTime());
    this.currentTimeseries.add(timeseries);
  };

  TimeseriesController.prototype.removeTimeseries = function(timeseries) {
    this.currentTimeseries.remove(timeseries);
  };
  
  return TimeseriesController;

})();