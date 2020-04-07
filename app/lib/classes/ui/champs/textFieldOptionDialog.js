import { FakeTextField } from "classes/ui/champs/fakeTextField";
import { Dialog } from "classes/ui/genericDialog";

class TextFieldOptionDialog extends FakeTextField {
	constructor(obj) {
		super(obj);
		var that = this;
		this.container.addEventListener("click", function() {
			if (obj.optionDialog) {
				let options = require("xp.ui").createOptionDialog(obj.optionDialog);
				options.addEventListener("click", event => {
					if (obj.optionDialog.options && obj.optionDialog.options[event.index]) {
						that.faketextField.text = obj.optionDialog.options[event.index];
						that.faketextField.value = obj.optionDialog.options[event.index];
						that.faketextField.color = Alloy.CFG.COLORS.black;
					}
				});
				options.show();
			}
		});
	}

	getValue() {
		return this.faketextField ? that.faketextField.value : null;
	}

	setValue(val) {
		that.faketextField.text = val;
		that.faketextField.value = val;
	}

	checkRequired(obj) {
		return this.getValue() !== null;
	}
}

exports.TextFieldOptionDialog = TextFieldOptionDialog;

exports.createTextField = e => {
	let textfield = new TextFieldOptionDialog(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
