var AddView = Backbone.View.extend({
  el: '#add-content',
  events: {
    'click #addTabs a': 'navigateTab'
  },

  initialize: function(){
    console.log("init data view");
  },
  render: function() {
    var tabs = { tabs: [
        { 'name': 'BROWSER', 'id': 'browser-content', "active": "active"},
        { 'name': 'MAP', 'id': 'map-content', 'content-class': 'full-content'},
        { 'name': 'SEARCH', 'id': 'search-content'},
        { 'name': 'HISTORY', 'id': 'history-content'}
      ]};

    var template = Handlebars.helpers.getTemplate('add-tabs');
    var html = template(tabs);

    this.$el.html(html);
    
    bv = new BrowserView(this.options.services);
    bv.setElement($('#tab-browser-content'));
    bv.render();

    mv = new MapView({'stations': this.options.stations});
    mv.setElement($('#tab-map-content'));

    sv = new SettingsView();
    sv.setElement($('#settings-content'));
    sv.render();
  },

  navigateTab: function(e) {
    e.preventDefault();
    $(e.currentTarget).tab('show');
    $('#addTabContent').find('.tab-pane').removeClass('active');
    $("#" + $(e.currentTarget).data('target')).addClass('active');
  }
});