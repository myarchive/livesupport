Template.user.helpers({
	// Get username from the path
	registered: function () {
		var path = Iron.Location.get().path;
		username = path.split('/')[2];
			
		var registered = Meteor.users.find({username: username}).count();
		
		if(registered > 0)
			return true;
		else
			return false;
	},
	infos: function () {
		return Meteor.users.findOne({username: username});
	}
});