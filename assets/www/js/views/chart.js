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
    options: {
      series: {
        lines: {
          show: true
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
        show: false
      },
      grid: {
        borderWidth: 0,
        margin: 0
      }
    },

    initialize: function(){
      this.listenTo(this.collection, 'sync', this.render);
      this.listenTo(this.collection, 'reset', this.render);
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

      this.$el.append(JSON.stringify(this.collection.toJSON()));

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



      var data = [{
      label: "USA",
          data: [[1988, 483994], [1989, 479060], [1990, 457648], [1991, 401949], [1992, 424705], [1993, 402375], [1994, 377867], [1995, 357382], [1996, 337946], [1997, 336185], [1998, 328611], [1999, 329421], [2000, 342172], [2001, 344932], [2002, 387303], [2003, 440813], [2004, 480451], [2005, 504638], [2006, 528692]]
        },        
        {
          label: "Russia",
          data: [[1988, 218000], [1989, 203000], [1990, 171000], [1992, 42500], [1993, 37600], [1994, 36600], [1995, 21700], [1996, 19200], [1997, 21300], [1998, 13600], [1999, 14000], [2000, 19100], [2001, 21300], [2002, 23600], [2003, 25100], [2004, 26100], [2005, 31100], [2006, 34700]]
        }];

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