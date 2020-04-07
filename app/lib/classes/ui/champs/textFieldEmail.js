import { TextField } from "classes/ui/champs/textField";

class TextFieldEmail extends TextField {
	constructor(obj) {
		super(obj);
		this.createButton(
			{
				title: "\uf0e0",
			},
			"buttonRight",
		);
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
