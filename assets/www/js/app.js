$(function() {
  //Load initial views on startup (only once)  
  $("#view-content").load("view/view.html", function() {
    $("#view").trigger("create");
  });
  $("#legend-content").load("legend/legend.html", function() {
    $("#legend").trigger("create");
  });
  $("#add-content").load("add/add.html", function() {
    $("#add").trigger("create");
  });
});


//HELPERS
function calcContentHeight() {
  return ($('#add').height() - $('#add-header').height() - $('#add-navbar').height());
}