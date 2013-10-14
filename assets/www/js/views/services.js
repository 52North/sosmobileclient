var ServicesView = (function() {
  return Backbone.View.extend({
    id: 'providerModal',
    className: 'modal fade',
    attributes: {
      'data-backdrop': 'static'
    },
    events: {
      'click .availableServiceLink': 'changeProvider',
      'hidden.bs.modal': 'render'
    },

    initialize: function(){
      this.listenTo(this.collection, 'sync', this.render);
      this.listenTo(this.collection, 'render', this.render);

      Backbone.Mediator.subscribe('service:choose', this.showModal, this);
    },

    render: function() {
      var modalsTemplate = Handlebars.helpers.getTemplate('servicesModal');
      var modalsHtml = modalsTemplate({'availableServices': this.collection.toJSON(), 'currentService': window.settings.get('currentProvider')});
      this.$el.html(modalsHtml);

      return this;
    },

    showModal: function() {
      this.$el.modal("show");
    },

    changeProvider: function(e) {
      e.preventDefault();
      e.stopPropagation();

      $('#providerModal').modal('hide');
      var newService = $(e.currentTarget).data('station');
      
      Backbone.Mediator.publish("service:change", newService);
     
    }
  });
})();