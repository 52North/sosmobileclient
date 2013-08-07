var DataView = Backbone.View.extend({
  el: '#view-content',
  initialize: function(){
    //console.log("init data view");
  },
  render: function() {
    chart = $("<div>");
    chart.attr('id','chart_div');

    this.$el.append(chart);

    //this.renderChart();
  }

});