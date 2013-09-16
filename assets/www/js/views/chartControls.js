var ChartControlsView = (function() {
  return Backbone.View.extend({
    className: 'controls',
    template: Handlebars.helpers.getTemplate('chartControls'),
    
    events: {
      'click .action': 'perform',
      'click .view-settings-btn': 'openViewSettings',
      'click .range-settings-btn': 'openRangeSettings',
    },
    subscriptions: {
      'chart:zoom:changed': 'highlight',
    },

    initialize: function() {
      this.listenTo(window.settings, 'change:timespan', this.render);
    },

    render: function() {
      var data = {
        timespan: window.settings.get('timespan')
      };

      this.$el.html(this.template(data));
      
      return this;
    },

    highlight: function(ranges) {
      var resetBtn = this.$('.reset-btn');
      resetBtn.addClass('highlight');
      setTimeout(function() {
        resetBtn.removeClass('highlight');
      }, 1000);
    },

    openRangeSettings: function(e) {
      e.preventDefault();
      
      new ChartRangeSettingsView({model: window.settings}).render();
    },

    openViewSettings: function(e) {
      e.preventDefault();
      
      new ChartViewSettingsView().render();
    },

    perform: function(e) {
      Helpers.performElementAction(e, false);
    }
  });
})();