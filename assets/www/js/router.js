var AppRouter = Backbone.Router.extend({
  routes: {
    'view':        'view',
    'add':         'add',
    'add/:tab':    'addTab',
    'legend':      'legend',
    'settings':    'settings',
    '*actions':    'defaultAction'
  },



  initialize: function() {    
    

  },

  view: function() {
    navigateToPage("#view-page");
  },
  add: function() {
    navigateToPage("#add-page");
  },
  addTab: function(tab) {
    navigateToPage("#add-page");
    $('#add-content a[href="#tab-' + tab + '-content"]').tab('show');
  },
  legend: function() {
    navigateToPage("#view-page");
    openPanel("#legend-panel");
  },
  settings: function() {
    //open everywhere by tapping menu btn
    openPanel("#settings-panel");
  },
  defaultAction: function() {
    console.log("routing not found");
  }
});