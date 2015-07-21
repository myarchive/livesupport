Accounts.config({
	forbidClientAccountCreation: true
});

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});
Router.onBeforeAction('loading');
Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.route('/:base?/:a?/:b?/:c?/:d?/:e?', function () {
	var base = this.params.base;

	// REDIRECTS: Check for owner and force login
	if (!Meteor.userId() && base !== 'login' && base !== 'forgot-password')
		Router.go('/login');



	// Base Routes
	if (base === undefined) {
		$('.navitem').removeClass('active');
		$('#ni-chats').addClass('active');
		this.render('home');
	}
	else if (base === 'login') {
		if (Meteor.userId())
			Router.go('/');
		else
			this.render('login');
	}
	else if (base === 'forgot-password') {
		if (Meteor.userId())
			Router.go('/');
		else
			this.render('forgotPassword');
	}



	// Profile page
	else if (base === 'profile') {
		$('.navitem').removeClass('active');
		$('#ni-profile').addClass('active');
		this.render('profile');
	}
	
	
	
	// Profile page
	else if (base === 'team') {
		$('.navitem').removeClass('active');
		$('#ni-team').addClass('active');
		this.render('team');
	}
	
	
	
	// Users pages
	else if (base === 'users') {
		$('.navitem').removeClass('active');
		$('#ni-users').addClass('active');
		this.render('users');
	}
	
	
	
	// Depts pages
	else if (base === 'depts') {
		$('.navitem').removeClass('active');
		$('#ni-depts').addClass('active');
		this.render('depts');
	}



	// Not Found
	else
		this.render('notFound');
});

sub = function (sub) {
	if (sub.constructor === Array) {
		var arr = [];
		sub.forEach(function (s) {
			arr.push(Meteor.subscribe(s));
		});
		return arr;
	}
	return Meteor.subscribe(sub);
};
