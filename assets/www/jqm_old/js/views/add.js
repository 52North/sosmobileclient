define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars'
],
function($, _, Backbone, Handlebars){
  var AddView = Backbone.View.extend({
    el: '.add-content',
    initialize: function(){
      console.log("init data view");
    },
    render: function() {
      var compiledTemplate = Handlebars.helpers.getTemplate('addpages');
      var html = compiledTemplate({ name : 'World' });

      this.$el.html(html);
    }
  });

  return new AddView();
});