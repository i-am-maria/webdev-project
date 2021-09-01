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
	onfocusout: validateinfo
});

function validateinfo(element, event) {
	$(element).valid();
}