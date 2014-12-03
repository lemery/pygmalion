$(document).ready(function() {
	
	$("#img_url").keyup(function(event) {
		if (event.which == 13) {
			$("#char_pic").attr("src", $("#img_url").val());
		}
	});
});

$(document).ready(function( ){
	window.setInterval(function(){
//		equalizeHeights([$("#personality_panel"), $("#aspects_panel")], [$("#name_panel").outerHeight(), 0]);
	}, 1000);
});

function equalizeHeights(ids, offsets) {
	var tallest = 0;
	for (i = 0; i < ids.length; i++) {
		console.log("ids[" + i + "] has a height of " + ids[i].outerHeight() + " and an offset of " + offsets[i]);
		if (ids[i].outerHeight() + offsets[i] > tallest) {
			tallest = ids[i].outerHeight() + offsets[i];
		}
	}
	for (i = 0; i < ids.length; i++) {
		console.log("Setting height of ids[" + i + "] to " + (tallest - offsets[i]));
		t = ids[i].outerHeight() - ids[i].height();
		temp = 
		ids[i].height(tallest - t - offsets[i]);
	}
}