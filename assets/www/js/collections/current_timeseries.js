var CurrentTimeseries = Backbone.Collection.extend({

  model: Timeseries,
  url: '',
 
  initialize: function() {

    this.listenTo(this, 'change', this.save);
    this.listenTo(this, 'change', this.sort);
    this.listenTo(this, 'remove', this.save);

    Backbone.Mediator.subscribe('timeseries:add', function(timeseries) {
      this.add(timeseries);
    }, this);

  },

  comparator: function(ts) {
    return -ts.get("addedAt");
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
      current = this;
      $.each(current_timeseries_json, function(index, ts) {
        current.add(new Timeseries(ts));
      });
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