Template.chats.helpers({
	tableData: function () {
		return dataTableData;
	},
	tableOptions: {
		id: 'chatsTable',
		paging: false,
		order: [[0, "asc"], [1, "asc"]],
		columns: [{
				title: 'Date',
				data: '',
				className: 'alignCenter'
			}, {
				title: 'Guest',
				data: 'profile.fname',
				render: renderName,
				className: 'alignLeft'
			}, {
				title: 'Duration',
				data: '',
				className: 'alignLeft'
			}, {
				title: 'Flagged',
				data: '',
				className: 'alignCenter'
			}, {
				title: 'Score',
				data: '',
				className: 'alignCenter'
			}],
		oLanguage: {
			sInfo: "_TOTAL_ users",
			sInfoEmpty: "_TOTAL_ users",
			sInfoFiltered: "found from _MAX_"
		},
		initComplete: function () {
//			$('.dataTable').addClass('table-striped table-bordered');
			$('.dataTables_filter > label > input').attr("placeholder", "Search").focus();
			$('.dataTables_filter').before(Blaze.toHTMLWithData(Template.teamToolbar));
			$('.dataTables_info').after(Blaze.toHTMLWithData(Template.teamLegend));
		},
		fnDrawCallback: function () {
			//$.each($('.scholarName'), function () {
			//	var era = $(this).data('era');
			//	$(this).parent().parent()
			//			.removeClass('era0 era1 era2 era3 era4 era5 era6')
			//			.addClass('era' + era);
			//});
		}
	}
});

function dataTableData() {
	// find all id's of your team then below the user rows
	return Meteor.users.find({}, {sort: {'profile.name': 1, username: 1}}).fetch(); // or .map()
}
function renderName(cellData, renderType, currentRow) {
	return '<a class="userName" href="/users/'+currentRow.username+'">'+currentRow.profile.fname+' '+currentRow.profile.lname+'</a>';
}
