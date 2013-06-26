
var MobileRouter = Backbone.Router.extend({
  initialize: function() {
      console.log("router init");
  },

  // Backbone.js Routes
  routes: {
    // When there is no hash bang on the url, the home method is called
    "": "home",
    // When #category? is on the url, the category method is called
    "category?:type": "category"
  },
  // Home method
  home: function() {
    // Programatically changes to the categories page
    //$.mobile.changePage( "#categories" , { reverse: false, changeHash: false } );
    alert("test")
  },
  category: function() {
    alert("hallo");
  }
});
