define([
  'jquery',
  'underscore',
  'backbone',
  'offcanvas',
  'handlebars'
  //'collections/projects', 'text!templates/projects/list.html'
],
function($, _, Backbone, Offcanvas, Handlebars){ //, ProjectsCollection, projectsListTemplate
  var AddView = Backbone.View.extend({
    el: '.add-content',
    initialize: function(){
      console.log("init data view");
    },
    render: function() {
      var compiledTemplate = Handlebars.helpers.getTemplate('hello');
      alert(compiledTemplate);
      var html = compiledTemplate({ name : 'World' });

      this.$el.html(html);
    }
  });

  return new AddView();
});