Template.users.helpers({
	tableData: function () {
		return dataTableData;
	},
	tableOptions: {
		id: 'usersTable',
		paging: false,
		order: [[0, "asc"], [1, "asc"]],
		columns: [{
				title: 'Status',
				data: 'status.online',
				className: 'hide'
			}, {
				title: 'Name',
				data: 'profile.fname',
				render: renderName,
				className: 'alignLeft'
			}, {
				title: 'Username',
				data: 'username',
				className: 'alignCenter'
			}, {
				title: 'Languages',
				data: 'profile.langs',
				className: 'alignCenter'
			}],
		oLanguage: {
			sInfo: "_TOTAL_ users",
			sInfoEmpty: "_TOTAL_ users",
			sInfoFiltered: "found from _MAX_"
		},
		initComplete: function () {
			$('#DataTables_Table_0').addClass('table-striped table-bordered');
			$('.dataTables_filter > label > input').attr("placeholder", "Search").focus();
			$('#DataTables_Table_0_filter').before(Blaze.toHTMLWithData(Template.usersToolbar));
			$('#DataTables_Table_0_info').after(Blaze.toHTMLWithData(Template.usersLegend));
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
	return Meteor.users.find({}, {sort: {'profile.name': 1, username: 1}}).fetch(); // or .map()
}
function renderName(cellData, renderType, currentRow) {
	return '<a class="userName" href="/users/'+currentRow.username+'">'+currentRow.profile.fname+' '+currentRow.profile.lname+'</a>';
}
