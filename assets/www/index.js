//Navigation
$(document).bind('pageinit', function() {
	$('#add-page-content').empty().load('add/browser.html',function(){
		$('#add-page-content').trigger('create');
	});
	
	$("#add-map").click(function(e) {
		e.preventDefault();
		$('#add-page-content').empty().load('add/map.html',function(){
			$('#add-page-content').trigger('create');
			$("#map").trigger("created");
		});
	});
});

function calcContentHeight() {
	return ($('#add').height() - $('#add-header').height() - $('#add-navbar').height());
}