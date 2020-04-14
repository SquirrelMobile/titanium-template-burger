var currentData = [
	{
		title: "title1",
	},
	{
		title: "title2",
	},
	{
		title: "title3",
	},
	{
		title: "title4",
	},
	{
		title: "title5",
	},
];
populateData();
function populateData() {
	var items = _.chain(currentData)
		.map(function(obj) {
			return {
				properties: obj,
				template: "photo",
				title: {
					text: obj.title,
				},
			};
		})
		.value();

	$.list.load([Ti.UI.createListSection({ items: items })]);
}

function handleClick(ev) {
	$.trigger("select", ev);
}
