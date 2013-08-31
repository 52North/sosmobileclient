var LegendTimeserieView = Backbone.View.extend({
  tagName: 'li',
  template: Handlebars.helpers.getTemplate('legendTimeserieListEntry'),
  
  events: {
    'click .action': 'perform'
  },

  initialize: function() {
    var _this = this;
    this.listenTo(this.model, 'sync', this.render);

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

    this.$('#hide-timeseries-icon').addClass('icon-eye-open');
    
    return this;
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
  }

});