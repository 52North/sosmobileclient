var DataView = Backbone.View.extend({
  el: '#view-content',
  initialize: function(){
    //console.log("init data view");
  },
  render: function() {
    
    //this.$el.append(chart);

    this.renderChart();
  },
  renderChart: function() {
    graph = new Rickshaw.Graph( {
      element: this.el, 
      width: 285, 
      height: 180, 
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