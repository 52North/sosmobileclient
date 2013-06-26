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
*/

require.config({ 
  paths: { 
    'jquery': 'libs/jquery-1.7.2.min',
    'jquerymobile': 'libs/jquery.mobile/jquery.mobile-1.3.1',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone-1.0.0',
    'phonegap': 'js/libs/phonegap/cordova-1.9.0',
    'jquerygeo': 'js/libs/jquery.geo-1.0b1.min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }
});

require([
    'jquery',
    'jquerymobile',
    'underscore',
    'backbone'
  ], 
  function($, jqm, _, Backbone){
    // Prevents all anchor click and hash change handling
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.defaultPageTransition = "flip";
    console.log("main.js loaded; jQm-linkBindingEnabled/hashListeningEnabled: " + $.mobile.linkBindingEnabled + "/" + $.mobile.hashListeningEnabled);

    require(['app'], function(App){
      App.initialize();
    });
  }
);