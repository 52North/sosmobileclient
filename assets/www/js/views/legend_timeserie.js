var LegendTimeserieView = Backbone.View.extend({
  tagName: 'li',
  template: Handlebars.helpers.getTemplate('legendTimeserieListEntry'),
  
  events: {
    'click .perform': 'perform',
    'click .hide-timeseries': 'hideTimeseries'
  },

  initialize: function() {
    var _this = this;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'change:hidden', this.render);

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

    this.updateHideIcon();
    
    return this;
  },

  updateHideIcon: function() {
     if (this.model.get('hidden')) {
      this.$('#hide-timeseries-icon').removeClass('icon-eye-open');
      this.$('#hide-timeseries-icon').addClass('icon-eye-close text-danger');
    } else {
      this.$('#hide-timeseries-icon').removeClass('icon-eye-close text-danger');
      this.$('#hide-timeseries-icon').addClass('icon-eye-open');
    }
  },

  perform: function(e) {
    e.preventDefault();
    callback = $(e.currentTarget).data('action');

    //TODO already added?
    Backbone.Mediator.publish(callback, this.model);

    navigate = $(e.currentTarget).data('navigate');
    if (navigate) {
      $('.modal').modal('hide');
      window.location.href = navigate;
    }
  },

  hideTimeseries: function() {
    if (this.model.get('hidden')) {
      this.model.set('hidden', false);
    } else {
      this.model.set('hidden', true);
    }
  }

});