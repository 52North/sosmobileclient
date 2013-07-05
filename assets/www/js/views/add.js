define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'views/browser'
],
function($, _, Backbone, Handlebars, BrowserView){
  var AddView = Backbone.View.extend({
    el: '#add-content',
    initialize: function(){
      console.log("init data view");
    },
    render: function() {
      var tabs = { tabs: [
          { 'name': 'BROWSER', 'id': 'browser-content', "active": "active"},
          { 'name': 'MAP', 'id': 'map-content'},
          { 'name': 'SEARCH', 'id': 'search-content'},
          { 'name': 'HISTORY', 'id': 'history-content'}
        ]};

      var template = Handlebars.helpers.getTemplate('add-tabs');
      var html = template(tabs);
      console.log(Gumby.initialize);
      this.$el.html(html);
      
      Gumby.initialize('tabs');

      bv = BrowserView;
      bv.setElement($('#browser-content'));
      bv.render();
    }
  });

  return new AddView();
});