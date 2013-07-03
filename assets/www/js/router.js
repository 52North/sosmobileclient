define([
  'jquery',
  'underscore',
  'backbone',
  'mfmobilepages',
  'views/data',
  'views/browser'
  //'views/legend'
  ],
  function($, _, Backbone, MobilePages, DataView, BrowserView){ //, addView, legendView
    console.log("router loaded");

    DataView.render();
    BrowserView.render(); //only render at startup!

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
        navigateToPage("#view-page");
      },
      add: function() {
        console.log("route:add");
        navigateToPage("#add-page");
      },
      legend: function() {
        console.log("route:legend");
        openPanel("#legend-panel");
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