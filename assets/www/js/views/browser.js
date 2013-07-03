define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars'
],
function($, _, Backbone, Handlebars){
  var BrowserView = Backbone.View.extend({
    el: '#browser-content',
    initialize: function(){
      console.log("init data view");
      
    },
    render: function() {
      var compiledTemplate = Handlebars.helpers.getTemplate('hello');
      var html = compiledTemplate({ name : 'World' });

      this.$el.html(html);
    }
  });

  return new BrowserView();
});