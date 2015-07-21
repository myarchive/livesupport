/* Establish Collections
 ***********************/

Meteor.sites = new Meteor.Collection("sites");



/* Allow & Deny Permissions
 **************************/

Meteor.sites.allow({
	insert: function (userId, doc) {
		// the user must be logged in, and the sender must be self
		// add room attendance rules here also...
		// join, part, quit, etc. can not be sent by user rules here...
		// validate message format, etc. also...
		// return (userId && doc.user === userId);
		return true;
	},
	update: function (userId, doc) {
		return true;
	}
});




/* Before & After Hooks
 **********************/

Meteor.sites.before.insert(function (userId, doc) {
	//if (doc.born < 12)
	//	doc.era = 1; // Sahabah
});



/* Publishes
 ************/

if (Meteor.isServer) {
	// Sites to admins only
	Meteor.publish('sites', function () {
		if (Roles.userIsInRole(this.userId, ['owner', 'admin'])) {
			return Meteor.sites.find({}, {fields: {name: 1, url: 1, language: 1}});
		}
	});

	// Profiles to admins only
	Meteor.publish('userProfiles', function () {
		if (Roles.userIsInRole(this.userId, ['owner', 'admin'])) {
			return Meteor.users.find({}, {fields: {username: 1, role: 1, profile: 1}});
		}
	});

	// Statuses to admins only
	Meteor.publish("userStatuses", function () {
		if (Roles.userIsInRole(this.userId, ['owner', 'admin'], 'server')) {
			return Meteor.users.find({"status.online": true}, {fields: {"status.online": 1, "status.idle": 1, "status.lastActivity": 1, "status.lastLogin": 1, "banned.expires": 1, "banned.reason": 1, "muted": 1}});
		}
	});

	// Roles
	Meteor.publish(null, function () {
		return Meteor.roles.find({});
	});
	
	// Owner Exists?
	Meteor.publish(null, function () {
		return Meteor.users.find({roles:"owner"}, {fields: {roles: 1}});
	});

}



/* Subscribes
 ************/

if (Meteor.isClient) {
	Meteor.subscribe('sites');
	Meteor.subscribe('userProfiles');
	Meteor.subscribe('userStatuses');
}
