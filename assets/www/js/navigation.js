$(document).on('click', ".navigation-btn", function(e) {
  e.preventDefault();
  page = $(this).attr("data-page");
  subPage = $(this).attr("data-subpage");
  // is the current view the requested page?
  if ($("#" + page).is(":hidden")) {
    //console.log("navigated to page: " + page);
    $.mobile.navigate("#" + page);
  }

  // trigger sub page opening
  if (typeof subPage != 'undefined') {
    //console.log("requested navigation to subpage: " + subPage)
    content = $("#" + page + "-content");
    //only if content-div hasn't got already the requested page?
    if (content.attr('data-contains-content') != subPage) {
      path = page + '/' + subPage + ".html";
      //console.log("loading: " + path);
      content.load(path, function() {
        content.attr('data-contains-content', subPage);
        $("#" + page).trigger("create");
        $(document).trigger("navigated");
      });
    }
  } else {
    $(document).trigger("navigated");
  }
});