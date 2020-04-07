import { Field } from "classes/ui/champs/field";

class CheckBox extends Field {
	constructor(obj) {
		super(obj);
		this.container.height = 0;
		this.containerCheckBox = Ti.UI.createView({
			height: Ti.UI.SIZE,
			layout: "horizontal",
			horizontalWrap: false,
			width: Ti.UI.FILL,
		});
		this.checkBox = require("ti.animation").createAnimationView({
			height: 45,
			width: 45,
			visible: true,
			zIndex: 99,
			startFrame: 30,
			endFrame: 75,
			file: "/animCheckbox.json",
		});

		if (obj.checkBox) {
			this.checkBox.applyProperties(obj.checkBox);
		}
		this.value = false;
		this.label = Ti.UI.createLabel(obj.lblView);
		this.checkBox.setFrame(1);
		var _this = this;
		this.checkBox.addEventListener("click", function() {
			_this.value = !_this.value;
			_this.setValue(_this.value);
		});
		this.containerCheckBox.add(this.checkBox);
		this.containerCheckBox.add(this.label);
		this.parent.add(this.containerCheckBox);
		this.checkBox.start(0, 30);
	}

	focus() {}

	blur() {}

	getValue() {
		return this.value;
	}

	setValue(bool) {
		if (bool) {
			this.checkBox.stop();
			this.checkBox.start(30, 75);
		} else {
			this.checkBox.stop();
			this.checkBox.start(95, 150);
		}
	}
}

exports.CheckBox = CheckBox;

exports.createCheckbox = e => {
	let checkBox = new CheckBox({
		lblView: {
			html: e.required ? e.text + " *" : e.text,
			text: e.required ? e.text + " *" : e.text,
			width: Ti.UI.FILL,
			font: { fontFamily: Alloy.CFG.FONTS.regular, fontSize: 13 },
			color: "#0A0C2A",
		},
	});
	checkBox.parent.super = () => {
		return checkBox;
	};

	return checkBox.parent;
};
