import { FakeTextField } from "classes/ui/champs/fakeTextField";
import { Dialog } from "classes/ui/genericDialog";

class TextFieldPopup extends FakeTextField {
	constructor(obj) {
		super(obj);
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
}

exports.TextFieldPopup = TextFieldPopup;

exports.createTextField = e => {
	let textfield = new TextFieldPopup(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
