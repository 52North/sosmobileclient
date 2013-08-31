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
      this.initialRenderChart();
    } else {
      //TODO message for the user
      console.log("graph blank");
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
      var data = {
  "xScale": "ordinal",
  "yScale": "linear",
  "type": "bar",
  "main": [
    {
      "className": ".pizza",
      "data": [
        {
          "x": "Pepperoni",
          "y": 12
        },
        {
          "x": "Cheese",
          "y": 8
        }
      ]
    }
  ],
  "comp": [
    {
      "className": ".pizza",
      "type": "line-dotted",
      "data": [
        {
          "x": "Pepperoni",
          "y": 10
        },
        {
          "x": "Cheese",
          "y": 4
        }
      ]
    }
  ]
};

      var myChart = new xChart('line', data, this.el);

  }
});