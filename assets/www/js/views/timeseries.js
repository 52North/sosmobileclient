var TimeseriesListView = Backbone.View.extend({
  className: 'collapse',
  
  events: {
    
  },

  render: function() {
    list = $("<ul>");
    list.addClass('list sublist');

    this.collection.each(function(ts) {
      tsView = new TimeserieView({'model': ts});
      list.append(tsView.render().el);
    });

    this.$el.html(list);
    console.log(this.$el);
    return this;
  }
});

var TimeserieView = Backbone.View.extend({
  tagName: 'li',
  template: Handlebars.helpers.getTemplate('timeserie-list-entry'),
  
  events: {
    
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});