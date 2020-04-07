import { Field } from "classes/ui/champs/field";
import { Button } from "classes/ui/button";

class PhotoSelector extends Field {
	constructor(obj) {
		super(obj);
		this.id = obj.id;
		this.container.height = Ti.UI.SIZE;
		this.fieldView.height = Ti.UI.SIZE;

		this.containerPhoto = Ti.UI.createView({
			layout: "vertical",
			height: Ti.UI.SIZE,
		});

		this.image = Ti.UI.createImageView({
			height: 200,
			width: 200,
			borderRadius: 100,
		});
		if (obj.image) {
			this.image.applyProperties(obj.image);
		}

		this.containerPhoto.add(this.image);

		this.button = new Button({
			button: {
				top: 20,
				backgroundColor: Alloy.CFG.COLORS.main2,
				width: 185,
				bottom: 10,
			},
			label: {
				text: L("choosePicture"),
				color: "white",
			},
		});
		if (obj.button) {
			this.button.applyProperties(obj.image);
		}
		this.containerPhoto.add(this.button.parent);

		this.fieldView.add(this.containerPhoto);
		// this.button = new Button(obj.button);
		var that = this;
		this.button.parent.addEventListener("click", e => {
			require("/media").openDialogCamera(function(photo, ext) {
				that.image.image = that.value = photo;
			});
		});
	}

	focus() {}

	blur() {}

	getValue() {
		return that.value;
	}

	setValue(val) {}

	checkRequired(obj) {
		return this.textArea.value.length > 0 || this.required;
	}
}

exports.PhotoSelector = PhotoSelector;

exports.createTextField = e => {
	let textfield = new PhotoSelector(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
