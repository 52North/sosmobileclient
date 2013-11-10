var StaticChartController = (function() {

  function StaticChartController(currentTimeseries, el) {
    _.extend(this, Backbone.Events);

    this.currentTimeseries = currentTimeseries;
    this.el = $(el);
    this.build();

    this.listenTo(this.currentTimeseries, 'change:color',    this.build);
    this.listenTo(this.currentTimeseries, 'add',             this.build);
    this.listenTo(this.currentTimeseries, 'reset',           this.build);
    this.listenTo(window.settings,        'change:timespan', this.build);
    this.listenTo(this.currentTimeseries, 'remove',          this.build);
    this.listenTo(this.currentTimeseries, 'change:hidden',   this.build);

    Backbone.Mediator.subscribe('screen:change:ratio', this.build, this);
  };

  StaticChartController.prototype.build = function() {
    this.staticView = new StaticChartView({collection: this.currentTimeseries});
    content = $(this.staticView.render().el);
    this.el.html(content);

    this.loadImage(content.width(), content.height());
    //give image to view

  };

  StaticChartController.prototype.loadImage = function(width, height) {
    var timespan = window.settings.get('timespan').din;

    var styleOptions = {};

    if (this.currentTimeseries.length == 0) { 
      this.staticView.render();
      return; 
    }

    this.currentTimeseries.each(function(elem) {
      styleOptions[elem.get('id')] = {
        "chartType": "line",
        "properties": {
          "color": "#" + elem.get('color'),
          "lineType": "solid",
          "width": 2
        }
      };
    });

    var body = {
      "legend": false,
      "timespan": timespan,
      "width": width,
      "height": height,
      "base64": true,
      "language": "en",
      "grid": false,
      "styleOptions": styleOptions
    };

    var _this = this;
    $.support.cors = true;
    this.xhr = $.ajax({
      crossDomain: true,
      type: "POST",
      url: "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/timeseries/getData",
      headers: {
        "accept": "image/png",
        "content-Type": "application/json",
      },
      data: JSON.stringify(body)
    }).done(function (data) {
      _this.staticView.showImage(data);
    }).fail(function (xhr, textStatus) {
        console.log(xhr);
        Helpers.showErrorMessage('Status ' + xhr.status, 'Could not fetch timeseries image.<br/>The server responded with: ' + textStatus);
    });
  };


  StaticChartController.prototype.abort = function() {
    this.xhr.abort();
  };


  StaticChartController.prototype.remove = function() {
    this.staticView.remove();
    this.stopListening();
  };

  return StaticChartController;
})();