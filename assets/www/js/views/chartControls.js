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
      'chart:zoom:changed': 'highlight'
    },

    render: function() {
      this.$el.html(this.template());
      
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
      
      new ChartRangeSettingsView().render();
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