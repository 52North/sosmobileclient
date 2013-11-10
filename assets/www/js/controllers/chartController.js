var ChartController = (function() {

  function ChartController(currentTimeseries) {
    _.extend(this, Backbone.Events);

    this.currentTimeseries = currentTimeseries;
    
    //horcht auf alle events, entscheidet, welchert controller angestoßenb wird

    //switch views
    Backbone.Mediator.subscribe('chart:view:switch:dynamic', this.switchDynamic, this);
    Backbone.Mediator.subscribe('chart:view:switch:static', this.switchStatic, this);

    this.el = $("#chart-content");

    var ccv = new ChartControlsView();
    $(this.el).append(ccv.render().$el);

    this.innerChartContent = $("<div>");
    $(this.el).append(this.innerChartContent);

    Backbone.Mediator.subscribe('app:booted', this.build, this);
  };

  ChartController.prototype.switchStatic = function() {
    if (window.settings.get('currentViewType') != 'static') {
      window.settings.set('currentViewType', 'static');
      this.build();
      Backbone.Mediator.publish('chart:view:changed:static');
    }
  };

  ChartController.prototype.switchDynamic = function() {
    if (this.dynamicViewAllowed() && window.settings.get('currentViewType') != 'dynamic') {
      window.settings.set('currentViewType', 'dynamic');
      this.build();
      Backbone.Mediator.publish('chart:view:changed:dynamic');
    }
  };

  ChartController.prototype.dynamicViewAllowed = function() {
    return true;
  };
  


  ChartController.prototype.build = function() {
    //remove and destroy existing controllers and views

    if (typeof this.dynamicController != 'undefined') {
      this.dynamicController.remove();
    }

    if (typeof this.staticController != 'undefined') {
      this.staticController.remove();
    }
    
    if (window.settings.get('currentViewType') == 'static') {
      this.staticController = new StaticChartController(this.currentTimeseries, this.innerChartContent);
    } else {
      this.dynamicController = new DynamicChartController(this.currentTimeseries, this.innerChartContent);
    }
  };
  
  return ChartController;

})();