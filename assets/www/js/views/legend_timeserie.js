var LegendTimeserieView = (function() {
  return Backbone.View.extend({
    tagName: 'li',
    template: Handlebars.helpers.getTemplate('legendTimeserieListEntry'),
    
    events: {
      'click .action': 'perform',
      'click .hide-timeseries': 'hideTimeseries'
    },

    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'change:hidden', this.updateHideState);

      if (!this.model.isSynced()) {
        this.model.fetch();
      }
    },

    render: function() {
      var model = this.model.toJSON();
      model['actions'] = this.options.actions;
      model['expert'] = window.settings.get('expert');
      model['synced'] = this.model.isSynced();
      this.listenTo(this.model, 'change:color', this.render);
      this.$el.html(this.template(model));

      this.updateHideState();
      
      return this;
    },

    updateHideState: function() {
       if (this.model.get('hidden')) {
        this.$('#hide-timeseries-icon').removeClass('icon-eye-open');
        this.$('#hide-timeseries-icon').addClass('icon-eye-close');
        this.$('.wrapper').addClass('hidden-ts');
      } else {
        this.$('#hide-timeseries-icon').removeClass('icon-eye-close');
        this.$('#hide-timeseries-icon').addClass('icon-eye-open');
        this.$('.wrapper').removeClass('hidden-ts');
      }
    },

    hideTimeseries: function() {
      if (this.model.get('hidden')) {
        this.model.set('hidden', false);
      } else {
        this.model.set('hidden', true);
      }
    },

    perform: function(e) {
      Helpers.performElementAction(e, this.model);
    }

  });
})();