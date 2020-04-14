import { Field } from "classes/ui/champs/field";

class TextField extends Field {
	constructor(obj) {
		super(obj);
		this.textField = require("/xp.ui").createTextField(
			_.extend(Alloy.Globals.form.textField, {
				next: obj.next,
				hintText: obj.textField && obj.textField.hintText ? obj.textField.hintText : "",
				previous: obj.previous,
				id: obj.id,
				next: obj.next,
				previous: obj.previous,
				required: obj.required,
			}),
		);
		this.fieldView.add(this.textField);

		if (obj.textField) {
			this.textField.applyProperties(obj.textField);
		}
		if (obj.required) {
			this.textField.hintText = this.textField.hintText ? this.textField.hintText + " *" : "";
		}

		var that = this;
		var containerBorderColor = this.container.borderColor;
		var bottomViewColor = this.bottomView.backgroundColor;
		this.textField.addEventListener("focus", function() {
			if (that.bottomView.visible == false) {
				that.container.borderColor = Alloy.Globals.form.activeColor;
			} else {
				that.bottomView.backgroundColor = Alloy.Globals.form.activeColor;
			}
		});
		this.textField.addEventListener("blur", function() {
			if (that.bottomView.visible == false) {
				that.container.borderColor = containerBorderColor;
			} else {
				that.bottomView.backgroundColor = bottomViewColor;
			}
		});
	}

	focus() {
		this.textField.focus();
	}

	blur() {
		this.textField.blur();
	}

	getValue() {
		return this.textField.value || null;
	}

	setValue(val) {
		this.textField.value = val;
	}
}

exports.TextField = TextField;

exports.createTextField = e => {
	let textfield = new TextField(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
