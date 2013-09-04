var CurrentSettings = (function() {
  return Backbone.Model.extend({

    key: 'current_settings',
    defaultValues: {
      'currentProvider': 'PEGELONLINE',
      'lastStationUpdate': 'never',
      'appVersion': 'v0.3 alpha',
      'timespan': '2013-03-01T13:00:00TZ/2013-05-11T15:30:00TZ',
      'expert': false,
      'timeseries_colors': {}
    },
    storage: new StorageService(),

    initialize: function() {
      csMe = this;
      Backbone.Mediator.subscribe('app:booted', function(timeseries) {
        this.listenTo(this, 'change', this.save);
      }, this);
      Backbone.Mediator.subscribe('app:reset', function() {
        this.set(this.defaultValues);
        this.save();
      }, this);
    },

    isSet: function() {
      return this.storage.isSet();
    },
    
    fetch: function() {
      if (this.storage.isSet(this.key)) {
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