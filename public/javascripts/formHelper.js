$(function processForm() {
	$.get('/login').done(function (err) {
	//$.get('/users').done(function (err) {
		if (err) {
			alert("Passwords must match!");
		}
	});
})