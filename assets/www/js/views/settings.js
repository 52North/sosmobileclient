var SettingsView = Backbone.View.extend({
  initialize: function(){
    console.log("init data view");
  },

  render: function() {
    var template = Handlebars.helpers.getTemplate('settings');
    var html = template();

    this.$el.html(html);
  }
});