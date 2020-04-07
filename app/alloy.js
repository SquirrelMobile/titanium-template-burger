console.log("DIRECTORY IS => " + Ti.Filesystem.applicationDataDirectory);
import { hasNotch } from "ti.detect";
require("/dao/cache");
const AvImageview = require("av.imageview");

if (Ti.version.replace(/[.]/gi, "").replace("GA", "") >= 900) {
	global.AvImageview = AvImageview;
}
Alloy.Globals.CONTENT_MODE_FIT = AvImageview.CONTENT_MODE_ASPECT_FIT;
Alloy.Globals.CONTENT_MODE_FILL = AvImageview.CONTENT_MODE_ASPECT_FILL;

Alloy.Globals.log = require("/log");

Alloy.Globals.events = _.clone(Backbone.Events);
Alloy.Globals.moment = require("moment");
Alloy.Globals.moment.locale(Ti.Locale.currentLanguage);
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.Device = {
	isiPhoneX: hasNotch,
	version: Ti.Platform.version,
	versionMajor: parseInt(Ti.Platform.version.split(".")[0], 10),
	versionMinor: parseInt(Ti.Platform.version.split(".")[1], 10),
	width:
		Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight
			? Ti.Platform.displayCaps.platformHeight
			: Ti.Platform.displayCaps.platformWidth,
	height:
		Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight
			? Ti.Platform.displayCaps.platformWidth
			: Ti.Platform.displayCaps.platformHeight,
	dpi: Ti.Platform.displayCaps.dpi,
	orientation:
		Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT ||
		Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT
			? "landscape"
			: "portrait",
};

if (OS_ANDROID) {
	Alloy.Globals.Device.width = Alloy.Globals.Device.width / (Alloy.Globals.Device.dpi / 160);
	Alloy.Globals.Device.height = Alloy.Globals.Device.height / (Alloy.Globals.Device.dpi / 160);
}

Alloy.Globals.drawerWidth = Math.round(Alloy.Globals.Device.width * 0.82);

require("install")();
require("core").listenNetwork();
if (!ENV_PROD) {
	require("core").detectCrash();
}

require("net/apiconfig").init();

if (OS_IOS) {
	Ti.App.addEventListener("resumed", function(e) {
		setTimeout(function() {
			Ti.UI.iOS.setAppBadge(0);
		}, 500);
	});

	Ti.UI.iOS.setAppBadge(0);
}

Alloy.Globals.top = OS_IOS ? (Alloy.Globals.Device.isiPhoneX ? 40 : 20) : 0;

Alloy.Globals.form = {
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
//enable push notification with OneSignal
//require("net/onesignalpns").init();

//appc new --import --no-services
// adb logcat | grep TiAPI
