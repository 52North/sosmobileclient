var ChartController = (function() {

   function ChartController(currentTimeseries) {
    this.currentTimeseries = currentTimeseries;

    this.build();
  };

  ChartController.prototype.build = function(param) {
    var tabs = {
      id: 'chart-tabs',
      tabs: [
        { 'name': 'CHART', 'id': 'chart1-content', "active": "active", 'content-class': 'full-content'},
        { 'name': 'RANGE', 'icon': 'icon-time', 'id': 'chart-settings-content'},
        { 'name': 'VIEW', 'icon': 'icon-eye-open', 'id': 'chart-settings-content'}
      ]
    };

    var template = Handlebars.helpers.getTemplate('tabs');
    var html = template(tabs);

    this.el = $("#chart-content");
    this.el.empty().html(html);

    var ccv = new ChartControlsView();
    $('ul#chart-tabs').append(ccv.render().$el);

    var cv = new ChartView({'collection': this.currentTimeseries});
    cv.setElement($('#tab-chart1-content'));
    cv.render();
  };
  
  return ChartController;

})();