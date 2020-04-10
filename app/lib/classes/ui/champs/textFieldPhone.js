import { TextField } from "classes/ui/champs/textField";

class TextFieldPhone extends TextField {
	constructor(obj) {
		super(obj);
		var widthPrefix = 70;
		this.PhoneNumber = require("awesome-phonenumber");
		this.prefix = Ti.UI.createLabel({
			text: "---",
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			width: widthPrefix,
			left: 0,
		});
		if (obj.prefix) {
			this.prefix.applyProperties(obj.prefix);
		}

		this.createButton(
			{
				title: "\uf095",
			},
			"buttonRight",
		);

		this.textField.applyProperties({
			keyboardType: Ti.UI.KEYBOARD_TYPE_PHONE_PAD,
			left: widthPrefix,
			autofillType: Titanium.UI.AUTOFILL_TYPE_PHONE,
		});
		this.separator = Ti.UI.createView({
			height: Ti.UI.FILL,
			backgroundColor: Alloy.CFG.COLORS.black,
			left: widthPrefix,
			width: 1,
		});
		var that = this;
		this.prefix.addEventListener("click", e => {
			var c = Alloy.createWidget("fr.squirrel.prefixPhone", { bgTitle: Alloy.CFG.COLORS.main });
			c.on("selectCountry", function(prefix) {
				that.prefix.data = prefix;
				that.prefix.text = prefix.emoji + " ";
				that.prefix.text += prefix.countryCallingCodes[0] ? prefix.countryCallingCodes[0] : "0";
				that.textField.focus();
			});
			c.getView().open();
		});
		this.container.add(this.prefix);
		this.container.add(this.separator);
	}

	checkError(obj) {
		return this.checkIfPhoneIsValid() ? false : this.errors.PHONE_NOT_VALIDATED;
	}

	isValid(tel, prefix) {
		let PhoneNumber = require("awesome-phonenumber");
		var pn = new PhoneNumber(tel, prefix || " ");
		return pn.isValid();
	}

	checkIfPhoneIsValid() {
		if (this.prefix && this.prefix.data) {
			return this.isValid(this.textField.value, this.prefix.data.alpha2);
		} else {
			return false;
		}
	}

	valideEmail(valeur) {
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(valeur);
	}
}

exports.TextFieldPhone = TextFieldPhone;

exports.createTextField = e => {
	let textfield = new TextFieldPhone(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
