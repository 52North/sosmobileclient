var ChartView = Backbone.View.extend({
  initialize: function(){

    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    Backbone.Mediator.subscribe('screen:change:ratio', this.render, this);
    Backbone.Mediator.subscribe('screen:change:ratio', this.render, this);
  },

  render: function() {   
    this.$el.empty();
    
    this.initialRenderChart();


    if (this.collection.anythingVisible()) {
      //Todo loading screen!
    } else {
      //TODO message for the user, that there is nothing to display
    }

    return this;
  },

  /**
   * Callback when timeseries data is fetched
   */
  addDataSerie: function(data) {
    if (this.graph) {
      //add 
    } else {
      //render with this
    }
  },

     sumf: function(f, t, m) {
      var res = 0;
      for (var i = 1; i < m; ++i) {
        res += f(i * i * t) / (i * i);
      }
      return res;
    },

  initialRenderChart: function() {
    // generate data set from a parametric function with a fractal look


    var d1 = [];
    for (var t = 0; t <= 2 * Math.PI; t += 0.01) {
      d1.push([this.sumf(Math.cos, t, 10), this.sumf(Math.sin, t, 10)]);
    }

    var data = [ d1 ];

    var plot = $.plot(this.$el, data, {
      series: {
        lines: {
          show: true
        },
        shadowSize: 0
      },
      xaxis: {
        zoomRange: [0.1, 10],
        panRange: [-10, 10]
      },
      yaxis: {
        zoomRange: [0.1, 10],
        panRange: [-10, 10]
      },
      zoom: {
        interactive: true
      },
      pan: {
        interactive: true
      }
    });

    // show pan/zoom messages to illustrate events 

    this.$el.bind("plotpan", function (event, plot) {
      var axes = plot.getAxes();
      $(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2)
      + " &ndash; " + axes.xaxis.max.toFixed(2)
      + " and y: " + axes.yaxis.min.toFixed(2)
      + " &ndash; " + axes.yaxis.max.toFixed(2));
    });

    this.$el.bind("plotzoom", function (event, plot) {
      var axes = plot.getAxes();
      $(".message").html("Zooming to x: "  + axes.xaxis.min.toFixed(2)
      + " &ndash; " + axes.xaxis.max.toFixed(2)
      + " and y: " + axes.yaxis.min.toFixed(2)
      + " &ndash; " + axes.yaxis.max.toFixed(2));
    });

    // add zoom out button 

    $("<div class='button' style='right:20px;top:20px'>zoom out</div>")
      .appendTo(this.$el)
      .click(function (event) {
        event.preventDefault();
        plot.zoomOut();
      });
  }
     
});