var Stations = Backbone.Collection.extend({

  model: Station,
  url: 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services/PEGELONLINE/stations.json',

  initialize: function(){
    
  },

  getByCoordinates: function(coord) {
    coordArray = [].concat( coord );

    newCollection = new Stations();
    this.each(function(elem) {
      var c = elem.get('geometry').coordinates;
      if (c[0] == coord[0] && c[1] == coord[1]) {
        newCollection.add(elem);
      }
    });

    return newCollection;
  }

});