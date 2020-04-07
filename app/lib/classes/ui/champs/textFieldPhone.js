import { TextField } from "classes/ui/champs/textField";

class TextFieldPhone extends TextField {
	constructor(obj) {
		super(obj);
		var widthPrefix = 70;
		this.prefix = Ti.UI.createLabel({
			text: "---",
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			width: widthPrefix,
			left: 0,
		});
		this.createButton(
			{
				title: "\uf095",
			},
			"buttonRight",
		);
		if (obj.prefix) {
			this.prefix.applyProperties(obj.prefix);
		}
		this.textField.keyboardType = Ti.UI.KEYBOARD_TYPE_PHONE_PAD;
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
		this.textField.left = widthPrefix;
		this.container.add(this.prefix);
		this.container.add(this.separator);
	}

	checkRequired(obj) {
		return this.getValue() !== null && this.valideEmail(this.getValue());
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
