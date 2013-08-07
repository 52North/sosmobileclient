var DataView = Backbone.View.extend({
  el: '#view-content',
  initialize: function(){
    //console.log("init data view");
  },
  render: function() {
    this.$el.append("<h2>SOS Mobile Client</h2><h3>Mobile SWC</h3>");
  }
});