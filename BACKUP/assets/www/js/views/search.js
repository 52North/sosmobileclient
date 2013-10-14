var SearchView = (function() {
  return Backbone.View.extend({
    className: "search-tab",
    template: Handlebars.helpers.getTemplate('search'),
    subscriptions: {
      'timeseries:removed': 'render',
      'timeseries:added': 'render'
    },

    initialize: function(){
      
    },

    render: function() {
      var data = {};
      //this.$el.html(this.template(data));



      return this;
    }
  });
})();