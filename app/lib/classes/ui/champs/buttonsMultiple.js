import { Field } from "classes/ui/champs/field";
import { Button } from "classes/ui/champs/button";

class ButtonsMultiple extends Field {
	constructor(obj) {
		super(obj);
		this.view = Ti.UI.createView({
			height: Ti.UI.SIZE,
			layout: "horizontal",
			horizontalWrap: false,
			width: Ti.UI.SIZE,
		});
		this.buttons = [];

		var that = this;
		_.each(obj.data, function(d) {
			let button = new Button(d);
			button.view.width = obj.data.length / 100 + "%";
			that.buttons.push(button);
			that.view.add(button.view);
		});

		this.fieldView.add(this.view);
	}
}

exports.ButtonsMultiple = ButtonsMultiple;

exports.createTextField = e => {
	let textfield = new ButtonsMultiple(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
