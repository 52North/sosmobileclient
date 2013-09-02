var CurrentTimeseries = (function() {
  return Backbone.Collection.extend({
    model: Timeseries,
    url: '',
   
    initialize: function() {

      this.listenTo(this, 'change', this.save);
      this.listenTo(this, 'change', this.sort);
      this.listenTo(this, 'remove', this.save);
      this.listenTo(this, 'add', this.save);

      Backbone.Mediator.subscribe('timeseries:add', function(timeseries) {
        this.add(timeseries);
      }, this);
      Backbone.Mediator.subscribe('app:reset', function() {
        this.reset();
        this.save();
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
        var current_timeseries_json = $.totalStorage('currentTimeseries');
        current = this;
        $.each(current_timeseries_json, function(index, id) {
          var ts = new Timeseries(id);
          ts.fetch();
          current.add(ts);
        });
      } else {
        //empty or default timeseries?
        this.save();
      }
    },

    anythingVisible: function() {
      return !this.some(function(elem) {
        return elem.get('hidden');
      });
    },

    save: function() {
      current_timeseries_json = [];
      this.each(function (elem) {
        current_timeseries_json.push(elem.id);
      });
      $.totalStorage('currentTimeseries', current_timeseries_json);
    },

    contains: function(timeseries) {
      return this.some(function(elem) {
        return elem.get('timeseriesId') === timeseries.get('timeseriesId');
      });
    }
  });
})();