import { TextField } from "classes/ui/champs/textField";

class FakeTextField extends TextField {
	constructor(obj) {
		super(obj);
		this.fieldView.remove(this.textField);
		this.faketextField = Ti.UI.createLabel(
			_.extend(Alloy.Globals.form.textField, {
				text: obj.textField ? obj.textField.hintText : "",
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
}

exports.FakeTextField = FakeTextField;

exports.createTextField = e => {
	let textfield = new FakeTextField(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
