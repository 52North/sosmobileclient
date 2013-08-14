var ChartController = (function() {

  function ChartController(currentTimeseries) {
    this.currentTimeseries = currentTimeseries;

    this.tabs = {
      id: 'chart-tabs',
      tabs: [
        { 'name': 'CHART', 'id': 'chart1-content', "active": "active", 'content-class': 'full-content'},
        { 'name': 'CHART PREFERENCES', 'id': 'chart-settings-content'}
      ]};

    this.build();
    //Backbone.Mediator.subscribe('timeseries:add', this.addTimeseries, this);

  };

  ChartController.prototype.build = function(param) {
    
    template = Handlebars.helpers.getTemplate('tabs');
    html = template(this.tabs);

    this.el = $("#chart-content");
    this.el.empty().html(html);
    
    cv = new ChartView({'model': currentTimeseries});
    cv.setElement($('#tab-chart1-content'));
    cv.render();
  };
  
  return ChartController;

})();