var LegendView = Backbone.View.extend({
  el: '#legend-content',

  initialize: function(){
    this.listenTo(this.collection, 'change', this.render);
  },

  render: function() {
    var template = Handlebars.helpers.getTemplate('legend');
    var listHtml = template({'currentTimeseries': this.collection.models});

    this.$el.empty().append(listHtml);
  }

});