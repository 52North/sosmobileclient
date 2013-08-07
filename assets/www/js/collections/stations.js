var Stations = Backbone.Collection.extend({

  model: Station,

  prefix: "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services/",
  suffix: "/stations.json",
  //prefix: "js/_json/stations/",
  //suffix: ".json",

  url: function(){
    return this.prefix + this.currentService + this.suffix;
  },
  
  initialize: function(props){
    this.currentService = props.currentService;
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