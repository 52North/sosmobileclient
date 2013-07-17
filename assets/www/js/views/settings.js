var SettingsView = Backbone.View.extend({

  events: {
    'click .refresh-stations': 'refreshStations'
  },

  initialize: function(){
    console.log("init settings view");
    //model to observe: current_data

  },

  render: function() {
    var template = Handlebars.helpers.getTemplate('settings');
    var listHtml = template();
    this.$el.html(listHtml);

    var settingsModalsTemplate = Handlebars.helpers.getTemplate('settingsModals');
    var settingsModalsHtml = settingsModalsTemplate();
    $('#global-modals').append(settingsModalsHtml);

    Gumby.initialize('toggles');
    Gumby.initialize('switches');
  },

  refreshStations: function() {
    alert("bingo bongo");
    $('.refresh-stations-icon').addClass('icon-spin');

  }
});