$(function() {
	const get = $.get("http://localhost:3000/loginout");
	get.done(showNavLogin);
	get.fail(console.error());
});

$("#form-signin").validate({
	rules: {
		username: {
			required: true,
			minlength: 3,
			maxlength: 50
		},
		password: {
			required: true,
			minlength: 6,
			maxlength: 50
		}
	},
    messages: {
        username: {
            required: 'You must enter an username.',
        },
        password: {
            required: 'You must enter a password.',
        },
    },
});

function showNavLogin(response, status, xhr) {
	$(response.navtext).appendTo("#navigation");
}

function validateinfo(element, event) {
	$(element).valid();
}