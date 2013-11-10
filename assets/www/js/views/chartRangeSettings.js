var ChartRangeSettingsView = (function() {
  return Backbone.View.extend({
    id: 'chart-range-settings',
    className: 'modal fade',
    attributes: {
      'data-backdrop': 'static'
    },
    template: Handlebars.helpers.getTemplate('chartRangeSettings'),
    events: {
      'click .preset-btn': 'setPeset',
      'click .confirm-range-btn': 'confirmRange',
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
      this.customFromDate = moment(this.model.get("timespan").from).format("YYYY/MM/DD");
      this.customTillDate = moment(this.model.get("timespan").till).format("YYYY/MM/DD");
      
      var data = {
        presets: [
          {label: 'today', value: 'today'},
          {label: 'yesterday', value: 'yesterday'},
          {label: 'this week', value: 'thisWeek'},
          {label: 'last week', value: 'lastWeek'},
          //{label: 'this month', value: 'thisMonth'},
          //{label: 'last month', value: 'lastMonth'},
          //{label: 'this year', value: 'thisYear'},
          //{label: 'last year', value: 'thisYear'},
        ]
      };
      this.$el.html(this.template(data));

      $("#temp-modals").html(this.$el);

      //initial date
      $(".custom-range-from-label").html(this.customFromDate);
      $(".custom-range-till-label").html(this.customTillDate);

      this.changeOkBtnState();

      //Show modal!
      this.$el.modal('show');

      return this;
    },

    showDateTimeInput: function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.$el.hide();
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
        picker.mobiscroll('setDate', moment(this.model.get("timespan").from).toDate(), true, 0);
      } else if ($(e.currentTarget).hasClass("custom-range-till-picker-btn")) {
        type = "till";

        picker.mobiscroll('setDate',           moment(this.customTillDate, "YYYY/MM/DD").toDate(), true, 0);
        picker.mobiscroll('option', 'minDate', moment(this.customFromDate, "YYYY/MM/DD").toDate());
      } else {
        return;
      }

      picker.mobiscroll('option', 'onClose', function(txt, btn, inst) {
        
        var date = moment(txt, "MM-DD-YYYY"); //workaround
        Backbone.Mediator.publish('chart_range:custom_date:' + type + ':' + btn, date, inst);
      });
      picker.mobiscroll('option', 'headerText', type + ': {value}');

      picker.mobiscroll('show'); 
    },

    fromDateSet: function(date, inst) {
      this.customFromDate = date.format("YYYY/MM/DD");
      $(".custom-range-from-label").html(this.customFromDate);
      this.hidePicker();

      this.presetSelected = false;
      this.customRangeOk = true;
      this.highlightCustomBtn('from', true);
      this.highlightCustomBtn('till', true);
      this.unhighlightPesetBtns();
      this.changeOkBtnState();
      this.validateCustomDates();

      inst.destroy();
    },

    tillDateSet: function(date, inst) {
      this.customTillDate = date.format("YYYY/MM/DD");
      $(".custom-range-till-label").html(this.customTillDate);
      this.hidePicker();
      
      this.presetSelected = false;
      this.customRangeOk = true;
      this.highlightCustomBtn('from', true);
      this.highlightCustomBtn('till', true);
      this.unhighlightPesetBtns();
      this.changeOkBtnState();
      this.validateCustomDates();

      inst.destroy();
    },

    validateCustomDates: function() {
      this.removeWarnings();

      var from = moment(this.customFromDate);
      var till = moment(this.customTillDate);

      if (!this.customRangeSmallerThanOneYear()) {
        this.$('.warnings').append('<div class="alert alert-danger"><i class="icon-warning-sign"></i> The selected timespan is greater than one year. The SOS standard does not support timespans greater than one year.</div>')
      } else if (this.customRangeGreaterThanThreeMonth) {
        this.$('.warnings').append('<div class="alert alert-warning"><i class="icon-warning-sign"></i> The selected timespan is greater than three months. This could affect loading times and zooming performance. Switch to static image mode if you face wonky behaviour.</div>')
      }
    },

    customRangeSmallerThanOneYear: function() {
      var from = moment(this.customFromDate);
      var till = moment(this.customTillDate);
      return (Math.abs(from.diff(till, 'years', true)) < 1)
    },

    customRangeGreaterThanThreeMonth: function() {
      var from = moment(this.customFromDate);
      var till = moment(this.customTillDate);
      return (Math.abs(from.diff(till, 'months', true)) > 3) 
    },

    removeWarnings: function() {
      this.$('.warnings').empty();
    },

    hidePicker: function() {
      $(".tempPicker").remove();
      this.$el.show();
    },

    highlightCustomBtn: function(which, highlight) {
      var btn = this.$(".custom-range-" + which + "-picker-btn");
      if (highlight) {
        btn.removeClass('btn-default');
        btn.addClass('btn-success');
      } else {
        btn.removeClass('btn-success');
        btn.addClass('btn-default');
      }
    },

    unhighlightPesetBtns: function() {
      var btns = this.$('.preset-btn');
      btns.removeClass('btn-success');
      btns.addClass('btn-default');
    },

    setPeset: function(e) {
      var btn = $(e.currentTarget);
      this.choosenPreset = Helpers["isoTimespan"](btn.data('preset-value'));

      this.unhighlightPesetBtns();
      this.highlightCustomBtn('from', false);
      this.highlightCustomBtn('till', false);

      btn.addClass('btn-success');
      btn.removeClass('btn-default');

      this.presetSelected = true;
      this.customRangeOk = false;
      this.changeOkBtnState();

      this.removeWarnings();
    },

    changeOkBtnState: function() {
      var btn = this.$('.confirm-range-btn');
      if ((this.customRangeOk  && this.customRangeSmallerThanOneYear()) || this.presetSelected) {
        btn.removeClass('disabled');
        btn.removeAttr('disabled', 'disabled');
      } else {
        btn.addClass('disabled');
        btn.attr('disabled', 'disabled');
      }
    },

    confirmRange: function(e) {
      e.preventDefault();

      if (this.customRangeOk) {
        if (this.customRangeGreaterThanThreeMonth) {
          Backbone.Mediator.publish('chart:view:switch:static');
        }

        var span = Helpers.isoTimespanFromTill(this.customFromDate, this.customTillDate);
        this.model.set('timespan', span);
      } else if (this.presetSelected) {
        this.model.set('timespan', this.choosenPreset);
      }
      
      this.$el.modal('hide');
      this.$el.on('hidden.bs.modal', function() {
        Backbone.Mediator.pub("timespan:date_picking:finished")
      });
    }
  });
})();