Mobile Sensor Web Client
========================

This project is under development. The target is a mobile client for the Sensor Observation Network by [52north](http://52north.org/). You will be able to choose from a variety of sensors, add them to your current view and inspect the values.
This project is attended at the [University of Hamburg](http://www.uni-hamburg.de), Germany, dep. [VSIS](http://vsis-www.informatik.uni-hamburg.de/?lang=en).

## Status 
### 8/20/2013
- Frameworks
  - JQuery Geo replaced by Leaflet JS, much easier, better API, better docs, lots of extensions
  - Highcharts remplaced by Rickshaw due to Highcharts licensing model and Rickshaw's size and simple API
- Map
  - Rebuilt with Leaflet JS
  - Station clustering included
  - nicer markers
- Usability
  - Buttons and markers are bigger and therefore better to reach by finger
  - The front end finally is done right. No offscreen content, better transitions and positioning.
- Feature
  - History and Legend work as intended.
- Architecture
  - Controllers added. I feel like I have to think about my JS again.

### 8/10/2013
- Frameworks
  - small Backbone-Mediator - some kind of architecture becomes necessary
  - The Google Charting API is great but not enough. I want to kepp the data transfer as small as possible so I decided to include highcharts - which operates completely on the client side.
- Map
  - The first usable version of the map is finished. With coloring of the stations, GPS positioning and choosing stations and timeseries.

### 8/7/2013
- Frameworks:
  - I replaced gumby with bootstrap 3. I chose Gumby because of its flat design - but since bootstrap is flat, too I returned to the more powerful, mature and javascript accessible framework.
  - test of usability and speed of Google Charts API
- Map:
  - shows stations of current provider (updates automatically on change)
  - shows station(s) (and available phenomenons) on tap on map
- Misc:
  - supports legacy Android versions like Gingerbread
  - changed package name to "n52"

### 7/10/2013
- I removed JQuery Mobile. This framework was to heavy for my needs. I created an ultra lightweight less/js framework for page and panel navigation myself. (155 lines + 40 lines so far)
- I Changed the target Look&Feel. The legend is now planned as a 300px-panel that opens up on top of the "view-data" page.
- I (re-)added the map.

### 6/28/2013
- Navigation between the main pages
- Frameworks work together

## Target look and feel
The UI will be Android-oriented. It consists of 3 main pages/panels:
- "legend"
  This is the current data management page. You can see the different time series in the corresponding color of the chart. You can drop them from your chart here by tapping the bin-button.
- "data view"
  This is the main page. It shows the data in different ways (eg. as table data or line chart)
- "add"
  You can add new time series in four different ways: via a map, a browser, a search or your personal time series history. Additionally you have a settings panel to choose from the list of sensor data providers or update the stations.
![target l+f](https://raw.github.com/marfnk/sosmobileclient/master/target_app.PNG "Target look and feel")

## Frameworks
1. [Phonegap 1.9.0](http://phonegap.com/) (Apache License Version 2.0)
    is wrapper for HTML5 web apps, that bundles and desploys the code as native app for nearly every device. It also provides access to the native phone API to enable features like camera, geolocation and data storage.
2. [JQuery 1.7.2](http://jquery.com/) (MIT Open Source License)
    is the de-facto standard for client-side web apps. It is lightweight and provides an intuitive DOM manipulation API. It is an requirement for most of the libraries used in this project. **Version Info:** For now Phonegap needs the deprecated functions of the 1.7.2 JQuery. JQuery Migration 1.2.1 is included, but muted.
3. [Backbone.js 1.0.0](http://backbonejs.org/) (MIT Open Source License) and [underscore.js](http://underscorejs.org/)
    is a thin client-MVC framework which also handles the routing of the app. Since the Mobile SWC comes with no own server and only the [REST API](https://wiki.52north.org/bin/view/SensorWeb/SensorWebClientRESTInterface) there was a need for a flexible MVC-architecture style.
4. [Bootstrap 3](http://getbootstrap.com/) (Apache Licence v2.0) Since Bootstrap has become flat, I'm glad to use it again. Not to mention its great JavaScript API.
5. [Handlebars](http://handlebarsjs.com/) (MIT Open Source License)
   is a templating engine that works well with backbone.js.
6. [Less](http://lesscss.org/) (Apache License Version 2.0)
   compiles .less stylesheets at the beginning of an application. Less code is way cleaner than CSS and provides variables and nested rules.
7. [jQuery total storage](https://github.com/jarednova/jquery-total-storage) (MIT Open Source Licence)
    is a small plugin that guarantees local storage of data - if HTML5 is not supported it falls automatically back to cookies. With total storage its easy to save and retrieve strings, numbers and even complex json objects in one line.
8. [chalbert/Backbone-Mediator](https://github.com/chalbert/Backbone-Mediator) (MIT Open Source License)
   an ultra small mediator-pattern plugin for backbone.js.
9. [Leaflet js](http://leafletjs.com/) (Self-made Open Source License)
10. [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
11. [shutterstock/rickshaw](https://github.com/shutterstock/rickshaw)

### Removed frameworks
Those frameworks were removed due to changes in requirements.

1. ~~[Require.js 2.1.6](http://requirejs.org/)~~
   This project comes to a size where the different javascript files become difficult to handle. Require.js priovides some functions to manage the structured loading of those files. *Removed. I need to load everything on startup.*
2. ~~[Gumby](http://gumbyframework.com/) (MIT Open Source License)~~
   is a beautiful flat designed responsive theme, that detects the type of device and loads the JQuery Mobile essentials, if needed. *Removed. JavaScript functions are not as good as in Twitter Bootstrap and since v3 Bootstrap is finally flat, too.*
3. ~~[JQuery Mobile 1.3.1](http://jquerymobile.com/)~~
   is mostly used as a complete mobile HTML5 framework. It provides lots of mobile elements such as popups, buttons, pages, navigation bars etc. Although it has its own navigation it is downgraded to a view- enhancing frontend framework. The "backend" of this javascript app will be Backbone.js. *Removed. It is to heavy. I want my own styles and behaviour.*
4. ~~[JQuery Geo 1.0b1](http://jquerygeo.com/)~~ (MIT Open Source License)
   is a JQuery plug-in and basically provides a map with with access to a tile server API. This project uses [OpenStreetMap](http://www.openstreetmap.org/) to display its location data. It has a very easy-to-use API with many functions. You can easily add a map to any JQuery enhanced page with only about 28 characters. Ryan Westphal discusses the different [map plug-ins](http://trippingthebits.com/geopres/). *Removed. This was an easy entry into the world of maps but there are no extensions and the docs don't feed my requirements.*
5. ~~[Highcharts 3.0.4](http://www.highcharts.com/)~~ (Creative Commons BY-NC 3.0)
   one of the best charting APIs and compatible with legacy systems and browsers. Includes the full code which means that no data transfer  is required.
   *Removed. BY-NC is incompatible. Besides, Highcharts is to heavy.*

## MF-Mobile
The MF mobile script is an ultra lightweight CSS and JQuery library that allows page oriented navigation with GPU enhancement through CSS3. It requires JQuery and LESS CSS. It is based upon an [codrops](http://tympanus.net/codrops/2013/05/07/a-collection-of-page-transitions/) example.

Setup MF-Mobile by adding these lines to your HTML file.

    <link rel="stylesheet" href="css/mfmobilepages.css"> <!-- head part -->
    <script src="js/libs/mfmobilepages.js"></script>
    <div id="pt-main" class="pt-perspective">
      <!-- Pages come here -->
    </div>

To create a page that comes from (and goes to) the right side just add the following `<div>` to your page. Note that the first page in your document is shown on startup.

    <div class="pt-page" data-alignment="right" id="myPage">...</div>

To create a panel that comes from (and goes to) the left side just add this `<div>` to your page. All panels are hidden on startup.

    <div class="mf-panel" data-alignment="left" id="myPanel">...</div>

To open panels or navigate to pages use Javascript (JQuery):

    navigateToPage("#page-id"); //Navigates to a page with the given ID
    openPanel("#panel-id"); //Opens the panel with the given ID

This closes all panels (note, that all panels will be automatically closed when navigating to any page):

    closeAllPanels(); //Close all open panels

Configure the CSS in the settings part of `mfmobile.css`:

    min-height: 300px; //best results with pixels
    max-height: 80%; //best result with percentage
    animation-duration: 0.4s !important; //duration of panel opening and closing as well as page navigation


## How to build and run this app ##
**Warning: This app is under development and not ready to use so far.**
You can view the current version either in browser or as a native app on your Android phone.

- To get it to run on your phone install the [Android ADT package](http://developer.android.com/sdk/installing/bundle.html), clone this repo and import it in your ADT Eclipse. Build it, connect your phone in debug mode to your PC and click run.
- To simply view the app an your pc, download or clone this repo, navigate to (repo home)/assets/www and open the indx.html file. I prefer [Google Chrome](https://www.google.com/intl/de/chrome/browser/) since phonegap is build on the same engine. **Attention!** You can't load remote JSON this way due to browser restrictions. You have to set up an XAMPP/LAMPP/MAMPP Server and start your app via http:// protocol. (The file://-protocol is not supported by the SOS Server CORS.)

