var StorageService = (function() {

  function StorageService() {
    window.localStorage.getItem(this.key);
  };

  StorageService.prototype.save = function(key, value) {
    window.localStorage.setItem(this.key, value);
  };

  StorageService.prototype.load = function(key) {
    return window.localStorage.getItem(key);
  };

  StorageService.prototype.isSet = function(key) {
    if (window.localStorage.getItem(key)) {
      return true;
    } else {
      return false;
    }
  };
  
  return StorageService;
})();