import { Field } from "classes/ui/champs/field";

class TextField extends Field {
	constructor(obj) {
		super(obj);
		this.textField = Ti.UI.createTextField(Alloy.Globals.form.textField);
		if (obj.textField) {
			this.textField.applyProperties(obj.textField);
		}
		this.textField.id = obj.id;
		this.textField.next = obj.next;
		this.textField.previous = obj.previous;
		this.required = obj.required;
		if (obj.required) {
			this.textField.hintText = this.textField.hintText ? this.textField.hintText + " *" : "";
		}
		this.fieldView.add(this.textField);

		var that = this;
		var containerBorderColor = this.container.borderColor;
		this.textField.addEventListener("focus", function() {
			that.container.borderColor = Alloy.Globals.form.activeColor;
		});
		this.textField.addEventListener("blur", function() {
			that.container.borderColor = containerBorderColor;
		});
		this.checkRequired(obj);
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

	checkRequired(obj) {
		return this.textField.value.length > 0 || !this.required;
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
