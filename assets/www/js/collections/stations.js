var Stations = Backbone.Collection.extend({

  model: Station,
  url: 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services/PEGELONLINE/stations.json',

  initialize: function(){
    
  },

  getByCoordinates: function(coord) {
    coordArray = [].concat( coord );
    results = [];
    _.each(this.models, function (elem) {
      if ($.inArray(elem.get('geometry').coordinates, coordArray) != -1) {
        results.push(elem.toJSON());
      }
    });
    return results;
  },
  getByCoordinate: function(coord) {
    return this.find(function(model) { return model.get('geometry').coordinates == coord; });
  }

});