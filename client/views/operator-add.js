Template.users.events({
	'click #add': function () {
		bootbox.dialog({
			title: "Add User",
			message: Blaze.toHTMLWithData(Template.userAdd),
			onEscape: true,
			closeButton: true,
			buttons: {
				alert: {
					label: "Save",
					className: "btn-primary",
					callback: function () {
						var res = validateForm();
						if (res) {
							var form = getForm();
							Meteor.call('addUser', form.fname, form.lname, form.user, form.email, form.password, form.gender, form.language);
							var w = $(".modal-body").width() + 30;
							var h = $(".modal-body").height() + 30;
							var t = (h - 60) / 2;
							var l = (w - 300) / 2;
							$(".modal-body").append('<div id="tempSucc" class="alert alert-success" style="position:absolute; top: ' + t + 'px; left: ' + l + 'px; width: 300px; text-align: center;"><i class="fa fa-check-circle"></i> Successfully added user!</div>');
							Meteor.setTimeout(function () {
								bootbox.hideAll();
								$('#usersTable').DataTable();
							}, 1000);
						}
						return false;
					}
				}
			}
		});
	}
});

function getForm() {
	var form = {};
	$.each($('form').serializeArray(), function () {
		form[this.name] = this.value;
	});
	return form;
}

function validateForm() {
	var form = getForm();

	$('.help-block').remove();
	$('.form-group').removeClass('has-error');
	$('.form-group').removeClass('has-warning');
	$('.form-group').removeClass('has-success');
	var ann = /^[a-z0-9\-]+$/i;
	var ans = /^[a-z0-9 \-\']+$/i;
	var ema = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var err = false;

	// First Name Validation
	if (form.fname === "") {
		$('#fname').parent().parent().addClass('has-error');
		$('#fname').after('<span class="help-block">Required</span>');
		err = true;
	}
	else if (form.fname.length < 3) {
		$('#fname').parent().parent().addClass('has-error');
		$('#fname').after('<span class="help-block">Too short</span>');
		err = true;
	}
	else if (form.fname.length > 50) {
		$('#fname').parent().parent().addClass('has-error');
		$('#fname').after('<span class="help-block">Too long</span>');
		err = true;
	}
	else if (!ann.test(form.fname)) {
		$('#fname').parent().parent().addClass('has-error');
		$('#fname').after('<span class="help-block">Alphanumeric only</span>');
		err = true;
	}
	else if (form.fname && form.fname !== "") {
		$('#fname').parent().parent().addClass('has-success');
	}
	
	// First Name Validation
	if (form.lname === "") {
		$('#lname').parent().parent().addClass('has-error');
		$('#lname').after('<span class="help-block">Required</span>');
		err = true;
	}
	else if (form.lname.length < 3) {
		$('#lname').parent().parent().addClass('has-error');
		$('#lname').after('<span class="help-block">Too short</span>');
		err = true;
	}
	else if (form.lname.length > 50) {
		$('#lname').parent().parent().addClass('has-error');
		$('#lname').after('<span class="help-block">Too long</span>');
		err = true;
	}
	else if (!ann.test(form.lname)) {
		$('#lname').parent().parent().addClass('has-error');
		$('#lname').after('<span class="help-block">Alphanumeric only</span>');
		err = true;
	}
	else if (form.lname && form.lname !== "") {
		$('#lname').parent().parent().addClass('has-success');
	}

	// Username Validation
	if (form.user === "") {
		$('#user').parent().parent().addClass('has-error');
		$('#user').after('<span class="help-block">Required</span>');
		err = true;
	}
	else if (form.user.length < 3) {
		$('#user').parent().parent().addClass('has-error');
		$('#user').after('<span class="help-block">Too short</span>');
		err = true;
	}
	else if (form.user.length > 50) {
		$('#user').parent().parent().addClass('has-error');
		$('#user').after('<span class="help-block">Too long</span>');
		err = true;
	}
	else if (!ann.test(form.user)) {
		$('#user').parent().parent().addClass('has-error');
		$('#user').after('<span class="help-block">Alphanumeric only</span>');
		err = true;
	}
	else if (Meteor.users.find({"username": form.user}).count() !== 0) {
		$('#user').parent().parent().addClass('has-error');
		$('#user').after('<span class="help-block">Already exists</span>');
		err = true;
	}
	else if (form.user && form.user !== "") {
		$('#user').parent().parent().addClass('has-success');
	}

	// Email Validation
	if (form.email === "") {
		$('#email').parent().parent().addClass('has-error');
		$('#email').after('<span class="help-block">Required</span>');
		err = true;
	}
	else if (!ema.test(form.email)) {
		$('#email').parent().parent().addClass('has-error');
		$('#email').after('<span class="help-block">Invalid email</span>');
		err = true;
	}
	else if (Meteor.users.find({ emails: { $elemMatch: { address: form.email } } }).count() !== 0) {
		$('#email').parent().parent().addClass('has-error');
		$('#email').after('<span class="help-block">Already exists</span>');
		err = true;
	}
	else if (form.email && form.email !== "") {
		$('#email').parent().parent().addClass('has-success');
	}

	// Password Validation
	if (form.password === "") {
		$('#password').parent().parent().addClass('has-error');
		$('#password').after('<span class="help-block">Required</span>');
		err = true;
	}
	else if (form.password.length < 6) {
		$('#password').parent().parent().addClass('has-error');
		$('#password').after('<span class="help-block">Too short</span>');
		err = true;
	}
	else if (form.password.length > 50) {
		$('#password').parent().parent().addClass('has-error');
		$('#password').after('<span class="help-block">Too long</span>');
		err = true;
	}
	else if (form.password && form.password !== "") {
		$('#password').parent().parent().addClass('has-success');
	}

	// Languages Validation
	if (!form.language || form.language === "") {
		$('#language').parent().parent().addClass('has-error');
		$('#language').after('<span class="help-block">Required</span>');
		err = true;
	}
	else if (form.language && form.language !== "") {
		$('#language').parent().parent().addClass('has-success');
	}

	if (err)
		return false;

	return true;
}
