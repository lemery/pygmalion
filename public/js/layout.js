$(document).ready(function() {
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
	    // Avoid following the href location when clicking
	    event.preventDefault(); 
	    // Avoid having the menu to close when clicking
	    event.stopPropagation(); 
	    // Re-add .open to parent sub-menu item
	    $(this).parent().addClass('open');
	    $(this).parent().find("ul").parent().find("li.dropdown").addClass('open');
	});
});