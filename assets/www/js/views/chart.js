var ChartView = (function() {

  return Backbone.View.extend({
    className: "chart-wrapper",
    events: {
      'plotselected': 'zoomToSelection'
    },
    subscriptions: {
      'screen:change:ratio': 'render',
      'chart:currentTimeseries:color:change': 'render',
      'chart:view:reset': 'render',
      'chart:currentTimeseries:fetchingData': 'showLoadingScreen'
    },
    graph: $("<div style='width: 100%; height: 100%'>"),
    options: {
      series: {
        lines: {
          show: true,
          fill: true
        },
        shadowSize: 0
      },
      selection: {
        mode: "xy"
      },
      xaxis: {
        mode: "time",
        tickLength: 5
      },
      yaxis: {
        show: true
      },
      legend: {
        //show: false
      }
    },

    initialize: function(){
      this.listenTo(this.collection, 'sync', this.render);
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'remove', this.render);
    },

    render: function() {   
      //Clean up
      this.hideLoadingScreen();
      this.$el.empty();
      if (this.plot) {
        //Important: Disables all obsolete listeners and destroys the plot before redraw.
        this.plot.shutdown();
      }

      //Draw
      if (this.collection.length > 0) {
        
        this.renderChart();
      } else {
        this.$el.html("<div class='placeholder'>No current timeseries visible.<br/>Go on, <a href='#add'>add</a> one.</div>");
      }

      return this;
    },

    showLoadingScreen: function() {
      //console.log('start loading');
    },

    hideLoadingScreen: function() {
      //console.log("end loading");
      //not necessary - this.$el.empty in render
    },



    renderChart: function() {
      this.data = this.convertData();

      this.$el.append(this.graph);
      this.plot = $.plot(this.graph, this.data, this.options);

      $( "canvas.flot-overlay" ).touchit(); //enable touch
    },

    convertData: function() {
      var data = [];

      this.collection.each(function(elem) {
        data.push({
          label: elem.get('timeseriesMetaData').get('uom'),
          data: elem.get('values'),
          color: "#" + elem.get('timeseriesMetaData').get('color')
        });
      });

      return data;
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