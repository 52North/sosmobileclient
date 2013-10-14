var ChartController = (function() {

  function ChartController(currentTimeseries) {
    _.extend(this, Backbone.Events);

    this.currentTimeseries = currentTimeseries;

    this.listenTo(this.currentTimeseries, 'change:color',    function() {Backbone.Mediator.publish('chart:currentTimeseries:color:change');});
    this.listenTo(this.currentTimeseries, 'add',             this.addTimeseries);
    this.listenTo(this.currentTimeseries, 'reset',           this.loadAll);
    this.listenTo(window.settings,        'change:timespan', this.loadAll);
    this.listenTo(this.currentTimeseries, 'remove',          this.updateDataCollection);
    this.listenTo(this.currentTimeseries, 'change:hidden',   this.updateDataCollection);

    this.build();
    //this.updateDataCollection();
  };

  ChartController.prototype.build = function() {
    this.el = $("#chart-content");

    var ccv = new ChartControlsView();
    $(this.el).append(ccv.render().$el);

    this.currentTimeseriesDataCollection = new TimeseriesDataCollection();

    this.chartView = new ChartView({'collection': this.currentTimeseriesDataCollection});
    $(this.el).append(this.chartView.render().el);
  };

  /**
   * Synces the Data list with the given meta (e.g. delete/visibility change)
   */
  ChartController.prototype.updateDataCollection = function() {
    var tsData = this.currentTimeseriesDataCollection;
    //for each visible from meta list
    this.currentTimeseries.each(function(meta) {
      if (!meta.get('hidden')) {
        //data list contains this?
        if (!tsData.any(function(elem) {return elem.get('timeseriesMetaData').get('id') == meta.get('id');})) {
          //no: create, fetch, add
          var tsd = new TimeseriesData({'timeseriesMetaData': meta, 'timespan': window.settings.get('timespan')});
          tsData.add(tsd);
          tsd.fetch();
        }
        //yes: continue
      }
    });

    var tsMeta = this.currentTimeseries;  
    //for each from data list: remove, if not in meta list or not visible
    tsData.remove(tsData.filter(function(data) {
      //true: remove  -  false: keep
      var inMetaListAndVisible = tsMeta.any(function(meta) {
        return (meta.get('id') == data.get('timeseriesMetaData').get('id')) && !meta.get('hidden');
      });

      if (!inMetaListAndVisible) {
        data.abort();
      }
      
      return !inMetaListAndVisible;
    }));

    Backbone.Mediator.publish('chart:currentTimeseries:updated');

  };

  /**
   * Adds a timeseries without affecting the rest
   */
  ChartController.prototype.addTimeseries = function(meta) {

    if (!meta.get('hidden')) {
      var tsd = new TimeseriesData({'timeseriesMetaData': meta, 'timespan': window.settings.get('timespan')});
      this.currentTimeseriesDataCollection.add(tsd);
      tsd.fetch();
    }

    Backbone.Mediator.publish('chart:currentTimeseries:updated');
  };

  /**
   * Resets the data list (eg. for timespan change)
   */
  ChartController.prototype.loadAll = function() {
    //add to this.currentTimeseriesDataCollection
    var tsData = this.currentTimeseriesDataCollection;
    tsData.abortAndReset();
    Backbone.Mediator.publish('chart:currentTimeseries:fetchingData');
    this.currentTimeseries.each(function(meta) {
      if (!meta.get('hidden')) {
        var tsd = new TimeseriesData({'timeseriesMetaData': meta, 'timespan': window.settings.get('timespan')});
        tsData.add(tsd);
        tsd.fetch();
      }
    });

  };
  
  return ChartController;

})();