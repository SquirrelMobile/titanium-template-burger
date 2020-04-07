export const form = {
	activeColor: "blue",
	parent: {
		top: 10,
		height: Ti.UI.SIZE,
		layout: "vertical",
		width: Ti.UI.FILL,
	},
	container: {
		backgroundColor: "white",
		borderColor: Alloy.CFG.COLORS.black,
		borderRadius: 5,
		touchFeedback: true,
		height: 50,
	},
	buttonIcons: {
		width: 40,
		font: { fontFamily: "FontAwesome5Pro-Solid", fontSize: 16 },
		color: Alloy.CFG.COLORS.black,
		backgroundColor: null,
	},
	bottomView: {
		height: 1,
		backgroundColor: "green",
		visible: false,
	},
	fieldView: {
		height: Ti.UI.SIZE,
		left: 0,
		right: 0,
	},
	title: {
		bottom: 5,
		left: 0,
		color: "white",
	},
	textField: {
		left: 10,
		right: 10,
		height: 50,
		font: { fontFamily: Alloy.CFG.FONTS.regular, fontSize: 15 },
		hintTextColor: Alloy.CFG.COLORS.hintText,
		color: Alloy.CFG.COLORS.black,
		backgroundColor: null,
	},
};
