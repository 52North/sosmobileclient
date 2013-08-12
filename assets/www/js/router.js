var AppRouter = Backbone.Router.extend({
  routes: {
    'view':        'view',
    'add':         'add',
    'add/:tab':    'addTab',
    'legend':      'legend',
    'settings':    'settings',
    '[closePanels]': 'closePanels',
    '*actions':    'defaultAction'
  },

  initialize: function() {
    rtMe = this;
    document.addEventListener("menubutton", rtMe.toggleSettings, false);
    rtMe.settingsOpened = false;
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
    openPanel("#settings-panel");
    rtMe.settingsOpened = true;
  },
  toggleSettings: function() {
    //open everywhere by tapping menu btn
    alert("toggle open:" + rtMe.settingsOpened);
    if (rtMe.settingsOpened) {
      rtMe.closePanels();
    } else {
      rtMe.settings();
    }
  },
  closePanels: function() {
    rtMe.settingsOpened = false;
    closeAllPanels();
  },
  defaultAction: function() {
    console.log("routing not found");
  }
});