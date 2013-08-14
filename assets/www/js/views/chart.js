var ChartView = Backbone.View.extend({

  initialize: function(){
  },

  render: function() {
    this.renderChart();
    cvMe = this;
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