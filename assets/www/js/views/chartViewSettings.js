var ChartViewSettingsView = (function() {
  return Backbone.View.extend({
    template: Handlebars.helpers.getTemplate('chartViewSettings'),
    events: {
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
})();