// ### NAVIGATION ###
$(document).bind('pageinit', function() {
  // Navigation via the "navigate" trigger with options:
  // PAGE/SUBPAGE(data-to-page, data-to-subpage)
  $(".navigation-btn").click(function(e) {
    e.preventDefault();
    page = $(this).attr("data-page");
    subPage = $(this).attr("data-subpage");
    // is the current view the requested page?
    if ($("#" + page).is(":hidden")) {
      console.log("navigated to page: " + page);
      $.mobile.navigate("#" + page);
    }

    // trigger sub page opening
    if (typeof subPage != 'undefined') {
      alert("#" + page);
      $("#" + page).trigger('subPage', [ subPage ]);
    }
  });

  $("#view-content").load("view/view.html", function() {
    $("#view").trigger("create");
    $(document).trigger("create");

  });
  $("#legend-content").load("legend/legend.html", function() {
    $("#legend").trigger("create");
    $(document).trigger("create");

  });
  $("#add-content").load("add/add.html", function() {
    $("#add").trigger("create");
    $(document).trigger("create");
  });

});

// ### HELPERS ###
function calcContentHeight() {
  return ($('#add').height() - $('#add-header').height() - $('#add-navbar')
      .height());
}