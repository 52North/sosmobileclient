var CurrentSettings = (function() {
  return Backbone.Model.extend({

    key: 'current_settings',
    defaultValues: {
      'currentProvider': 'PEGELONLINE',
      'lastStationUpdate': 'never',
      'appVersion': 'v0.3 alpha',
      'timespan': Helpers.isoTimespan('yesterday'),
      'expert': false,
      'timeseriesColors': {
        'timeseriesId': 'color'
      },
      'timeseriesAddDates': {
        'timeseriesId': 'javascriptTimestamp'
      }
    },
    storage: new StorageService(),

    initialize: function() {
      Backbone.Mediator.subscribe('app:booted', function(timeseries) {
        this.listenTo(this, 'change', this.save);
      }, this);
      Backbone.Mediator.subscribe('app:reset', function() {
        this.set(this.defaultValues);
        this.save();
      }, this);
    },

    isSet: function() {
      return this.storage.isSet(this.key);
    },
    
    fetch: function() {
      if (this.isSet()) {
        this.set(this.storage.load(this.key));
      } else {
        this.set(this.defaultValues);
        this.save();
      }  
    },

    save: function() {
      this.storage.save(this.key, this.toJSON());
    }
  });
})();