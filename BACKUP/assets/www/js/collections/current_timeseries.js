var CurrentTimeseries = (function() {
  return PersistentTimeseries.extend({ //subclass!
    key: 'currentTimeseries',
   
    initialize: function() {
      this.listenTo(this, 'change', this.save);
      this.listenTo(this, 'change', this.sort);
      this.listenTo(this, 'remove', this.save);
      this.listenTo(this, 'add', this.sort);
      this.listenTo(this, 'add', this.save);

      //info: Add+Remove of Timeseries is located in timeseries controller
      
      Backbone.Mediator.subscribe('app:reset', function() {
        this.reset();
        this.save();
      }, this);
    }
  });
})();