define([
  'jquery',
  'jquerymobile',
  'underscore',
  'backbone'
  //'collections/projects', 'text!templates/projects/list.html'
],
function($, jqm, _, Backbone){ //, ProjectsCollection, projectsListTemplate
  //This is the Backbone controller that manages the Nav Bar
  var NavBar = Backbone.View.extend({
    el: '#add-navbar',

    initialize:function(options){
      Backbone.history.on('route',function(source, path){
        this.render(path);
      }, this);
    },

    //This is a collection of possible routes and their accompanying
    //user-friendly titles
    titles: {
      "add/browser":"BROWSER",
      "add/map":"MAP",
      "add/search":"SEARCH",
      "add/history":"HISTORY"
    },

    events:{
      'click a':function(source) {
        source.preventDefault();
        var hrefRslt = source.target.getAttribute('href');
        Backbone.history.navigate(hrefRslt, {trigger:true});
        //Cancel the regular event handling so that we won't actual change URLs
        //We are letting Backbone handle routing
        return false;
      }
    },

    //Each time the routes changes, we refresh the navigation items.
    render:function(route){
      this.$el.empty();
      var template = _.template("<li><a class='<%=active%>' href='<%=url%>'><%=visible%></a></li>");
      for (var key in this.titles) {
        this.$el.append(template({url:key,visible:this.titles[key],active:route === key ? 'ui-btn-active' : ''}));
      }
      $(document).trigger("create");
    }
  });

  return NavBar;
});