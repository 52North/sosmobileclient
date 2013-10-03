var ChartControlsView = (function() {
  return Backbone.View.extend({
    className: 'controls',
    template: Handlebars.helpers.getTemplate('chartControls'),
    
    events: {
      'click .action': 'perform',
      'click .view-settings-btn': 'openViewSettings',
      'click .range-settings-btn': 'openRangeSettings',
      'click .btn-prev-periode': 'prevPeriode',
      'click .btn-next-periode': 'nextPeriode',
      'click .btn-refresh': 'fireRefreshRequest'
    },
    subscriptions: {
      'chart:zoom:changed': 'highlight'
    },

    initialize: function() {
      this.listenTo(window.settings, 'change:timespan', this.render);
    },

    render: function() {
      var data = {
        timespan: window.settings.get('timespan')
      };

      this.$el.html(this.template(data));

      if (window.settings.get('timespan').till == moment().format("YYYY-MM-DD")) {
        this.$('.btn-next-periode').hide();
        //this.$('.btn-refresh').show();
      } else {
        //this.$('.btn-next-periode').show();
        this.$('.btn-refresh').hide();
      }

      return this;
    },

    fireRefreshRequest: function() {
      
    },

    prevPeriode: function() {
      //Helpers.getPreviousPeriode()
    },

    nextPeriode: function() {

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

    perform: function(e) {
      Helpers.performElementAction(e, false);
    }
  });
})();