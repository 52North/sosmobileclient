var ChartView = Backbone.View.extend({
  initialize: function(){

    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    Backbone.Mediator.subscribe('screen:change:ratio', this.render, this);
    Backbone.Mediator.subscribe('screen:change:ratio', this.render, this);
  },

  render: function() {   
    this.$el.empty();
    if (this.collection.anythingVisible()) {
      //Todo loading screen!
    } else {
      //TODO message for the user, that there is nothing to display
    }

    return this;
  },

  /**
   * Callback when timeseries data is fetched
   */
  addDataSerie: function(data) {
    if (this.graph) {
      //add 
    } else {
      //render with this
      initialRenderChart(data);
    }
  },

  initialRenderChart: function() {

  }
     
});