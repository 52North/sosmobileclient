var TimeseriesDataCollection = (function() {
  return Backbone.Collection.extend({
    model: TimeseriesData,

    initialize: function() {
      this.listenTo(this, 'sync', this.triggerSync);
    },

    //Backbone's collection-sync event is an "any is synced" - event - we need an "every is synced"
    triggerSync: function() {
      if (this.every(function(elem) {return elem.get('synced')})) {
        this.trigger('synced:all');
      }
    }

  });


})();