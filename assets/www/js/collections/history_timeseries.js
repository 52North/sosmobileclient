var HistoryTimeseries = Backbone.Collection.extend({

  model: Timeseries,
  url: '',
 
  initialize: function() {

    this.listenTo(this, 'change', this.save);

    htMe = this;
    Backbone.Mediator.subscribe('timeseries:add', function(timeseries) {
      this.add(timeseries);
    }, this);
  },

  isSet: function() {
    if ($.totalStorage('historyTimeseries')) {
      return true;
    } else {
      return false;
    }
  },
  
  fetch: function() {
    if (this.isSet()) {
      current_timeseries_json = $.totalStorage('historyTimeseries');
      current = this;
      $.each(current_timeseries_json, function() {
        current.add(new Timeseries(current_timeseries_json[i]));
      });
    } else {
      //empty or default timeseries?
      this.save();
    }
  },

  save: function() {
    console.log("save historyTimeseries");
    current_timeseries_json = [];
    _.each(this.models, function (elem) {
      current_timeseries_json.push(elem.toJSON());
    });
    $.totalStorage('historyTimeseries', current_timeseries_json);
  }

});