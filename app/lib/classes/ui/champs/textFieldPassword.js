import { TextField } from "classes/ui/champs/textField";

class TextFieldPassword extends TextField {
	constructor(obj) {
		super(obj);
		this.minLength = obj.minLength || 6;
		this.createButton(
			_.extend(
				{
					title: (obj && obj.enabledIcon) || "\uf06e",
				},
				obj.buttonRight || {},
			),
			"buttonRight",
		);
		this.enabledIcon = (obj && obj.enabledIcon) || "\uf06e";
		this.disabledIcon = (obj && obj.disabledIcon) || "\uf070";
		this.textField.passwordMask = true;
		var that = this;
		this.buttonRight.addEventListener("click", function () {
			that.buttonRight.title = !that.textField.passwordMask ? that.enabledIcon : that.disabledIcon;
			that.textField.setPasswordMask(!that.textField.passwordMask);
		});
	}

	checkError(obj) {
		return this.textField.value.length > this.minLength ? false : this.errors.PASSWORD_NOT_LENGTH;
	}
}

exports.TextFieldPassword = TextFieldPassword;

exports.createView = e => {
	let textfield = new TextFieldPassword(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
