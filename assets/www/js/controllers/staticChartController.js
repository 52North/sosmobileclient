var StaticChartController = (function() {

  function ChartController(currentTimeseries) {
    _.extend(this, Backbone.Events);

    this.currentTimeseries = currentTimeseries;

    this.listenTo(this.currentTimeseries, 'change:color',    function() {Backbone.Mediator.publish('chart:currentTimeseries:color:change');});
    this.listenTo(this.currentTimeseries, 'add',             this.addTimeseries);
    this.listenTo(this.currentTimeseries, 'reset',           this.loadAll);
    this.listenTo(window.settings,        'change:timespan', this.loadAll);
    this.listenTo(this.currentTimeseries, 'remove',          this.updateDataCollection);
    this.listenTo(this.currentTimeseries, 'change:hidden',   this.updateDataCollection);

    this.build();
    //this.updateDataCollection();
  };

  ChartController.prototype.build = function() {
    this.el = $("#chart-content");
  };

  return StaticChartController;
})();