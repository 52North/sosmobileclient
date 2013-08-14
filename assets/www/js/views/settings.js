var SettingsView = Backbone.View.extend({
  el: $(document),

  events: {
    'click .refresh-stations': 'refreshStations',
    'click .availableServiceLink': 'changeService',
    'click .expert': 'changeExpertMode'
  },

  initialize: function(){
    svMe = this;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.options.availableServices, 'sync', this.render);
    //$('.availableServiceLink').on('click', this.changeService);
  },

  render: function() {
    template = Handlebars.helpers.getTemplate('settings');
    listHtml = template(this.model.toJSON());
    
    settingsModalsTemplate = Handlebars.helpers.getTemplate('settingsModals');
    settingsModalsHtml = settingsModalsTemplate($.extend(this.model.toJSON(), {'availableServices': this.options.availableServices.toJSON()}));
    
    $('#settings-content').empty().html(listHtml);
    this.updateExpertIcon();


    //modals
    if ($("#global-modals #settings-modals").length != 1) {
      $("#global-modals").append($("<div>").attr("id","settings-modals"));
    } else {
      $("#global-modals #settings-modals").empty();
    }
    $("#global-modals #settings-modals").append(settingsModalsHtml);
  },

  updateExpertIcon: function() {
    icon = this.$('#expert-icon');
    icon.removeClass();
    if (this.model.get('expert')) {
      icon.addClass('icon-ok ');
    } else {
      icon.addClass('icon-remove');
    }
  },

  refreshStations: function(e) {
    e.preventDefault();
    svMe.$('.refresh-stations-icon').addClass('icon-spin');
    svMe.options.currentStations.fetch({'reset': true, 'success': this.finishedStationUpdate});
  },

  finishedStationUpdate: function() {
    svMe.$('.refresh-stations-icon').removeClass('icon-refresh');
    svMe.$('.refresh-stations-icon').removeClass('icon-spin');
    svMe.$('.refresh-stations-icon').addClass('icon-ok');
    setTimeout(function() {
      svMe.$('.refresh-stations-icon').removeClass('icon-ok');
      svMe.$('.refresh-stations-icon').addClass('icon-refresh');
    }, 750);

    svMe.model.set('lastStationUpdate', new Date().toLocaleString())
  },

  changeService: function(e) {
    e.preventDefault();
    $('#providerModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    newService = $(e.currentTarget).data('station');
    svMe.model.set('currentProvider', newService);
    svMe.options.currentStations.url = generateStationsUrl(newService);
    svMe.refreshStations(e);
  },

  changeExpertMode: function(e) {
    e.preventDefault();
    this.model.set('expert', !this.model.get('expert'));
  }
});