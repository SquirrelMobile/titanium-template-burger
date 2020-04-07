import { TextField } from "classes/ui/champs/textField";

class FakeTextField extends TextField {
	constructor(obj) {
		super(obj);
		this.fieldView.remove(this.textField);
		var hintext = obj.textField ? obj.textField.hintText : "";
		this.faketextField = Ti.UI.createLabel(
			_.extend(Alloy.Globals.form.textField, {
				text: hintext,
				color: Alloy.CFG.COLORS.hintText,
				height: Ti.UI.FILL,
			}),
		);
		if (obj.textField) {
			this.faketextField.applyProperties(obj.textField);
		}
		this.fieldView.add(this.faketextField);
	}

	focus() {
		this.container.fireEvent("click");
	}

	getValue() {
		return this.faketextField ? this.faketextField.value : null;
	}

	setValue(val) {
		_this.faketextField.text = val;
	}

	checkRequired(obj) {
		return this.getValue() !== null;
	}
}

exports.FakeTextField = FakeTextField;

exports.createTextField = e => {
	let textfield = new FakeTextField(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
