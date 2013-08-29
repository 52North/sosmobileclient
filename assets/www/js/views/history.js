var HistoryView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list timeseries',
  actions: [
    {
        'icon': 'icon-plus',
        'callback': 'timeseries:add'
    },
    {
        'icon': 'icon-trash',
        'callback': 'history:timeseries:delete'
    },
    {
      'icon': 'icon-screenshot',
      'callback': 'station:locate',
      'navigate': '#add/map'
    }
  ],

  initialize: function(){
    var collection = this.collection;
    
    this.listenTo(this.collection, 'sort', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(window.settings, 'change:expert', this.render);

    Backbone.Mediator.subscribe('history:timeseries:delete', function(timeseries) {
     collection.remove(timeseries);
    }, this);

  },

  render: function() {
    this.$el.empty();

    if (this.collection.length == 0) {
      this.$el.html("<div class='placeholder'>No history entries found.<br/>Go on, <a href='#add'>add</a> one.</div>");
    }

    list = this.$el;
    actions = this.actions;
    this.collection.each(function(timeserie){
      tsView = new TimeserieView({'model': timeserie, 'actions': actions});
      list.append(tsView.render().el);
    });

    return this;
  },
});