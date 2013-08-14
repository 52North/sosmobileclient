var ChartView = Backbone.View.extend({

  initialize: function(){

    this.listenTo(this.model.get('chartSettings'), 'all', this.render);
    this.listenTo(this.model.get('currentTimeseries'), 'add' ,this.render);
    this.listenTo(this.model.get('currentTimeseries'), 'remove' ,this.render);
    Backbone.Mediator.subscribe('screen:change:ratio', this.render, this);
  },

  render: function() {   
    this.$el.empty();
    this.renderChart();

    this.model.get('currentTimeseries').each(function(ts) {
      //console.log(ts.url());
    });

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