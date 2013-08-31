var ChartView = Backbone.View.extend({

  initialize: function(){

    this.listenTo(this.collection, 'all', this.render);
    Backbone.Mediator.subscribe('screen:change:ratio', this.render, this);
  },

  render: function() {   
    this.$el.empty();
    this.renderChart();


    return this;
  },

  renderChart: function() {
    /*this.series = [];
    this.collection.each(function(ts) {
      //console.log(ts.url());
      this.series.push({
        name: "Northeast",
        data: [ { x: -1893456000, y: 25868573 }, { x: -1577923200, y: 29662053 }, { x: -1262304000, y: 34427091 }, { x: -946771200, y: 35976777 }, { x: -631152000, y: 39477986 }, { x: -315619200, y: 44677819 }, { x: 0, y: 49040703 }, { x: 315532800, y: 49135283 }, { x: 631152000, y: 50809229 }, { x: 946684800, y: 53594378 }, { x: 1262304000, y: 55317240 } ],
        color: palette.color()
      });
    });

    this.graph = new Rickshaw.Graph( {
      element: this.el, 
      width: this.$el.width(), 
      height: this.$el.height(),
      series: this.series
    });

    graph.render(); */
  }
});