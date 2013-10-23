var StorageService = (function() {

  function StorageService() {
    
  };

  StorageService.prototype.save = function(key, value) {
    $.totalStorage(key, value);
  };

  StorageService.prototype.load = function(key) {
    return $.totalStorage(key);
  };

  StorageService.prototype.isSet = function(key) {
    if ($.totalStorage(key)) {
      return true;
    } else {
      return false;
    }
  };
  
  return StorageService;

})();