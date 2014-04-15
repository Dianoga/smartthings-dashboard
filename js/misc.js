$().ready(function() {
	$('.devices').sortable();
	$('.devices').on('click', '.debug', function() {
		$(this).toggleClass('show');
	});
});