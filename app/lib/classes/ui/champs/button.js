class Button {
	constructor(obj) {
		this.activeColor = obj.activeColor || "red";
		this.view = Ti.UI.createView({
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE,
		});
		if (obj.view) {
			this.view.applyProperties(obj.view);
		}

		this.viewPadding = Ti.UI.createView({
			height: Ti.UI.SIZE,
			left: 10,
			right: 10,
			top: 10,
			left: 10,
			layout: "vertical",
			width: Ti.UI.SIZE,
		});
		if (obj.viewPadding) {
			this.viewPadding.applyProperties(obj.viewPadding);
		}

		this.label = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			width: Ti.UI.FILL,
		});
		if (obj.label) {
			this.label.applyProperties(obj.label);
		}

		this.icon = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			width: Ti.UI.FILL,
		});
		if (obj.icon) {
			this.icon.applyProperties(obj.icon);
		}

		this.viewPadding.add(this.icon);
		this.viewPadding.add(this.label);
		this.view.add(this.viewPadding);
	}
}

exports.Button = Button;

exports.createTextField = e => {
	let textfield = new Button(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
