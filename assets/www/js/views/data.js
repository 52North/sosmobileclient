define([
  'jquery',
  'underscore',
  'backbone'
  //'collections/projects', 'text!templates/projects/list.html'
],
function($, _, Backbone){ //, ProjectsCollection, projectsListTemplate
  var DataView = Backbone.View.extend({
    el: '.view-content',
    initialize: function(){
      console.log("init data view");
    },
    render: function() {
      this.$el.html("RICHITG");
    }
  });

  return new DataView();
});