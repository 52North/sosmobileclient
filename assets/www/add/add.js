$(document).bind('pageinit', function() {
//  $("#add").empty().load("add/add.html", function() {
//    $('#add-page-content').trigger('create');
//  });
  
  
  
  //SUB PAGE NAVIGATION
  $("#add").on("subPage", function(event, subPage) {

    
    
//    $('#add-page-content').empty().load('add/map.html', function() {
//      $('#add-page-content').trigger('create');
//      $("#map").trigger("created");
//    });
    console.log("navigated to subpage: " + subPage);
  });
});