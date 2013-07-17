var CurrentSettings = Backbone.Model.extend({
  isSet: function() {
    if ($.totalStorage('current_settings')) {
      return true;
    } else {
      return false;
    }
  },
  
  fetch: function() {
    if (this.isSet()) {
      console.log("current settings bereits gesetzt, hole aus storage")
    } else {
      console.log("current settings noch nicht gesetzt, erstelle neu")
    }
  }
});