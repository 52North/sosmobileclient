var CatalogController = (function() {

  function CatalogController(services, stations, historyTimeseries) {
    this.services = services;
    this.stations = stations;
    this.historyTimeseries = historyTimeseries;

    this.build();
  };

  CatalogController.prototype.build = function(param) {
    var tabs = { 
      id: "add-tabs",
      tabs: [
        { 'name': 'MAP', 'id': 'map-content', "active": "active"},
        //{ 'name': 'SEARCH', 'id': 'search-content', 'content-class': 'full-content'},
        { 'name': 'HISTORY', 'id': 'history-content', 'content-class': 'full-content'}
      ]};

    var template = Handlebars.helpers.getTemplate('tabs');
    var html = template(tabs);

    this.el = $("#add-content");
    this.el.empty().html(html);
    
    //container to the controller!
    var mapController = new MapController(this.stations, this.services, $('#tab-map-content'))

    var hv = new HistoryView({'collection': this.historyTimeseries});
    $('#tab-history-content').empty().html(hv.render().el);

    var sv = new SearchView({});
    $('#tab-search-content').empty().html(sv.render().el);
  };

  
  return CatalogController;

})();