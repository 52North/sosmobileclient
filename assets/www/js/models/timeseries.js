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

    data: function(span) {
      //1. is there data in storage for this span and id?
      if (this.storage.isSet()) {
        //true - set('data' from storage )
        //this.set('current_timeline_data')
      } else {
        //false - load data from SOS
        
      }
      //graph horcht auf change:data
    },

    parse: function (response) {
      //console.log(response);
      //if stored in settings/color hash -> take color
      //else generate color
      return response;
    },

    isSynced: function() {
      return (!(this.get('parameters') === undefined));
    },

    defaultColor: function() {
      return Helpers.stringToColor(this.get('id'));
    },

    parseColor: function() {
      if (this.get('id') in window.settings.get('timeseries_colors')) {
        return window.settings.get('timeseries_colors')[this.get('id')];
      } else {
        return this.defaultColor();
      }
    }
  });
})();