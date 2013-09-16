var ChartRangeSettingsView = (function() {
  return Backbone.View.extend({
    id: 'chart-range-settings',
    className: 'modal fade',
    template: Handlebars.helpers.getTemplate('chartRangeSettings'),
    events: {
      'hidden.bs.modal': 'remove',
      'click .preset-btn': 'usePreset',
      'click .custom-range-ok': 'useFromTill'
    },
    subscriptions: {
      'chart:range_settings:from:change': 'fromDateChanged',
      'chart:range_settings:till:change': 'tillDateChanged'
    },

    render: function() {
      var data = {
        current: this.model.get('timerange'),
        presets: [
          {label: 'today', value: 'today'},
          {label: 'yesterday', value: 'yesterday'},
          {label: 'last 4 hours', value: 'lastXhours', param: 4},
          {label: 'last 12 hours', value: 'lastXhours', param: 12},
          {label: 'last 24 hours', value: 'lastXhours', param: 24},
          {label: 'this week', value: 'thisWeek'},
          {label: 'last week', value: 'lastWeek'},
          {label: 'this month', value: 'thisMonth'},
          {label: 'last month', value: 'lastMonth'},
          {label: 'this year', value: 'thisYear'},
        ]
      };

      this.$el.html(this.template(data));

      $("#temp-modals").html(this.$el);
      
      $('#customRangeFromPicker').mobiscroll().datetime({
          theme: 'android-ics light',
          display: 'inline',
          mode: 'scroller',
          onChange: function(txt, inst) {
            Backbone.Mediator.publish('chart:range_settings:from:change', inst);
          },
          onShow: function(html, valueText, inst) {
            Backbone.Mediator.publish('chart:range_settings:from:change', inst);
          }
      });

      $('#customRangeTillPicker').mobiscroll().datetime({
        theme: 'android-ics light',
        display: 'inline',
        mode: 'scroller',
        onChange: function(txt, inst) {
            Backbone.Mediator.publish('chart:range_settings:till:change', inst);
          },
          onShow: function(html, valueText, inst) {
            Backbone.Mediator.publish('chart:range_settings:till:change', inst);
          }
      });

      //Show modal!
      this.$el.modal('show');

      return this;
    },

    tillDateChanged: function(inst) {
      $(".custom-range-till-label").html(inst.val);
    },

    fromDateChanged: function(inst) {
      $(".custom-range-from-label").html(inst.val);
      var targetDate = new Date(inst.getDate().getTime() + 1*60000);
      $('#customRangeTillPicker').mobiscroll('option', 'minDate', targetDate);
    },

    usePreset: function(e) {
      var method = $(e.currentTarget).data('preset-value');
      var param = $(e.currentTarget).data('preset-param');
      var span = Helpers["isoTimespan"](method, param);
      this.model.set('timespan', span);
      this.$el.modal('hide');
    },

    useFromTill: function(e) {
      e.preventDefault();
      var from = $('#customRangeFromPicker').mobiscroll('getDate');
      var till = $('#customRangeTillPicker').mobiscroll('getDate');
      var span = Helpers.isoTimespanFromTill(from, till);
      this.model.set('timespan', span);
      this.$el.modal('hide');
    }    
      
  });
})();