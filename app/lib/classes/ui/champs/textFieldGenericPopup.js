import { TextField } from "classes/ui/champs/textField";
import { Dialog } from "classes/ui/genericDialog";

class TextFieldPopup extends TextField {
	constructor(obj) {
		super(obj);
		this.fieldView.remove(this.textField);
		this.faketextField = Ti.UI.createLabel({
			width: Ti.UI.FILL,
			text: obj.textField.hintText,
			color: Alloy.CFG.COLORS.hintText,
			height: 40,
		});
		this.faketextField.applyProperties(obj.textField);
		this.fieldView.add(this.faketextField);
		var _this = this;
		this.container.addEventListener("click", function() {
			var dialog = new Dialog({
				title: obj.dialog.title || "",
			});
			dialog.open();
		});
	}

	getValue() {
		return this.faketextField ? this.faketextField.date : null;
	}

	setValue(val) {
		let currentDate = Alloy.Globals.moment(val);
		_this.faketextField.text = currentDate.format("DD MMMM YYYY");
	}

	checkRequired(obj) {
		return this.getValue() !== null;
	}
}

exports.TextFieldPopup = TextFieldPopup;

exports.createTextField = e => {
	let textfield = new TextFieldPopup(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
