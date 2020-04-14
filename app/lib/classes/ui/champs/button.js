class Button {
	constructor(obj) {
		this.activeColor = obj.activeColor || "red";
		this.disabledColor = obj.disabledColor || "white";
		this.id = obj.id;
		this.view = Ti.UI.createView({
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE,
			touchFeedback: true,
			backgroundColor: obj.disabledColor,
		});
		if (obj.view) {
			this.view.applyProperties(obj.view);
		}

		this.viewPadding = Ti.UI.createView({
			height: Ti.UI.SIZE,
			top: 10,
			touchEnabled: false,
			bottom: 10,
			layout: "vertical",
			width: Ti.UI.SIZE,
		});
		if (obj.viewPadding) {
			this.viewPadding.applyProperties(obj.viewPadding);
		}

		this.label = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			touchEnabled: false,
			color: this.activeColor,
			text: "test",
			width: Ti.UI.FILL,
		});
		if (obj.label) {
			this.label.applyProperties(obj.label);
		}

		this.icon = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			touchEnabled: false,
			color: this.activeColor,
			top: 10,
			font: { fontFamily: "FontAwesome5Pro-Solid", fontSize: 40 },
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			width: Ti.UI.FILL,
		});
		if (obj.icon) {
			this.icon.applyProperties(obj.icon);
		}

		this.setActive(obj.active);

		this.viewPadding.add(this.icon);
		this.viewPadding.add(this.label);
		this.view.add(this.viewPadding);
	}

	setActive(bool) {
		this.activate = bool;
		this.view.backgroundColor = bool ? this.activeColor : this.disabledColor;
		this.view.opacity = bool ? 1 : 0.8;
		this.icon.color = !bool ? this.activeColor : this.disabledColor;
		this.label.color = !bool ? this.activeColor : this.disabledColor;
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
