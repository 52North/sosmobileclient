var StationsView = Backbone.View.extend({
  id: 'map-choose-station-dialog',
  className: 'modal fade',
  template: Handlebars.helpers.getTemplate('station-list'),

  initialize: function(){
  },

  render: function() {
    $(this.el).html(this.template({'stationsCount': this.collection.size()}));

    list = $(this.el).find('.list');
    this.collection.each(function(station){
      stationView = new StationView({'model': station});
      list.append(stationView.render().el);
    });
    
    return this;
  }
});

var StationView = Backbone.View.extend({
  tagName: 'li',
  template: Handlebars.helpers.getTemplate('station-list-entry'),
  events: {
    'click .station-header': 'togglePhenomenons',
    'click .timeseries': 'addTimeseries'
  },
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.collapse = this.$('.collapse');
    return this;
  },
  togglePhenomenons: function(e) {
    e.preventDefault();
    this.collapse.collapse('toggle');
  },
  addTimeseries: function(e) {
    e.preventDefault();
    Backbone.Mediator.publish('timeseries:add');
  }

});