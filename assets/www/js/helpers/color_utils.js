var ColorHelpers = (function() {
  return  {

    stringToColor: function(string) {
      if (string == undefined)
        return "000000";
      return this.intToColorHex(this.hashCode(string));
    },

    //M. Jessup, http://stackoverflow.com/questions/2464745/compute-hex-color-code-for-an-arbitrary-string
    hashCode: function (str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    },

    intToColorHex: function(i){
      var rgb = ((i>>16)&0xFF).toString(16) + 
             ((i>>8)&0xFF).toString(16) + 
             (i&0xFF).toString(16);
      rgb = rgb.toString();
      while (rgb.length < 6) {
        rgb = "0" + rgb;
      }
      return rgb;
    }
  };
})();