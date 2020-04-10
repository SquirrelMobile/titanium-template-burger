import { TextField } from "classes/ui/champs/textField";

class TextFieldNumber extends TextField {
	constructor(obj) {
		super(obj);
		this.textField.keyboardType = Ti.UI.KEYBOARD_TYPE_NUMBER_PAD;
	}
}

exports.TextFieldEmail = TextFieldEmail;

exports.createTextField = e => {
	let textfield = new TextFieldEmail(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
