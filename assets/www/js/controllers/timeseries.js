var TimeseriesController = (function() {

  function TimeseriesController(currentTimeseries) {
    this.currentTimeseries = currentTimeseries;

    Backbone.Mediator.subscribe('timeseries:add', this.addTimeseries, this);
    Backbone.Mediator.subscribe('legend:timeseries:delete', this.removeTimeseries, this);
    Backbone.Mediator.subscribe('legend:timeseries:color:choose', this.showColorDialog, this);
  };

  TimeseriesController.prototype.showColorDialog = function(timeseries) {
    new ColorView({'model': timeseries}).render();
  };

  TimeseriesController.prototype.addTimeseries = function(timeseries) {
    this.currentTimeseries.add(timeseries);
  };

  TimeseriesController.prototype.removeTimeseries = function(timeseries) {
    this.currentTimeseries.remove(timeseries);
  };
  
  return TimeseriesController;

})();