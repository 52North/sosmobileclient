var AppRouter = Backbone.Router.extend({
  routes: {
    'view':        'view',
    'add':         'add',
    'legend':      'legend',
    'settings':      'settings',
    '*actions':    'defaultAction'
  }, 

  initialize: function() {    
    //console.log("router loaded");    
  },

  view: function() {
    //console.log("route:view");
    navigateToPage("#view-page");
  },
  add: function() {
    //console.log("route:add");
    navigateToPage("#add-page");
  },
  legend: function() {
    //console.log("route:legend");
    openPanel("#legend-panel");
  },
  settings: function() {
    //console.log("route:settings");
    openPanel("#settings-panel");
  },
  defaultAction: function() {
    console.log("routing not found");
  }
});