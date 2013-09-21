var ChartView = (function() {

  return Backbone.View.extend({
    className: "chart-wrapper",
    events: {
      'plotselected': 'zoomToSelection'
    },
    subscriptions: {
      'screen:change:ratio': 'render',
      'chart:view:reset': 'render',
      'chart:currentTimeseries:fetchingData': 'showLoadingScreen'
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
      this.listenTo(this.collection, 'sync', this.render);
      this.listenTo(this.collection, 'reset', this.render);
    },

    render: function() {   
      this.hideLoadingScreen();
      this.$el.empty();
      if (this.plot) {
        //Important: Disables all obsolete listeners and destroys the plot before redraw.
        this.plot.shutdown();
      }



      if (this.collection.length > 0) {
        
        this.renderChart();
      } else {
        //Todo loading screen!
        this.$el.html("<div class='placeholder'>No current timeseries visible.<br/>Go on, <a href='#add'>add</a> one.</div>");
        //TODO message for the user, that there is nothing to display
      }

      this.$el.append(JSON.stringify(this.collection.toJSON()));

      return this;
    },

    showLoadingScreen: function() {
      //console.log('start loading');
    },

    hideLoadingScreen: function() {
      //console.log("end loading");
    },



    renderChart: function() {
      var sumf = function(f, t, m) {
        var res = 0;
        for (var i = 1; i < m; ++i) {
          res += f(i * i * t) / (i * i);
        }
        return res;
      };

      var d1 = [];
      for (var t = 0; t <= 2 * Math.PI; t += 0.01) {
        d1.push([sumf(Math.cos, t, 10), sumf(Math.sin, t, 10)]);
      }

      this.data = [ d1 ];

      this.$el.append(this.graph);
      this.plot = $.plot(this.graph, this.data, this.options);

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