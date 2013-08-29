var CurrentSettings = Backbone.Model.extend({

  devMode: true,
  key: 'current_settings',
  defaultValues: {
    'currentProvider': 'PEGELONLINE',
    'lastStationUpdate': 'never',
    'appVersion': 'v0.3 alpha',
    'expert': false,
    'timeseries_colors': {}
  },

  initialize: function() {
    Backbone.Mediator.subscribe('app:booted', function(timeseries) {
      this.listenTo(this, 'change', this.save);
      this.listenTo(this, 'change', this.sort);
    }, this);
  },

  isSet: function() {
    //return false; //reset

    if (this.devMode) {
      if ($.totalStorage('current_settings')) {
        return true;
      } else {
        return false;
      }
    } else {
      var key = window.localStorage.key(0);
      if (!key) {
        return false;
      } else {
        return true;
      }
    }
  },
  
  fetch: function() {
    if (this.isSet()) {
      var cs;
      if (this.devMode) {
        cs = $.totalStorage(this.key);
      } else {
        cs = window.localStorage.getItem(this.key);
      }
      this.set(cs);
    } else {
      this.set(this.defaultValues);
      this.save();
    }  
  },

  save: function() {
    console.log('changed!', this.toJSON());
    if (this.devMode) {
      $.totalStorage(this.key, this.toJSON());
    } else {
      window.localStorage.setItem(this.key, this.toJSON());
    }
  }
});