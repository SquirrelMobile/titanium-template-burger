import { Field } from "classes/ui/champs/field";

class Switch extends Field {
	constructor(obj) {
		super(obj);


		this.container.backgroundColor = this.container.borderColor = "transparent";
		if (this.bottomView) {
			this.container.backgroundColor = "transparent";
		}

		this.createAndSetView(
			"label",
			"createLabel",
			_.extend(
				{
					height: Ti.UI.SIZE,
					width: Ti.UI.SIZE,
				},
				(this.defaultParams && this.defaultParams.label) || {},
			),
			obj.label,
		);

		this.createAndSetView("switch", "createSwitch", _.extend(
			{
				height: Ti.UI.FILL,
				width: Ti.UI.SIZE,
			},
			(this.defaultParams && this.defaultParams.switch) || {},
		), obj.switch);

		this.container.add(this.switch);
		this.container.add(this.label);

	}

	focus() {}

	blur() {}

	getValue() {
		return this.switch.value;
	}

	setValue(bool) {
		this.switch.value = bool;
	}
}

exports.Switch = Switch;

exports.createView = e => {
	let switchElem = new Switch(e);
	switchElem.parent.super = () => {
		return switchElem;
	};

	return switchElem.parent;
};
