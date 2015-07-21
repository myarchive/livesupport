Template.login.helpers({
	'noOwner': function () {
		if (Meteor.users.find({roles: "owner"}).count() === 0)
			return true;
		return false;
	},
	'logoMargin': function () {
		var t = Session.get('timer');
		if (t > 5) $('.row').show();
		var t = ($('.account-wall').width() - 300) / 2;
		var t = (t < 0) ? 0 : t;
		var o = $('.account-wall').parent().css('margin-left');
		var o = o.replace('px','');
		var o = o * 1;
		var t = t + o;
		return t;
	},
	'loginMargin': function () {
		var t = Session.get('timer');
		//var w = $(window).width();
		var h = $(window).height();
		var m = h - 458;
		var t = (m === 0) ? -75 : (m/2) - 75;
		var t = (t < -75) ? -75 : t;
		//var t = (w < 980) ? t+75 : t;
		return t;
	},
	'loginTitle': function () {
		return 'Staff Login';
	},
	'createMargin': function () {
		var t = Session.get('timer');
		//var w = $(window).width();
		var h = $(window).height();
		var m = h - 606;
		var t = (m === 0) ? -75 : (m/2) - 75;
		var t = (t < -75) ? -75 : t;
		//var t = (w < 980) ? t+75 : t;
		return t;
	},
	'createTitle': function () {
		return 'Create Owner Account';
	},
	'formFields': function () {
		if (!Accounts._options['forbidClientAccountCreation'])
			var placeholder, html
		switch (Accounts.ui._options.passwordSignupFields)
		{
			case 'USERNAME_AND_EMAIL':
				placeholder = 'Username or email';
				break;
			case 'USERNAME_AND_OPTIONAL_EMAIL':
				placeholder = 'Username or email';
				break;
			case 'USERNAME_ONLY':
				placeholder = 'Username';
				break;
			default:
				// 'EMAIL_ONLY'
				placeholder = 'Email';
		}
		html = '<input name="username" id="username" type="text" class="form-control" placeholder="' + placeholder + '" required autofocus>';
		return new Spacebars.SafeString(html);
	}
});

Template.login.events({
	'submit form#login': function (e, t) {
		e.preventDefault();
		try {
			t.find('#submit').innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
			$('.btn').attr("disabled", true);
			Meteor.loginWithPassword(t.find('#username').value, t.find('#password').value, function (error) {
				if (error) {
					Alert.add(error, t);
				} else {
					Router.go('/');
				}
				t.find('#submit').innerHTML = 'Submit';
				$('.btn').attr("disabled", false);
			});
		} catch (error) {
			Alert.add(error, t);
		}
	},
	'submit form#first': function (e, t) {
		e.preventDefault();
		try {
			t.find('#submit').innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
			$('.btn').attr("disabled", true);
			Meteor.call('createOwner', t.find('#fname').value, t.find('#lname').value, t.find('#uname').value, t.find('#email').value, t.find('#pass').value, function (error) {
				if (error) {
					Alert.add(error, t);
				} else {
					Meteor.loginWithPassword(t.find('#uname').value, t.find('#pass').value);
					Router.go('/');
				}
				t.find('#submit').innerHTML = 'Submit';
				$('.btn').attr("disabled", false);
			});
		} catch (error) {
			Alert.add(error, t);
		}
	},
});

Template.forgotPassword.events({
	'submit form': function (e, t) {
		e.preventDefault();
		try {
			t.find('#submit').innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
			$('.btn').attr("disabled", true);
			Accounts.forgotPassword({email: t.find('#email').value}, function (error) {
				if (error) {
					Alert.add(error, t);
				} else {
					Alert.add('Password resent to your email.', t);
				}
				t.find('#submit').innerHTML = 'Submit';
				$('.btn').attr("disabled", false);
			});
		} catch (error) {
			Alert.add(error, t);
		}
	},
	'click #cancel': function (e, t) {
		e.preventDefault();
		Router.go('/login');
	}
});

var Alert = {
	add: function (msg, t) {
		t.find('#single-page-login-alert').innerHTML = '<div class="alert alert-danger alert-dismissable" id="single-page-login-alert-msg">' + msg + ' <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>';
	},
};
