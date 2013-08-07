var AddView = Backbone.View.extend({
  el: '#add-content',
  events: {
    'click #addTabs a': 'navigateTab'
  },

  initialize: function(){
    //console.log("init add view");
  },
  render: function() {
    var tabs = { tabs: [
        { 'name': 'MAP', 'id': 'map-content', "active": "active", 'content-class': 'full-content'},
        { 'name': 'BROWSER', 'id': 'browser-content'},
        { 'name': 'SEARCH', 'id': 'search-content'},
        { 'name': 'HISTORY', 'id': 'history-content'}
      ]};

    var template = Handlebars.helpers.getTemplate('add-tabs');
    var html = template(tabs);

    this.$el.html(html);
    
    bv = new BrowserView(this.options.services);
    bv.setElement($('#tab-browser-content'));
    bv.render();

    mv = new MapView({'collection': this.options.stations, 'currentSettings': this.options.currentSettings});
    mv.setElement($('#tab-map-content'));
  },

  navigateTab: function(e) {
    e.preventDefault();
    $(e.currentTarget).tab('show');
    $('#addTabContent').find('.tab-pane').removeClass('active');
    $("#" + $(e.currentTarget).data('target')).addClass('active');
  }
});