var args = $.args;
import { AlertDialog } from "classes/ui/dialog";

var champs = [];
_.each(args.champs, function(e, i) {
	addField(e, i);
	if (e && e.type === "checkbox") {
		var champ = require("/classes/ui/champs/checkbox").createCheckbox(
			_.extend(
				{
					top: 10,
					left: 50,
					right: 50,
				},
				e,
			),
		);
		champs.push(champ.super());
		$.container.add(champ);
	} else if (e && e.type === "label") {
		var champ = Ti.UI.createLabel({
			top: 10,
			left: 0,
			color: Alloy.CFG.COLORS.black,
			height: Ti.UI.SIZE,
		});
		champ.applyProperties(e);
		$.container.add(champ);
	} else if (e.type === "valid") {
		var champ = require("/classes/ui/button").createButtonWithIcon(
			_.extend(
				{
					top: Alloy.Globals.smallScreen ? 10 : 18,
					backgroundColor: Alloy.CFG.COLORS.main2,
					color: "white",
					width: 185,
				},
				e,
			),
		);
		champ.addEventListener("click", handleValid);
		$.container.add(champ);
	}
});

function handleValid() {
	var obj = {};
	_.each(champs, function(e, i) {
		if (e.type !== "valid") {
			obj[e.id] = e.getValue();
		}
	});
	if (verif(champs)) {
		Ti.API.log(JSON.stringify(obj));
		$.trigger("valid", obj);
	}
}

function verif(obj) {
	var d = [];
	_.each(obj, function(elem) {
		if (elem.required && (!elem.getValue() || elem.getValue() === "")) {
			var keyEntire = elem.hintTextTitle ? elem.hintTextTitle.text : elem.id;
			d.push(keyEntire);
		}
	});
	if (d.length > 0) {
		var d = new AlertDialog({
			title: L("warning"), //"Attention",
			message: {
				top: 10,
				text: L("dialog.missingsField") + "\n\n" + d.join("\n"),
			},
			confirm: {
				text: L("OK"),
				top: 30,
				backgroundColor: Alloy.CFG.COLORS.main2,
				touchFeedback: true,
				color: "white",
				width: "99%",
				click: function() {
					d.hide();
				},
			},
		});
		d.show();
		return false;
	}
	return true;
}

function addField(e, i) {
	if (
		_.indexOf(
			[
				"textFieldList",
				"textArea",
				"textFieldDate",
				"textFieldEmail",
				"textFieldPassword",
				"fakeTextField",
				"textFieldGenericPopup",
				"textFieldPhone",
				"textFieldNumber",
				"textFieldOptionDialog",
				"PhotoSelector",
				"textField",
				"map",
			],
			e.type,
		) > -1
	) {
		console.log(e.type);
		var champ = require("/classes/ui/champs/" + e.type).createTextField(
			_.extend(
				{
					next: args.champs[i + 1] ? args.champs[i + 1] : null,
					previous: args.champs[i - 1] ? args.champs[i - 1] : null,
				},
				e,
			),
		);
		champs.push(champ.super());
		$.container.add(champ);
	}
}

function getChamps() {
	var obj = {};
	_.each(champs, function(e) {
		obj[e.id] = e;
	});
	return obj;
}
$.getChamps = getChamps;

function blurAll(e) {
	_.each(champs, function(champ) {
		if (champ.blur) {
			champ.blur();
		}
	});
}
$.blurAll = blurAll;

function handleNext(e) {
	var id = OS_IOS ? e.id : e.source.next.id;
	var find = _.findWhere(champs, { id: id });
	if (find) {
		find.focus();
	}
}
