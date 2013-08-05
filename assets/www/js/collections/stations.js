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
    alert("niy - ", coord);
  }
});