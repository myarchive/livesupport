Template.home.rendered = function () {
	setIntervalX(function () {
		$('.chatMsg').animate({scrollTop: $(this).height() * 2}, "500");
		$('input').focus();
	}, 500, 4);
};

Template.home.helpers({
	'conHeight': function () {
		var t = Session.get('timer');
		var wh = $(window).height();
		var h = wh - 160;
		var h = (h < 300) ? 300 : h;
		return h;
	},
	'boxHeight': function () {
		var t = Session.get('timer');
		var wh = $(window).height();
		var h = wh - 200;
		var h = (h < 260) ? 260 : h;
		return h;
	},
	'chatWidth': function () {
		var t = Session.get('timer');
		var w = $('#my-tab-content').width();
		var s = w - 280;
		return s;
	},
	'infoWidth': function () {
		var t = Session.get('timer');
		return 250;
	},
	'msgHeight': function () {
		var t = Session.get('timer');
		var wh = $(window).height();
		var h = wh - 240;
		var h = (h < 220) ? 220 : h;
		return h;
	},
	'inpHeight': function () {
		var t = Session.get('timer');
		return 40;
	},
	'datHeight': function () {
		var t = Session.get('timer');
		var wh = $(window).height();
		var h = wh - 300;
		var h = (h < 160) ? 160 : h;
		return h;
	},
	'canHeight': function () {
		var t = Session.get('timer');
		return 100;
	}
});

Template.home.events({
	'click #tabs > li > a': function () {
		setIntervalX(function () {
			$('.chatMsg').animate({scrollTop: $(this).height() * 2}, "500");
			$('input').focus();
		}, 50, 4);
	}
});