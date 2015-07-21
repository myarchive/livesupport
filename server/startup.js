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
});
