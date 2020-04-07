import { Button } from "classes/ui/button";

export class Field {
	constructor(obj) {
		this.parent = Ti.UI.createView(Alloy.Globals.form.parent);
		this.id = obj.id;
		this.activeColor = obj.activeColor;
		if (obj.title) {
			if (obj.title.text && obj.required) {
				if (obj.required) {
					obj.title.text = obj.title.text + " *";
				}
			}
			this.title = Ti.UI.createLabel(_.extend({ height: Ti.UI.SIZE }, Alloy.Globals.form.title));
			this.title.applyProperties(obj.title);
			this.parent.add(this.title);
		}

		this.container = Ti.UI.createView(
			_.extend(
				{
					height: 40,
					width: Ti.UI.FILL,
				},
				Alloy.Globals.form.container,
			),
		);
		if (obj.container) {
			this.container.applyProperties(obj.container);
		}
		this.fieldView = Ti.UI.createView({
			height: Ti.UI.FILL,
			left: 0,
			right: 0,
		});
		this.container.add(this.fieldView);
		if (obj.buttonLeft) {
			this.createButton(obj.buttonLeft, "buttonLeft");
		}
		if (obj.buttonRight) {
			this.createButton(obj.buttonRight, "buttonRight");
		}

		this.parent.add(this.container);

		if (Alloy.Globals.form.bottomView) {
			var bottom = Ti.UI.createView(
				_.extend(Alloy.Globals.form.bottomView, {
					bottom: 0,
					zIndex: 99,
				}),
			);
			this.parent.add(bottom);
		}
	}

	createButton(obj, key) {
		if (obj) {
			if (key === "buttonLeft") {
				this[key] = Ti.UI.createButton(
					_.extend(
						{
							height: Ti.UI.FILL,
							left: 0,
						},
						Alloy.Globals.form.buttonIcons,
					),
				);
				this[key].applyProperties(obj);
				this.fieldView.left = 40;
				this.container.add(this[key]);
			} else {
				this[key] = Ti.UI.createButton(
					_.extend(
						{
							height: Ti.UI.FILL,
							right: 0,
						},
						Alloy.Globals.form.buttonIcons,
					),
				);
				this[key].applyProperties(obj);
				this.fieldView.right = 40;
				this.container.add(this[key]);
			}
		}
	}
}
