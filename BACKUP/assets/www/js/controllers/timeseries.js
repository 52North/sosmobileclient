var TimeseriesController = (function() {

  function TimeseriesController(currentTimeseries, historyTimeseries) {
    this.currentTimeseries = currentTimeseries;
    this.historyTimeseries = historyTimeseries;

    Backbone.Mediator.subscribe('timeseries:add', this.addTimeseries, this);
    Backbone.Mediator.subscribe('legend:timeseries:delete', this.removeTimeseries, this);
    Backbone.Mediator.subscribe('legend:timeseries:color:choose', this.showColorDialog, this);

    Backbone.Mediator.subscribe('history:timeseries:delete', this.removeTimeseriesFromHistory, this);
  };

  TimeseriesController.prototype.showColorDialog = function(timeseries) {
    new ColorView({'model': timeseries}).render();
  };

  TimeseriesController.prototype.addTimeseries = function(timeseries) {
    Helpers.updateAddDate(timeseries.get('id')); //first!
    this.currentTimeseries.add(timeseries);
    this.historyTimeseries.add(timeseries);
    Backbone.Mediator.publish('timeseries:added', timeseries);
  };

  TimeseriesController.prototype.removeTimeseries = function(timeseries) {
    this.currentTimeseries.remove(timeseries);
    Backbone.Mediator.publish('timeseries:removed', timeseries);
  };

  TimeseriesController.prototype.removeTimeseriesFromHistory = function(timeseries) {
    this.historyTimeseries.remove(timeseries);
  };
  
  return TimeseriesController;

})();