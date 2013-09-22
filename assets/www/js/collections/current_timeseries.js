var CurrentTimeseries = (function() {
  return PersistentTimeseries.extend({ //subclass!
    key: 'currentTimeseries',
   
    initialize: function() {
      this.listenTo(this, 'change', this.save);
      this.listenTo(this, 'change', this.sort);
      this.listenTo(this, 'remove', this.save);
      this.listenTo(this, 'add', this.sort);
      this.listenTo(this, 'add', this.save);

      Backbone.Mediator.subscribe('timeseries:add', function(timeseries) {
        Helpers.updateAddDate(timeseries.get('id')); //first!
        this.add(timeseries);
      }, this);
      Backbone.Mediator.subscribe('app:reset', function() {
        this.reset();
        this.save();
      }, this);
    }
  });
})();