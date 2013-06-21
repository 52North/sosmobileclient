$('#map').live("created", function() {
	$("#map").height(calcContentHeight());
	var map = $("#map").geomap(
	{
		center : [ -71.147, 42.472 ],
		zoom : 10,
		click : function(e, geo) {
			map.geomap("append", geo);
		},
		services : [ {
			"class" : "osm",
			type : "tiled",
			src : function(view) {
				return "http://tile.openstreetmap.org/"	+ view.zoom	+ "/" + view.tile.column	+ "/"	+ view.tile.row	+ ".png";
			},
			attr : "&copy; OpenStreetMap &amp; contributors, CC-BY-SA",
			style : {
				visibility : "visible",
				opacity : 1.0
			}
		} ]
	});
});