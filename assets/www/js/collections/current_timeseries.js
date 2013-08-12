var CurrentTimeseries = Backbone.Collection.extend({

  model: Timeseries,
  url: '',
 
  initialize: function() {
    this.listenTo(this, 'change', this.save);
    this.listenTo(this, 'remove', this.save);
  },

  isSet: function() {
    if ($.totalStorage('currentTimeseries')) {
      return true;
    } else {
      return false;
    }
  },
  
  fetch: function() {
    if (this.isSet()) {
      current_timeseries_json = $.totalStorage('currentTimeseries');
      for (var i = 0; i < current_timeseries_json.length; i++) {
        this.add(new Timeseries(current_timeseries_json[i]));
      }
    } else {
      //empty or default timeseries?
      this.save();
    }
  },

  save: function() {
    current_timeseries_json = [];
    _.each(this.models, function (elem) {
      current_timeseries_json.push(elem.toJSON());
    });
    $.totalStorage('currentTimeseries', current_timeseries_json);
  }

});