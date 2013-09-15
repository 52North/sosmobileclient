var ChartRangeSettingsView = (function() {
  return Backbone.View.extend({
    id: 'chart-range-settings',
    className: 'modal fade',
    template: Handlebars.helpers.getTemplate('chartRangeSettings'),
    events: {
      'hidden.bs.modal': 'remove'
    },

    render: function() {
      var data = {
        presets: [
          {label: 'today', value: 'UTF-TIMESTRING'},
          {label: 'yesterday', value: 'UTF-TIMESTRING'},
          {label: 'this week', value: 'UTF-TIMESTRING'},
          {label: 'last week', value: 'UTF-TIMESTRING'},
          {label: 'this month', value: 'UTF-TIMESTRING'},
          {label: 'last month', value: 'UTF-TIMESTRING'},
          {label: 'this year', value: 'UTF-TIMESTRING'},
        ]
      };


      this.$el.html(this.template());

      $("#temp-modals").html(this.$el);
      this.$el.modal('show');

      return this;
    }

      //this.$el.modal('hide');
      
  });
})();