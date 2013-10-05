var LoadingView = (function() {
  return Backbone.View.extend({
    className: "loading-screen",

    initialize: function() {
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'remove', this.render);
      this.listenTo(this.collection, 'reset', this.render);

      this.listenTo(this.collection, 'synced:all', this.hide);
    },

    hide: function() {
      this.$el.hide();
    },

    render: function() {
      if (this.collection.size() == 0  || this.collection.everythingSynced()) {
        this.hide();
        return;
      }

      this.$el.html($("<h2>").html("Fetching data..."));
      var table = $("<span>").addClass("loading-state");

      this.$el.append(table);
      this.$el.show();

      this.collection.each(function(ts) {
        var single = new LoadingSingleTimeseriesView({model: ts});
        table.append(single.render().$el);
      }, this);
    }
  });
})();

var LoadingSingleTimeseriesView = (function() {
  return Backbone.View.extend({
    tagName: 'i',

    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
    },

    render: function() {
      this.$el.removeClass();

      this.$el.css("color", "#" + this.model.get("timeseriesMetaData").get('color'))

      if (this.model.get('synced')) {
        this.$el.addClass('icon-ok');
      } else {
        this.$el.addClass('icon-refresh icon-spin');
      }

      return this;
    }
  });
})();