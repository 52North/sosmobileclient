var CurrentSettings = Backbone.Model.extend({

  defaultValues: {
    'currentProvider': 'PEGELONLINE',
    'lastStationUpdate': 'never',
    'appVersion': 'v0.3 alpha',
    'expert': false
  },

  initialize: function() {
    Backbone.Mediator.subscribe('app:booted', function(timeseries) {
      this.listenTo(this, 'change', this.save);
      this.listenTo(this, 'change', this.sort);
    }, this);
  },

  isSet: function() {
    if ($.totalStorage('current_settings')) {
      return true;
    } else {
      return false;
    }
  },
  
  fetch: function() {
    if (this.isSet()) {
      this.set($.totalStorage('current_settings'));
    } else {
      this.set(this.defaultValues);
      this.save();
    }
  },

  save: function() {
    $.totalStorage('current_settings', this.toJSON());
  }
});