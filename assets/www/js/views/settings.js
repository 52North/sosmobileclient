var SettingsView = Backbone.View.extend({
  el: $(document),

  events: {
    'click .refresh-stations': 'refreshStations',
    'click .availableServiceLink': 'changeService'
  },

  initialize: function(){
    svMe = this;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.options.availableServices, 'sync', this.render);
    //$('.availableServiceLink').on('click', this.changeService);
  },

  render: function() {
    var template = Handlebars.helpers.getTemplate('settings');
    var listHtml = template(this.model.toJSON());

    var settingsModalsTemplate = Handlebars.helpers.getTemplate('settingsModals');
    var settingsModalsHtml = settingsModalsTemplate($.extend(this.model.toJSON(), {'availableServices': this.options.availableServices.toJSON()}));
    
    $('#settings-content').empty().html(listHtml);
    
    //modals
    if ($("#global-modals #settings-modals").length != 1) {
      $("#global-modals").append($("<div>").attr("id","settings-modals"));
    } else {
      $("#global-modals #settings-modals").empty();
    }
    $("#global-modals #settings-modals").append(settingsModalsHtml);
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
  }
});