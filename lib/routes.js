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
		Session.set('currPage', 'home');
		this.render('home');
	}
	else if (base === 'login') {
		if (Meteor.userId()) {
			Session.set('currPage', 'home');
			Router.go('/');
		}
		else {
			Session.set('currPage', 'login');
			this.render('login');
		}
	}
	else if (base === 'forgot-password') {
		if (Meteor.userId()) {
			Session.set('currPage', 'home');
			Router.go('/');
		}
		else {
			Session.set('currPage', 'forgotPassword');
			this.render('forgotPassword');
		}
	}



	// Profile page
	else if (base === 'profile') {
		Session.set('currPage', 'profile');
		this.render('profile');
	}



	// Team page
	else if (base === 'team') {
		Session.set('currPage', 'team');
		this.render('team');
	}



	// Chats pages
	else if (base === 'chats') {
		Session.set('currPage', 'chats');
		this.render('chats');
	}



	// Reviews pages
	else if (base === 'reviews') {
		Session.set('currPage', 'reviews');
		this.render('reviews');
	}



	// Admin pages
	else if (base === 'admin') {
		$('.navitem').removeClass('active');
		if (this.params.a === 'users') {
			Session.set('currPage', 'adminUsers');
			this.render('adminUsers');
		}
		else if (this.params.a === 'teams') {
			Session.set('currPage', 'adminTeams');
			this.render('adminTeams');
		}
		else if (this.params.a === 'depts') {
			Session.set('currPage', 'adminDepts');
			this.render('adminDepts');
		}
		else if (this.params.a === 'langs') {
			Session.set('currPage', 'adminLangs');
			this.render('adminLangs');
		}
		else if (this.params.a === 'reports') {
			Session.set('currPage', 'adminReports');
			this.render('adminReports');
		}
		else {
			Session.set('currPage', 'admin');
			this.render('admin');
		}
	}



	// Owner pages
	else if (base === 'owner') {
		$('.navitem').removeClass('active');
		Session.set('currPage', 'userPage');
		this.render('owner');
	}



	// Users pages
	else if (base === 'users') {
		$('.navitem').removeClass('active');
		var username = this.params.a;
		this.render('user', {username: username});
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
