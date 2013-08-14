var ChartView = Backbone.View.extend({

  initialize: function(){

    Backbone.Mediator.subscribe('screen:change:ratio', this.render, this);
  },

  render: function() {
    this.$el.empty();
    this.renderChart();

    return this;
  },

  renderChart: function() {
    graph = new Rickshaw.Graph( {
      element: this.el, 
      width: this.$el.width(), 
      height: this.$el.height(), 
      series: [{
        color: 'steelblue',
        data: [ 
          { x: 0, y: 40 }, 
          { x: 1, y: 49 }, 
          { x: 2, y: 38 }, 
          { x: 3, y: 30 }, 
          { x: 4, y: 32 } ]
      }]
    });

    graph.render();
  }
});