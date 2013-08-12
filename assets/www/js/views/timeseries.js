var TimeseriesListView = Backbone.View.extend({
  className: 'collapse',
  
  events: {
    
  },

  render: function() {
    list = $("<ul>");
    list.addClass('list sublist');

    actions = this.options.actions
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

  render: function() {
    model = this.model.toJSON();
    model['actions'] = this.options.actions;
    this.$el.html(this.template(model));
    return this;
  },

  perform: function(e) {
    e.preventDefault();
    callback = $(e.currentTarget).data('action');

    Backbone.Mediator.publish(callback, this.model);
  }

});