define([
  'jquery',
  'jquerymobile',
  'underscore',
  'backbone',
  'views/add-navbar',
  'views/data'
  //'views/add',
  //'views/legend'
  ],
  function($, jqm, _, Backbone, AddNavbar, DataView){ //, addView, legendView
    console.log("router loaded");
    var AppRouter = Backbone.Router.extend({
      routes: {
        'browser': 'view', 
        //main routes
        '':            'view',
        'view':        'view',
        'add':         'add',
        'legend':      'legend',
        '*actions':    'defaultAction'
      }
    });

    var initialize = function(){
      var router = new AppRouter;
      var lastView = "";
      router.on('all', function(route) {
        lastView = Backbone.history.fragment;
      }, this);

      router.on('route:view', function (){
        console.log("route:view from: " + lastView);
        DataView.render();
        jqm.changePage( "#view", {
          transition: "slide",
          reverse: false,
          changeHash: false
        });
      });
      //Main Routing
      router.on('route:add', function() {
        console.log("route:add from: " + lastView);
        jqm.changePage( "#add", {
          transition: "slide",
          reverse: false,
          changeHash: false
        });
      });
      router.on('route:legend', function() {
        console.log("route:legend from: " + lastView);
        jqm.changePage( "#legend", {
          transition: "slide",
          reverse: true,
          changeHash: false
        });
      });
      router.on('route:defaultAction', function(actions){
        // We have no matching route, lets just log what the URL was 
        console.log('No matching route for: ', actions);
      });

      new AddNavbar();

      Backbone.history.start();
    };

    return {
      initialize: initialize
    };
  }
);