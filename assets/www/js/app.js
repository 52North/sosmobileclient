define([
    'jquery',
    'underscore',
    'backbone',
    'router'
  ],
  function($, _, Backbone, Router) {
    console.log("app js loaded");
    var initialize = function() {
      
      Router.initialize();
    }
    return {
      initialize: initialize
    };
  }
);