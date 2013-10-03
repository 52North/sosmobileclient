var LoadingView = (function() {
  return Backbone.View.extend({



    initialize: function() {
      console.log(this.$el);

      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'remove', this.render);
      this.listenTo(this.collection, 'reset', this.render);

      this.listenTo(this.collection, 'synced:all', this.what);
    },

    what: function() {
      console.log("SYNCED");
    },

    render: function() {


      console.log("rerender " + this.collection.size());
      this.collection.each(function(ts) {
        var single = new LoadingSingleTimeseriesView({model: ts});
        single.render();
      }, this);
    }
  });
})();

var LoadingSingleTimeseriesView = (function() {
  return Backbone.View.extend({



    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
    },

    render: function() {
      console.log("Is model #" + this.model.id + " synced now? " + this.model.get('synced'));
    }
  });
})();