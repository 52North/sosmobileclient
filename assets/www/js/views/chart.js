var ChartView = (function() {

  return Backbone.View.extend({

    events: {
      'plotselected': 'zoomToSelection'
    },
    subscriptions: {
      'screen:change:ratio': 'render',
      'chart:view:reset': 'render'
    },
    graph: $("<div style='width: 100%; height: 100%'>"),
    data: [],
    options: {
      series: {
        lines: {
          show: true
        },
        shadowSize: 0
      },
      selection: {
        mode: "xy"
      }
    },

    initialize: function(){
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'change', this.render);
      this.listenTo(this.collection, 'remove', this.render);
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

    reset: function() {
      this.graph.draw();
      console.log("reset view");
    },

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
      var d1 = [];
      for (var t = 0; t <= 2 * Math.PI; t += 0.01) {
        d1.push([this.sumf(Math.cos, t, 10), this.sumf(Math.sin, t, 10)]);
      }

      this.data = [ d1 ];

      this.$el.append(this.graph);
      var plot = $.plot(this.graph, this.data, this.options);

      $( "canvas.flot-overlay" ).touchit(); //enable touch
    },

    zoomToSelection: function (event, ranges) {
      // clamp the zooming to prevent eternal zoom
      if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
        ranges.xaxis.to = ranges.xaxis.from + 0.00001;
      }

      if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
        ranges.yaxis.to = ranges.yaxis.from + 0.00001;
      }

      // do the zooming
      var plot = $.plot(this.graph, this.data,
        $.extend(true, {}, this.options, {
          xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
          yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
        })
      );

      Backbone.Mediator.publish('chart:zoom:changed', ranges);
    }
  });
})();