var TimeseriesListView = (function() {
  return Backbone.View.extend({
    className: 'collapse',
    
    events: {
      
    },

    initialize: function() {
      
    },

    render: function() {
      var list = $("<ul>");
      list.addClass('list sublist');

      var actions = this.options.actions;
      this.collection.each(function(ts) {
        var tsView = new TimeserieView({'model': ts, 'actions': actions});
        list.append(tsView.render().el);
      });

      this.$el.html(list);
      return this;
    }
  });
})();

var TimeserieView = (function() {
  return Backbone.View.extend({
    tagName: 'li',
    template: Handlebars.helpers.getTemplate('timeserie-list-entry'),
    
    events: {
      'click .action': 'perform'
    },

    initialize: function() {
      var _this = this;
      this.listenTo(this.model, 'sync', this.render);

      if (!this.model.isSynced()) {
        this.model.fetch();
      }
    },

    render: function() {
      var model = this.model.toJSON();
      model['actions'] = this.options.actions;
      model['expert'] = window.settings.get('expert');
      model['synced'] = this.model.isSynced();
      this.listenTo(this.model, 'change:color', this.render);
      this.$el.html(this.template(model));
      return this;
    },

    perform: function(e) {
      Helpers.performElementAction(e, this.model);
    }
  });
})();