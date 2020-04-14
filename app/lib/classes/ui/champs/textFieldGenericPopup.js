import { FakeTextField } from "classes/ui/champs/fakeTextField";
import { Dialog } from "classes/ui/genericDialog";

class TextFieldPopup extends FakeTextField {
	constructor(obj) {
		super(obj);
		var that = this;
		this.callback = obj.callback || function() {};
		this.container.addEventListener("click", function() {
			var dialog = new Dialog({
				title: obj.dialog.title,
				content: Alloy.createController(obj.dialog.content, {})
					.on("select", function(ev) {
						that.callback(ev);
						dialog.close();
					})
					.getView(),
				modal: obj.dialog.modal,
				modalStyle: obj.dialog.modalStyle,
			});
			dialog.open();
		});
	}
}

exports.TextFieldPopup = TextFieldPopup;

exports.createTextField = e => {
	let textfield = new TextFieldPopup(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
