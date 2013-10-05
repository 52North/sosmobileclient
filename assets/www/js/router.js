var AppRouter = Backbone.Router.extend({
  routes: {
    'chart':        'chart',
    'add':         'add',
    'add/:tab':    'addTab',
    'legend':      'legend',
    'settings':    'settings',
    '*actions':    'defaultAction'
  },

  initialize: function() {
    rtMe = this;
    rtMe.settingsOpened = false;

    document.addEventListener("menubutton", rtMe.toggleSettings, false);
    document.addEventListener("backbutton", rtMe.closeOnChart, false);
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
  },
  legend: function() {
    MfMobile.navigateToPage("#chart-page");
    MfMobile.openPanel("#legend-panel");
  },
  settings: function() {
    MfMobile.openPanel("#settings-panel");
    rtMe.settingsOpened = true;
  },
  toggleSettings: function() {
    //open everywhere by tapping menu btn
    if (rtMe.settingsOpened) {
      rtMe.settingsOpened = false;
      window.history.back();
    } else {
      rtMe.settings();
    }
  },
  closeOnChart: function() {
    if (Backbone.history.fragment == "chart") {
      //alert("exit");
      navigator.app.exitApp()
    } else {
      window.history.back();
    }
  },
  defaultAction: function() {
    console.log("routing not found");
    rtMe.navigate("#chart", {trigger: false, replace: true});
  }
});