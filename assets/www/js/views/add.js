var AddView = Backbone.View.extend({
  el: '#add-content',
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
    
    Gumby.initialize('tabs');
    
    bv = new BrowserView(this.options.services);
    bv.setElement($('#browser-content'));
    bv.render();

    mv = new MapView({'services': this.options.services});
    mv.setElement($('#map-content'));
    mv.render();

    sv = new SettingsView();
    sv.setElement($('#settings-content'));
    sv.render();


  }
});