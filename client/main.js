Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.layout.onRendered(function () {
	setInterval(function () {
		var t = (Session.get('timer') > 0) ? Session.get('timer') + 1 : 1;
		Session.set('timer', t);
	}, 100);
});

Template.layout.helpers({
	connectStatus: function () {
		if (!Meteor.status().connected) {
			var t = Session.get('timer');
			var ww = window.innerWidth || document.body.clientWidth;
			var left = (ww / 2) - 250;
			var dur = Math.floor((Meteor.status().retryTime - new Date().getTime()) / 1000);
			if (!isNaN(dur))
				return '<div id="connectStatus" class="alert alert-warning timer-' + t + '" role="alert" style="position:absolute; top:60px; left:' + left + 'px; width: 600px; z-index: 99999;"><strong>Disconnected:</strong> Attempting reconnect in ' + dur + ' seconds or try <a onclick="Meteor.reconnect()">now</a>... <small style="opacity: 0.6; margin-top: -10px;">(' + Meteor.status().retryCount + ')</small></div>';
		}
		return '';
	}
});
