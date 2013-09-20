var ChartRangeSettingsView = (function() {
  return Backbone.View.extend({
    id: 'chart-range-settings',
    className: 'modal fade',
    template: Handlebars.helpers.getTemplate('chartRangeSettings'),
    events: {
      'click .preset-btn': 'usePreset',
      'click .custom-range-ok': 'useFromTill',
      'click .custom-range-from-picker-btn': 'showDateTimeInput',
      'click .custom-range-till-picker-btn': 'showDateTimeInput'
    },
    subscriptions: {
      "chart_range:custom_date:from:set": 'fromDateSet',
      "chart_range:custom_date:till:set": 'tillDateSet',
      "chart_range:custom_date:from:cancel": 'hidePicker',
      "chart_range:custom_date:till:cancel": 'hidePicker'
    },

    initialize: function() {
    },

    render: function() {
      var data = {
        current: this.model.get('timespan'),
        presets: [
          {label: 'today', value: 'today'},
          {label: 'yesterday', value: 'yesterday'},
          {label: 'this week', value: 'thisWeek'},
          {label: 'last week', value: 'lastWeek'},
          {label: 'this month', value: 'thisMonth'},
          {label: 'last month', value: 'lastMonth'},
          {label: 'this year', value: 'thisYear'},
          {label: 'last year', value: 'thisYear'},
        ]
      };

      this.customFromDate = this.model.get("timespan").from;
      this.customTillDate = this.model.get("timespan").till;

      this.$el.html(this.template(data));

      $("#temp-modals").html(this.$el);

      //initial date
      $(".custom-range-from-label").html(this.customFromDate);
      $(".custom-range-till-label").html(this.customTillDate);
      
      //Show modal!
      this.$el.modal('show');

      return this;
    },

    showDateTimeInput: function(e) {
      e.preventDefault();

      this.$el.modal('hide');
      var type;

      var picker = $("<div>");
      picker.addClass("tempPicker");
      $("#temp-modals").append(picker);
      //delete me afterwards

      picker.mobiscroll().date({
          theme: 'android-ics light',
          display: 'modal',
          mode: 'mixed',
          maxDate: new Date()
      });

      if ($(e.currentTarget).hasClass("custom-range-from-picker-btn")) {
        type = "from";
        picker.mobiscroll('setDate', moment(this.model.get("timespan").from).toDate(), false, 0);
      } else {
        type = "till";

        picker.mobiscroll('setDate',           moment(this.model.get("timespan").till).toDate(), false, 0);
        picker.mobiscroll('option', 'minDate', moment(this.model.get("timespan").from).toDate());
      }

      picker.mobiscroll('option', 'onClose', function(txt, btn, inst) {
        Backbone.Mediator.publish('chart_range:custom_date:' + type + ':' + btn, txt, inst);
      });
      picker.mobiscroll('option', 'headerText', type + ': {value}');

      picker.mobiscroll('show'); 
    },

    fromDateSet: function(txt, inst) {
      this.customFromDate = moment(inst.getDate()).format("YYYY-MM-DD");
      $(".custom-range-from-label").html(this.customFromDate);
      this.hidePicker(txt, inst);
    },

    tillDateSet: function(txt, inst) {
      this.customTillDate = moment(inst.getDate()).format("YYYY-MM-DD");
      console.log(txt, inst, this.customTillDate);
      $(".custom-range-till-label").html(this.customTillDate);
      this.hidePicker(txt, inst);
    },

    hidePicker: function(txt, inst) {
      inst.destroy();
      $(".tempPicker").remove();
      this.$el.modal('show');
    },

    usePreset: function(e) {
      var method = $(e.currentTarget).data('preset-value');
      var span = Helpers["isoTimespan"](method);
      this.model.set('timespan', span);

      this.$el.modal('hide');
      this.$el.on('hidden.bs.modal', function() {
        Backbone.Mediator.pub("timespan:date_picking:finished")
      });
    },

    useFromTill: function(e) {
      e.preventDefault();

      var span = Helpers.isoTimespanFromTill(this.customFromDate, this.customTillDate);
      this.model.set('timespan', span);
      
      this.$el.modal('hide');
      this.$el.on('hidden.bs.modal', function() {
        Backbone.Mediator.pub("timespan:date_picking:finished")
      });
    }    
      
  });
})();