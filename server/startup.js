Meteor.startup(function () {
	// Setup services from settings
	var services = Meteor.settings.services;
	if (services) {
		for (var k in services) {
			var svc = {};
			if (services.hasOwnProperty(k)) {
				svc['service'] = k;
				for (var i in services[k]) {
					if (services[k].hasOwnProperty(i)) {
						svc[i] = services[k][i];
					}
				}
			}
			Accounts.loginServiceConfiguration.remove({service: svc['service']});
			Accounts.loginServiceConfiguration.insert(svc);
		}
	}

	// Setup Kadira if specified
	var kadira = Meteor.settings.kadira;
	if (kadira) {
		Kadira.connect(kadira.appId, kadira.secret);
	}

	/*************
	 * DEMO DATA *
	 *************/

	if (Meteor.users.find().count() === 0) {
		var users = [
			{fname: 'Blank', lname: 'User', email: 'blank@example.com', username: 'Blank', langs: 'en', roles: []},
			{fname: 'Agent', lname: '1', email: 'agent1@example.com', username: 'Agent1', langs: ['en','es'], roles: ['agent']},
			{fname: 'Agent', lname: '2', email: 'agent2@example.com', username: 'Agent2', langs: 'en', roles: ['agent']},
			{fname: 'Agent', lname: '3', email: 'agent3@example.com', username: 'Agent3', langs: 'en', roles: ['agent']},
			{fname: 'Agent', lname: '4', email: 'agent4@example.com', username: 'Agent4', langs: 'en', roles: ['agent']},
			{fname: 'Agent', lname: '5', email: 'agent5@example.com', username: 'Agent5', langs: 'en', roles: ['agent']},
			{fname: 'Supervisor', lname: '1', email: 'super1@example.com', username: 'Super1', langs: 'en', roles: ['super']},
			{fname: 'Supervisor', lname: '2', email: 'super2@example.com', username: 'Super2', langs: 'en', roles: ['super']},
			{fname: 'Admin', lname: 'User', email: 'admin@example.com', username: 'Admin', langs: 'en', roles: ['admin']},
			{fname: 'Owner', lname: 'User', email: 'owner@example.com', username: 'Owner', langs: 'en', roles: ['owner']}
		];
		users.forEach(function (user) {
			var id = Accounts.createUser({
				email: user.email,
				username: user.username,
				password: 'apple1',
				profile: {
					fname: user.fname,
					lname: user.lname,
					langs: user.langs
				}
			});
			if (user.roles.length > 0)
				Roles.addUsersToRoles(id, user.roles);
		});
	}

	if (Meteor.langs.find().count() === 0) {
		var langs = [
			{lang: 'en', name: 'English', active: true},
			{lang: 'ar', name: 'Arabic'},
			{lang: 'id', name: 'Indonesian'},
			{lang: 'es', name: 'Spanish'}
		];
		langs.forEach(function (lang) {
			Meteor.langs.insert({lang: lang.lang, name: lang.name, active: lang.active});
		});
	}

	if (Meteor.depts.find().count() === 0) {
		var depts = [
			{name: 'Default', langs: 'en', active: true},
			{name: 'Partner Site', langs: ['en','es']}
		];
		depts.forEach(function (dept) {
			Meteor.depts.insert({name: dept.name, langs: dept.langs, active: dept.active});
		});
	}
	
	if (Meteor.teams.find().count() === 0) {
		var teams = [
			{name: 'Team 1', lang: 'en', super: 'super1', users: ['agent1','agent2','agent3']},
			{name: 'Team 2', lang: 'en', super: 'super2', users: ['agent4','agent5']}
		];
		teams.forEach(function (team) {
			Meteor.teams.insert({name: team.name, lang: team.lang, super: team.super, users: team.users});
		});
	}

	if (Meteor.guests.find().count() === 0) {
		var guests = [
			{visits: ['1'], chats: [], ip: '12.34.11.11'},
			{name: 'Guest 2', visits: ['2','3','4'], chats: ['1','3'], ip: '12.34.22.11'}
		];
		guests.forEach(function (guest) {
			Meteor.guests.insert({ec: guest.ec, name: guest.name, visits: guest.visits, chats: guest.chats, ip: guest.ip});
		});
	}

	if (Meteor.visits.find().count() === 0) {
		var visits = [
			{}
		];
		visits.forEach(function (guest) {
			Meteor.visits.insert({});
		});
	}
});
