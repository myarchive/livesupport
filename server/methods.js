Meteor.methods({
	createOwner: function (fname, lname, user, email, pass) {
		var owner = Meteor.users.findOne({"roles": "owner"});
		if (owner)
			throw new Meteor.Error(403, "Site already has an owner");
		if (!fname)
			throw new Meteor.Error(403, "No first name specified for login");
		if (!lname)
			throw new Meteor.Error(403, "No last name specified for login");
		if (!user)
			throw new Meteor.Error(403, "No username specified for login");
		if (!email)
			throw new Meteor.Error(403, "No email specified for login");
		if (!pass)
			throw new Meteor.Error(403, "No password specified for login");

		var id = Accounts.createUser({
			username: user,
			email: email,
			password: pass,
			profile: {
				fname: fname,
				lname: lname,
				gender: 'male',
				langs: 'en'
			}
		});

		Roles.setUserRoles(id, 'owner');
		return true;
	},
	addUser: function (fname, lname, user, email, pass, gender, langs) {
		if (!Roles.userIsInRole(this.userId, ['owner','admin']))
			throw new Meteor.Error(403, "Access Denied");
		if (!fname)
			throw new Meteor.Error(403, "No first name specified.");
		if (!lname)
			throw new Meteor.Error(403, "No last name specified.");
		if (!user)
			throw new Meteor.Error(403, "No username specified.");
		if (!email)
			throw new Meteor.Error(403, "No email specified.");
		if (!pass)
			throw new Meteor.Error(403, "No password specified.");
		if (!gender)
			throw new Meteor.Error(403, "No gender specified.");
		if (!langs)
			throw new Meteor.Error(403, "No languages specified.");

		var id = Accounts.createUser({
			username: user,
			email: email,
			password: pass,
			profile: {
				fname: fname,
				lname: lname,
				gender: gender,
				langs: langs
			}
		});
		Roles.setUserRoles(id, 'operator');
		return true;
	}
});

