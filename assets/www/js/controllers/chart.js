var ChartController = (function() {

  function ChartController(currentTimeseries) {
    this.currentTimeseries = currentTimeseries;

    this.build();
    //Backbone.Mediator.subscribe('timeseries:add', this.addTimeseries, this);

  };

  ChartController.prototype.build = function(param) {
    tabs = {
      id: 'chart-tabs',
      tabs: [
        { 'name': 'CHART', 'id': 'chart1-content', "active": "active", 'content-class': 'full-content'},
        { 'name': 'CONFIG', 'id': 'chart-settings-content'}
      ]};

    template = Handlebars.helpers.getTemplate('tabs');
    html = template(tabs);

    this.el = $("#chart-content");
    this.el.empty().html(html);
    
    cv = new ChartView({'collection': this.currentTimeseries});
    cv.setElement($('#tab-chart1-content'));
    cv.render();
  };
  
  return ChartController;

})();