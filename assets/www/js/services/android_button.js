var AndroidButtonService = (function() {

  function AndroidButtonService(router) {
    this.router = router;

    Backbone.Mediator.subscribe('device:button:back', this.backbutton, this);
    Backbone.Mediator.subscribe('device:button:menu', this.toggleSettings, this);

  };

  AndroidButtonService.prototype.backbutton = function() {
    if (this.hasOpenedModal()) {
      console.log("open modal");
      Backbone.Mediator.publish('close:modals');
      $('.modal').modal('hide'); //close modal
    } else if (this.hasOpenedPanel()) {
      console.log("open panel")
      Backbone.Mediator.publish('close:panels');
      MfMobile.closeAllPanels(); //close panel
    } else if (this.currentPage() == "chart") {
      //Backbone.Mediator.publish('app:exit'); //ask for exit
    } else {
      this.router.navigate("#chart", {trigger: true, replace: true}); //navigate to chart
    }
  };

  AndroidButtonService.prototype.hasOpenedPanel = function() {
    return $('.mf-panel-current').length > 0;
  };

  AndroidButtonService.prototype.currentPage = function() {
    return Backbone.history.fragment;
  };

  AndroidButtonService.prototype.hasOpenedModal = function() {
    return $('body').hasClass('modal-open');
  };
  
  AndroidButtonService.prototype.toggleSettings = function() {
    if ($('#settings-panel').hasClass('mf-panel-current')) {
      MfMobile.closeAllPanels(); //close panels
    } else {
      MfMobile.openPanel("#settings-panel");
    }
  };

  return AndroidButtonService;

})();