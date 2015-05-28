$(function processForm() {
	$.get('/users').done(function (err) {
		if (err) {
			alert("Passwords must match!");
		}
	});
})