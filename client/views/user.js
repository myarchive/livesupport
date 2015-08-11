Template.user.helpers({	
	registered: function () {
		
		// Get username from the path
		var path = Iron.Location.get().path;
		username = path.split('/')[2];
			
		// Count to check whether user exists
		var registered = Meteor.users.find({username: username}).count();
		
		if(registered > 0)
			return true;
		else
			return false;
	},
	infos: function () { // User records
		return Meteor.users.findOne({username: username});
	}
});