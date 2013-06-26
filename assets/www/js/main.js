/*
  <!-- JQUERY -->
  <script src="js/libs/jquery-1.7.2.min.js"></script>
  <!-- Jquery Mobile -->
  <script src="js/libs/jquery.mobile/jquery.mobile-1.3.1.js"></script>
  <!-- Phonegap 
  <script src="js/libs/phonegap/cordova-1.9.0.js"></script>
  <!- - JQuery Geo 
  <script src="js/libs/jquery.geo-1.0b1.min.js"></script>
  -->
  <!-- Backbone -->
  <script src="js/libs/underscore.js"></script>
  <script src="js/libs/backbone-1.0.0.js"></script>

  <!-- Phonegap API -->
  <!--
  <script src="js/libs/phonegap/apis/accelerometer.js"></script>
  <script src="js/libs/phonegap/apis/camera.js"></script>
  <script src="js/libs/phonegap/apis/capture.js"></script>
  <script src="js/libs/phonegap/apis/compass.js"></script>
  <script src="js/libs/phonegap/apis/connection.js"></script>
  <script src="js/libs/phonegap/apis/contacts.js"></script>
  <script src="js/libs/phonegap/apis/device.js"></script>
  <script src="js/libs/phonegap/apis/events.js"></script>
  <script src="js/libs/phonegap/apis/file.js"></script>
  <script src="js/libs/phonegap/apis/geolocation.js"></script>
  <script src="js/libs/phonegap/apis/media.js"></script>
  <script src="js/libs/phonegap/apis/notification.js"></script>
  <script src="js/libs/phonegap/apis/storage.js"></script>
  -->
*/

require.config({ 
  paths: { 
    'jquery': 'libs/jquery-1.7.2.min',
    'jquerymobile': 'libs/jquery.mobile/jquery.mobile-1.3.1',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone-1.0.0'
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
    // Prevents all anchor click handling, prevents jQuery Mobile from handling hash changes
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;

    alert("main loaded " + $.mobile.linkBindingEnabled + $.mobile.hashListeningEnabled);

    require(['app'], function(App){
      App.initialize();
    });
  }
);