var AppRouter = Backbone.Router.extend({
  routes: {
    'chart':        'chart',
    'add':         'add',
    'add/:tab':    'addTab',
    'legend':      'legend',
    '*actions':    'defaultAction'
  },

  initialize: function() {
    rtMe = this;

    var btnSvc = new AndroidButtonService(this);
  },

  chart: function() {
    MfMobile.navigateToPage("#chart-page");
  },
  add: function() {
    MfMobile.navigateToPage("#add-page");
  },
  addTab: function(tab) {
    MfMobile.navigateToPage("#add-page");
    $('#add-tabs a[data-target="#tab-' + tab + '-content"]').tab('show');
    this.navigate("add", {trigger: false, replace: true}); //open silently
  },
  legend: function() {
    MfMobile.navigateToPage("#chart-page");
    MfMobile.openPanel("#legend-panel"); //TODO wait
  },
  defaultAction: function() {
    console.log("routing not found");
    rtMe.navigate("#chart", {trigger: false, replace: true});
  }
});