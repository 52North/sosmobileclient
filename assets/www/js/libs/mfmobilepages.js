$(function() {
  $(".close-panel-btn").click(function(event) {
    selector = $(this).attr("data-page-target");
    if ($(selector).hasClass("panel")) {
      $(selector).toggleClass("out in");

      //every page: opacity 1
      $(".page.in").removeClass("panel-bg");
    }
  });

  $(document).click(function(event) {
    //if any panel open 
    if ($(".panel.in").size() > 0) {
      //if outside a panel: close panel
      if ($(event.target).parents(".panel").size() == 0
          && !$(event.target).hasClass("panel")
          && $(event.target).parents(".page-btn").size() == 0) {
       $(".close-panel-btn").trigger("click");
      }
    }
  });
});

function navigateToPage(selector) {
  //if target page isn't already in
  if (!$(selector).hasClass("in")) {
    //close all panels
    $(".panel.in").each(function() {
       $(this).addClass("out");
       $(this).removeClass("in");
    });
    //every page: opacity 1
    $(".page.in").removeClass("panel-bg");
    //every in-page: out
    $(".page.in").each(function() {
       $(this).addClass("out");
       $(this).removeClass("in");
    });
    //target page: in
    $(selector).removeClass("out");
    $(selector).addClass("in");
  }
}

function openPanel(selector) {
  //if panel isn't already in
  if (!$(selector).hasClass("in")) {
    //every in-Panel -> out
    $(".panel.in").each(function() {
       $(this).addClass("out");
       $(this).removeClass("in");
    });
    //every in-Page -> panel bg
    $(".page.in").addClass("panel-bg");
    //the target-Panel -> in
    $(selector).removeClass("out");
    $(selector).addClass("in");
  }
}