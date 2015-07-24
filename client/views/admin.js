Template.adminNav.helpers({
	active: function (section) {
		var page = Session.get('currPage');
		if (page === section)
			return 'active';
		return '';
	}
});