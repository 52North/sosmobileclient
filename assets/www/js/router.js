var AppRouter = Backbone.Router.extend({
  routes: {
    'view':        'view',
    'add':         'add',
    'add/:tab':         'addTab',
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
  addTab: function(tab) {
    navigateToPage("#add-page");
    $('#add-content a[href="#tab-' + tab + '-content"]').tab('show');
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