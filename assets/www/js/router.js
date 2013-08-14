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
    rtMe = this;
    rtMe.settingsOpened = false;
    rtMe.navigate("#view", {trigger: true, replace: true});

    document.addEventListener("menubutton", rtMe.toggleSettings, false);
    document.addEventListener("backbutton", rtMe.closeOnView, false);
  },

  view: function() {
    navigateToPage("#view-page");
  },
  add: function() {
    navigateToPage("#add-page");
  },
  addTab: function(tab) {
    navigateToPage("#add-page");
    $('#addTabs a[data-target="#tab-' + tab + '-content"]').tab('show');
  },
  legend: function() {
    navigateToPage("#view-page");
    openPanel("#legend-panel");
  },
  settings: function() {
    openPanel("#settings-panel");
    rtMe.settingsOpened = true;
  },
  toggleSettings: function() {
    alert("menu");
    //open everywhere by tapping menu btn
    if (rtMe.settingsOpened) {
      rtMe.settingsOpened = false;
      window.history.back()
    } else {
      rtMe.settings();
    }
  },
  closeOnView: function() {
    alert("back");
    if (Backbone.history.fragment == "view") {
      alert("exit");
      navigator.app.exitApp()
    }
  },
  defaultAction: function() {
    console.log("routing not found");
    rtMe.navigate("#view", {trigger: false, replace: true});
  }
});