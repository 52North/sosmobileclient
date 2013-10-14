var SettingsView = (function() {
  return Backbone.View.extend({
    events: {
      'click .expert': 'changeExpertMode',
      'click .reset': 'reset',
      'click .exit': 'exit',
      'click .close-btn': 'close'
    },

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var template = Handlebars.helpers.getTemplate('settings');
      var listHtml = template(this.model.toJSON());
      
      var settingsModalsTemplate = Handlebars.helpers.getTemplate('settingsModals');
      var settingsModalsHtml = settingsModalsTemplate(this.model.toJSON());
      
      this.$el.html(listHtml);
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

    changeExpertMode: function(e) {
      e.preventDefault();
      this.model.set('expert', !this.model.get('expert'));
    },

    reset: function(e) {
      e.preventDefault();
      Backbone.Mediator.publish('app:reset');
    },

    exit: function(e) {
      e.preventDefault();
      Backbone.Mediator.publish('app:exit');
    },

    close: function(e) {
      console.log("close");
      MfMobile.closeAllPanels();
    }
  });

})();