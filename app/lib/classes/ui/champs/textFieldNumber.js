import { TextField } from "classes/ui/champs/textField";

class TextFieldNumber extends TextField {
	constructor(obj) {
		super(obj);
		this.textField.keyboardType = Ti.UI.KEYBOARD_TYPE_NUMBER_PAD;
	}

	checkRequired(obj) {
		return this.getValue() !== null && this.valideEmail(this.getValue());
	}

	valideEmail(valeur) {
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(valeur);
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
