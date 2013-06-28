define([
  'jquery',
  'jquerymobile',
  'underscore',
  'backbone',
  'views/data',
  'views/add'
  //'views/legend'
  ],
  function($, jqm, _, Backbone, DataView, AddView){ //, addView, legendView
    console.log("router loaded");

    AddView.render(); //only render at startup!

    var AppRouter = Backbone.Router.extend({
      routes: {
        //main routes
        '':            'view',
        'view':        'view',
        'add':         'add',
        'legend':      'legend',
        '*actions':    'defaultAction'
      }, 
      view: function() {
        console.log("route:view");
        DataView.render();
        jqm.changePage( "#view", {
          transition: "slide",
          reverse: false,
          changeHash: false
        });
      },
      add: function() {
        console.log("route:add");
        AddView.render();
        jqm.changePage( "#add", {
          transition: "slide",
          reverse: false,
          changeHash: false
        });
      },
      addBrowser: function() {
        console.log("route:addBrowser");

      },
      legend: function() {
        console.log("route:legend");
        jqm.changePage( "#legend", {
          transition: "slide",
          reverse: true,
          changeHash: false
        });
      }
    });

    var initialize = function(){
      var router = new AppRouter;

      router.on('route:defaultAction', function(actions){
        // We have no matching route, lets just log what the URL was 
        console.log('No matching route for: ', actions);
      });

      Backbone.history.start();
    };

    return {
      initialize: initialize
    };
  }
);