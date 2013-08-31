var LegendView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list timeseries',
  actions: [
    {
        'icon': 'icon-trash',
        'callback': 'legend:timeseries:delete'
    },
    {
      'icon': 'icon-screenshot',
      'callback': 'station:locate',
      'navigate': '#add/map'
    },
    {
      'icon': 'icon-edit-sign',
      'callback': 'legend:timeseries:color:choose',
      'color': true
    }
  ],

  initialize: function(){
    this.listenTo(this.collection, 'sort', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(window.settings, 'change:expert', this.render);
  },

  render: function() {
    this.$el.empty();

    if (this.collection.length == 0) {
      this.$el.html("<div class='placeholder'>No current timeseries.<br/>Go on, <a href='#add'>add</a> one.</div>");
    }

    var list = this.$el;
    var actions = this.actions;
    this.collection.each(function(timeserie){
      var tsView = new TimeserieView({'model': timeserie, 'actions': actions});
      list.append(tsView.render().el);
    });

    return this;
  }

});