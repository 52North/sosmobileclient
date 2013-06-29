/*
--vendor
js/libs/jquery-1.7.2.min.js
js/libs/jquery.mobile/jquery.mobile-1.3.1
js/libs/phonegap/cordova-1.9.0
js/libs/jquery.geo-1.0b1.min
js/libs/underscore
js/libs/backbone-1.0.0
--phonegap api
js/libs/phonegap/apis/accelerometer
js/libs/phonegap/apis/camera
js/libs/phonegap/apis/capture
js/libs/phonegap/apis/compass
js/libs/phonegap/apis/connection
js/libs/phonegap/apis/contacts
js/libs/phonegap/apis/device
js/libs/phonegap/apis/events
js/libs/phonegap/apis/file
js/libs/phonegap/apis/geolocation
js/libs/phonegap/apis/media
js/libs/phonegap/apis/notification
js/libs/phonegap/apis/storage

  <script src="js/libs/modernizr.js"></script>
  <script src="js/libs/gumby.min.js"></script>
  <script src="js/libs/gumby-plugins.js"></script>
  <script src="js/libs/gumby-main.js"></script>

*/

require.config({ 
  paths: { 
    'jquery': 'libs/jquery-1.7.2.min',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone-1.0.0',
    'phonegap': 'libs/phonegap/cordova-1.9.0',
    'jquerygeo': 'libs/jquery.geo-1.0b1.min',
    'handlebars': 'libs/handlebars-1.0.0',
    'gumby': 'libs/gumby-main',
    'modernizr': 'libs/modernizr',
    'gumby-lib': 'libs/gumby.min',
    'gumby-plugins': 'libs/gumby-plugins'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    handlebars: {
      exports: "Handlebars"
    },
    gumby: {
      deps: ["jquery", "modernizr", "gumby-lib", "gumby-plugins"],
      exports: "Gumby"
    }
  }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'gumby'
  ], 
  function($, _, Backbone, Handlebars, Gumby, Offcanvas){
    // Prevents all anchor click and hash change handling
    console.log("require js initialize");

    //Loading the handlebars
    Handlebars.registerHelper('getTemplate', function(name) {
      if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
          url : 'js/views/templates/' + name + '.hbs',
          success : function(data) {
            if (Handlebars.templates === undefined) {
              Handlebars.templates = {};
            }
            Handlebars.templates[name] = Handlebars.compile(data);
          },
          dataType: "text",
          async : false
        });
      }
      return Handlebars.templates[name];
    });

    require(['app'], function(App){
      App.initialize();
    });
  }
);