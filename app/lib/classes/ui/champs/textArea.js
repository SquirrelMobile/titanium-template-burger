import { Field } from "classes/ui/champs/field";
import { Button } from "classes/ui/button";

class TextArea extends Field {
	constructor(obj) {
		super(obj);
		this.textArea = require("/xp.ui").createTextArea(
			_.extend(Alloy.Globals.form.textField, {
				next: obj.next,
				hintText: obj.textArea && obj.textArea.hintText ? obj.textArea.hintText : "",
				previous: obj.previous,
			}),
		);
		this.textArea.height = 100;
		this.container.height = 100;
		if (obj.textArea) {
			this.textArea.applyProperties(obj.textArea);
		}
		this.textArea.id = obj.id;
		this.textArea.next = obj.next;
		this.textArea.previous = obj.previous;
		this.required = obj.required;
		if (obj.required) {
			this.textArea.hintText = this.textArea.hintText ? this.textArea.hintText + " *" : "";
		}
		this.fieldView.add(this.textArea);

		var that = this;
		var containerBorderColor = this.container.borderColor;
		this.textArea.addEventListener("focus", function() {
			that.container.borderColor = Alloy.Globals.form.activeColor;
		});
		this.textArea.addEventListener("blur", function() {
			that.container.borderColor = containerBorderColor;
		});
		this.checkRequired(obj);
	}

	focus() {
		this.textArea.focus();
	}

	blur() {
		this.textArea.blur();
	}

	getValue() {
		return this.textArea.value || null;
	}

	setValue(val) {
		this.textArea.value = val;
	}

	checkRequired(obj) {
		return this.textArea.value.length > 0 || this.required;
	}
}

exports.TextArea = TextArea;

exports.createTextField = e => {
	let textfield = new TextArea(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
