define([
  'jquery',
  'underscore',
  'backbone',
  'views/data',
  'views/add'
  //'views/legend'
  ],
  function($, _, Backbone, DataView, AddView){ //, addView, legendView
    console.log("router loaded");

    AddView.render(); //only render at startup!
    DataView.render();

    //Do we even need Backbone Routing?
    var AppRouter = Backbone.Router.extend({
      routes: {
        //main routes
        'view':        'view',
        'add':         'add',
        'legend':      'legend',
        '*actions':    'defaultAction'
      }, 
      view: function() {
        console.log("route:view");
      },
      add: function() {
        console.log("route:add");
      },
      addBrowser: function() {
        console.log("route:addBrowser");

      },
      legend: function() {
        console.log("route:legend");
        
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