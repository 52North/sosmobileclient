var PersistentTimeseries = (function() {
   return Backbone.Collection.extend({
    model: Timeseries,
    url: '',
    storage: new StorageService(),
   
    comparator: function(ts) {
      return -Helpers.addDateOfTimeseries(ts.get('id')).getTime();
    },

    isSet: function() {
      return this.storage.isSet(this.key);
    },
    
    fetch: function() {
      if (this.isSet()) {
        var json = this.storage.load(this.key);

        _.each(json, function(id) {
          var ts = new Timeseries(id);
          this.add(ts);
        }, this);

      } else {
        this.reset();
        this.save();
      } 
    },

    save: function() {
      var currentTimeseriesJson = [];
      this.each(function (elem) {
        currentTimeseriesJson.push(elem.id);
      });
      this.storage.save(this.key, currentTimeseriesJson);
    },

    anythingVisible: function() {
      if (this.length == 0) {
        return false;
      }
      return !this.some(function(elem) {
        return elem.get('hidden');
      });
    },

    contains: function(timeseries) {
      return this.some(function(elem) {
        return elem.get('timeseriesId') === timeseries.get('timeseriesId');
      });
    }
  });
})();