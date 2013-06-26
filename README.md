Mobile Sensor Web Client
========================

This project aims to build a mobile client for the Sensor Observation Network by [52north](https://wiki.52north.org/bin/view). You will be able to choose from a variety of sensors, add them to your current view and inspect the values.
This project is attendet at the [University of Hamburg](http://www.uni-hamburg.de), Germany, dep. [VSIS](http://vsis-www.informatik.uni-hamburg.de/?lang=en).

## Target look and feel
The UI will be Android-oriented but with JQuery Mobile styling. It consists of 3 main pages:
- "legend"
  This is the current data management page. You can see the different time series in the corresponding color of the chart. You can drop them from your chart here by tapping the bin-button.
- "data view"
  This is the main page. It shows the data in different ways (eg. as table data or line chart)
- "add"
  You can add new time series in four different ways: via a map, a browser, a search or your personal time series history.
![target l+f](https://raw.github.com/marfnk/sosmobileclient/master/target_app.PNG "Target look and feel")

## 3. Party Libraries
1. [Phonegap 1.9.0](http://phonegap.com/)
    is wrapper for HTML5 web apps, that bundles and desploys the code as native app for nearly every device. It also provides access to the native phone API to enable features like camera, geolocation and data storage.
2. [JQuery 1.7.2](http://jquery.com/)
    is the de-facto standard for client-side web apps. It is lightweight and provides an intuitive DOM manipulation API. It is an requirement for most of the libraries used in this project.
3. [JQuery Mobile 1.3.1](http://jquerymobile.com/)
   is mostly used as a complete mobile HTML5 framework. It provides lots of mobile elements such as popups, buttons, pages, navigation bars etc. Although it has its own navigation it is downgraded to a view-enhancing frontend framework. The "backend" of this javascript app will be Backbone.js.
4. [Backbone.js 1.0.0](http://backbonejs.org/) (with [underscore.js](http://underscorejs.org/))
    is a thin client-MVC framework which also handles the routing of the app. Since the Mobile SWC comes with no own server and only the [REST API](https://wiki.52north.org/bin/view/SensorWeb/SensorWebClientRESTInterface) there was a need for a flexible MVC-architecture style.
5. [Require.js 2.1.6](http://requirejs.org/)
   This project comes to a size, where the different javascript files become difficult to handle. Require.js priovides some functions to manage the loading of those files.
6. [JQuery Geo 1.0b1](http://jquerygeo.com/)
   is a JQuery plug-in and basically provides a map with with access to a tile server API. This project uses [OpenStreetMap](http://www.openstreetmap.org/) to display its location data. It has a very easy-to-use API with many functions. You can easily add a map to any JQuery enhanced page with only about 28 characters. Ryan Westphal discusses the different [map plug-ins](http://trippingthebits.com/geopres/).
7. [Google Chart Library](https://developers.google.com/chart/)
   Not implemented yet.

