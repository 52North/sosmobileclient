var StaticChartView = (function() {
  return Backbone.View.extend({
    className: "chart-wrapper",
    events: {
    },
    subscriptions: {
    },
    initialize: function(){
     
    },

    render: function() {
      this.$el.empty();


      if (this.collection.isEmpty()) {
        this.$el.html("<div class='placeholder'>No current timeseries.<br/>Go on, <a href='#add'>add</a> one.</div>");
      } else {
        this.$el.html("<div class='placeholder'>The server is rendering the image.<br/><i class='icon-refresh icon-spin icon-4x'></i></div>");
      }

      return this;
    },

    showImage: function(baseString) {
      this.$el.html('<img src="data:image/png;base64,' + baseString + '" />');
    }
  });
})();