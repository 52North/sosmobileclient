define([
    'jquery',
    'underscore',
    'backbone',
    'router',
  ],
  function($, _, Backbone, Router) {
    alert("app js loaded");
    var initialize = function() {
      // Pass in our Router module and call it's initialize function
      Router.initialize();
    }
    return {
      initialize: initialize
    };
  }
);

//HELPERS
function calcContentHeight() {
  return ($('#add').height() - $('#add-header').height() - $('#add-navbar').height());
}