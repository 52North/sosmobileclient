var StationsView = (function() {
  return Backbone.View.extend({
    id: 'map-choose-station-dialog',
    className: 'modal fade',
    attributes: {
      'data-backdrop': 'static'
    },
    template: Handlebars.helpers.getTemplate('station-list'),

    initialize: function(){
    },

    render: function() {
      $(this.el).html(this.template({'stationsCount': this.collection.size()}));

      sationsList = this.$el.find('.list');
      this.collection.each(function(station){
        stationView = new StationView({'model': station});
        sationsList.append(stationView.render().el);
      });
      
      //Close and remove
      var _this = this
      this.$el.on('hidden.bs.modal', function() {
        _this.remove();
      });

      return this;
    }
  });
})();

var StationView = (function() {
  return Backbone.View.extend({
    tagName: 'li',
    template: Handlebars.helpers.getTemplate('station-list-entry'),
    events: {
      //'click .station-header': 'togglePhenomenons'
    },
    timeSeriesActions: [  
    ],

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));

      tsLv = new TimeseriesListView({'collection': this.model.timeseries, 'actions': this.timeSeriesActions});
      this.$el.append(tsLv.render().el);
      
      //this.collapse = this.$('.collapse');
      return this;
    },
    togglePhenomenons: function(e) {
      e.preventDefault();
      this.collapse.collapse('toggle');
    }
  });
})();