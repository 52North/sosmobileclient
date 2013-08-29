var TimeseriesListView = Backbone.View.extend({
  className: 'collapse',
  
  events: {
    
  },

  initialize: function() {
    
  },

  render: function() {
    list = $("<ul>");
    list.addClass('list sublist');

    actions = this.options.actions;
    this.collection.each(function(ts) {
      tsView = new TimeserieView({'model': ts, 'actions': actions});
      list.append(tsView.render().el);
    });

    this.$el.html(list);
    return this;
  }
});

var TimeserieView = Backbone.View.extend({
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
    e.preventDefault();
    callback = $(e.currentTarget).data('action');

    //TODO already added?
    Backbone.Mediator.publish(callback, this.model);

    navigate = $(e.currentTarget).data('navigate');
    if (navigate) {
      $('.modal').modal('hide');
      window.location.href = navigate;
    }
  }

});