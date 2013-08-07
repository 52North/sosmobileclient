var CurrentSettings = Backbone.Model.extend({

  defaultValues: {
    'currentProvider': 'PEGELONLINE',
    'lastStationUpdate': 'never',
    'appVersion': 'v0.3 alpha',
    'currentTimeseries': ''
  },

  initialize: function() {
    
  },

  isSet: function() {
    if ($.totalStorage('current_settings')) {
      return true;
    } else {
      return false;
    }
  },
  
  fetch: function() {
    /* DEVELOPMENT MODE
    if (this.isSet()) {
      this.set($.totalStorage('current_settings'));
    } else {
      */
      this.set(this.defaultValues);
      this.save();
    //}
  },

  save: function() {
    $.totalStorage('current_settings', this.toJSON());
  }
});