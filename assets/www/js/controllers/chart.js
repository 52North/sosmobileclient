var ChartController = (function() {

   function ChartController(currentTimeseries) {
    this.currentTimeseries = currentTimeseries;

    this.build();
  };

  ChartController.prototype.build = function(param) {
    this.el = $("#chart-content");

    var ccv = new ChartControlsView();
    $(this.el).append(ccv.render().$el);

    var cv = new ChartView({'collection': this.currentTimeseries});
    $(this.el).append(cv.render().el);
  };
  
  return ChartController;

})();