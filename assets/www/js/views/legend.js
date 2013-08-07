var LegendView = Backbone.View.extend({
  el: '#legend-content',

  initialize: function(){
    this.listenTo(this.collection, 'all', this.render);
  },

  render: function() {
    var template = Handlebars.helpers.getTemplate('legend');
    var listHtml = template({'currentTimeseries': collectionModelsToJSONArray(this.collection)});
    this.$el.empty().append(listHtml);
  }

});