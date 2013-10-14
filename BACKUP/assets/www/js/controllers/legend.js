var LegendController = (function() {

  function LegendController(currentTimeseries) {
    this.currentTimeseries = currentTimeseries;

    this.build();
  };

  LegendController.prototype.build = function(timeseries) {
    var legend = new LegendView({'collection': this.currentTimeseries});
    $('#legend-content').html(legend.render().el);
  };
  
  return LegendController;

})();