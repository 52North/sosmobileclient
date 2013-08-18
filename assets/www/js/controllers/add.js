var AddController;

AddController = (function() {

  function AddController(services, stations, historyTimeseries) {
    this.services = services;
    this.stations = stations;
    this.stations = stations;
    this.historyTimeseries = historyTimeseries;
    this.currentTimeseries = window.currentTimeseries;

    Backbone.Mediator.subscribe('timeseries:add', this.addTimeseries, this);
    Backbone.Mediator.subscribe('legend:timeseries:delete', this.removeTimeseries, this);
    Backbone.Mediator.subscribe('app:booted', this.build, this);
  };

  AddController.prototype.build = function(param) {
    tabs = { 
      id: "add-tabs",
      tabs: [
        { 'name': 'MAP', 'id': 'map-content', "active": "active"},
        { 'name': 'BROWSER', 'id': 'browser-content', 'content-class': 'full-content'},
        { 'name': 'SEARCH', 'id': 'search-content', 'content-class': 'full-content'},
        { 'name': 'HISTORY', 'id': 'history-content', 'content-class': 'full-content'}
      ]};

    template = Handlebars.helpers.getTemplate('tabs');
    html = template(tabs);

    this.el = $("#add-content");
    this.el.empty().html(html);
    
    bv = new BrowserView(this.services);
    bv.setElement($('#tab-browser-content'));
    bv.render();

    mv = new MapView({'collection': this.stations, 'currentTimeseries': currentTimeseries});
    mv.setElement($('#tab-map-content'));
    mv.render();
    mv.drawStations();

    hv = new HistoryView({'collection': this.historyTimeseries});
    $('#tab-history-content').empty().html(hv.render().el);
  };

  AddController.prototype.addTimeseries = function(timeseries) {
    if (this.currentTimeseries.contains(timeseries)) {
      console.log("already");
    } else {
      timeseries.set('addedAt', new Date().getTime());
      timeseries.set('service', window.settings.get("currentProvider")); //TODO this is awful
      timeseries.updateUrl();
      this.currentTimeseries.add(timeseries);
    }
  }

  AddController.prototype.removeTimeseries = function(timeseries) {
    this.currentTimeseries.remove(timeseries);
  }
  
  return AddController;

})();