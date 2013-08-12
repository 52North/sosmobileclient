var AddController;

AddController = (function() {

  function AddController(services, stations, settings) {
    this.services = services;
    this.stations = stations;
    this.settings = settings;
    this.historyTimeseries = new HistoryTimeseries();

    this.tabs = { tabs: [
        { 'name': 'MAP', 'id': 'map-content', "active": "active", 'content-class': 'full-content'},
        { 'name': 'BROWSER', 'id': 'browser-content'},
        { 'name': 'SEARCH', 'id': 'search-content'},
        { 'name': 'HISTORY', 'id': 'history-content'}
      ]};
    $(document).on('click', '#addTabs a', this.navigateTab);

    Backbone.Mediator.subscribe('timeseries:add', this.addTimeseries, this);
    Backbone.Mediator.subscribe('legend:timeseries:delete', this.removeTimeseries, this);
    Backbone.Mediator.subscribe('app:booted', this.build, this);
  };

  AddController.prototype.build = function(param) {
    
    template = Handlebars.helpers.getTemplate('add-tabs');
    html = template(this.tabs);

    this.el = $("#add-content");
    this.el.empty().html(html);
    
    bv = new BrowserView(this.services);
    bv.setElement($('#tab-browser-content'));
    bv.render();

    mv = new MapView({'collection': this.stations, 'currentSettings': this.settings});
    mv.setElement($('#tab-map-content'));
    mv.render();
    mv.drawStations();

    hv = new HistoryView({'collection': this.historyTimeseries});
    $('#tab-history-content').empty().html(hv.render().el);
  };

  AddController.prototype.addTimeseries = function(timeseries) {
    currentTimeseries.add(timeseries);
  }

  AddController.prototype.removeTimeseries = function(timeseries) {
    currentTimeseries.remove(timeseries);
  }

  AddController.prototype.navigateTab = function(e) {
    e.preventDefault();
    $(e.currentTarget).tab('show');
    $('#addTabContent').find('.tab-pane').removeClass('active');
    $("#" + $(e.currentTarget).data('target')).addClass('active');
  }

  return AddController;

})();