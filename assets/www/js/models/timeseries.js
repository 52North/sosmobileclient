var Timeseries = (function() {
  return Backbone.Model.extend({
    storage: new StorageService(),

    initialize: function(id) {
      this.id = id;
      this.set('id', id);
      this.set('color', this.parseColor());
    },

    url: function() {
      return "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/timeseries/" + this.id;
    },

    isSynced: function() {
      return (!(this.get('parameters') === undefined));
    },

    defaultColor: function() {
      return Helpers.stringToColor(this.get('id'));
    },

    parseColor: function() {
      if (this.id in window.settings.get('timeseriesColors')) {
        return window.settings.get('timeseriesColors')[this.id];
      } else {
        return this.defaultColor();
      }
    }
  });
})();