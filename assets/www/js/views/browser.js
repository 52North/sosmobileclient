define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars'
],
function($, _, Backbone, Handlebars){
  BrowserView = Backbone.View.extend({
    initialize: function(){
      
      
    },
    render: function() {
      var compiledTemplate = Handlebars.helpers.getTemplate('hello');
      var html = compiledTemplate({ name : 'World' });

      this.$el.html(html);
    }
  });

  return BrowserView;
});