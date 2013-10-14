var TimeseriesDataCollection = (function() {
  return Backbone.Collection.extend({
    model: TimeseriesData,

    initialize: function() {
      this.listenTo(this, 'sync', this.triggerSync);
      this.listenTo(this, 'change:synced', this.triggerSync);
    },

    //Backbone's collection-sync event is an "any is synced" - event - we need an "every is synced"
    triggerSync: function() {
      if (this.everythingSynced()) {
        this.trigger('synced:all');
      }
    },

    everythingSynced: function() {
      return this.every(function(elem) {return elem.get('synced')});
    },

    abortAndReset: function() {
      this.each(function(tsData) {
        tsData.abort();
      });
      this.reset();
    }

  });


})();