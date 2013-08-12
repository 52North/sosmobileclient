var LegendView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list timeseries',

  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },

  render: function() {
    this.$el.empty();

    list = this.$el;
    this.collection.each(function(timeserie){
      stationView = new TimeserieView({'model': timeserie});
      list.append(stationView.render().el);
    });

    return this;
  }

});