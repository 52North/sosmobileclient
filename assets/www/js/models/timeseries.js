var Timeseries = Backbone.Model.extend({

  initialize: function() {
    //this.listenTo(this, "add", this.updateUrl);
  },

  updateUrl: function() {
    this.url = "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services/" + this.get("service") + "/timeseries/" + this.get('timeseriesId');
    console.log(this.url);
  },

  data: function(form, till) {
  	//ajax request on initialize
  },

  color: function() {
    return "#" + stringToColor(this.get('id'));
  }

});