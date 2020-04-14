import { Button } from "classes/ui/button";

export class Field {
	constructor(obj) {
		this.errors = {
			EMAIL_NOT_VALIDATED: { id: 1, text: "- Format email non valide" },
			PHONE_NOT_VALIDATED: { id: 2, text: "- Format téléphone non valide" },
			PASSWORD_NOT_LENGTH: { id: 3, text: "- Mot de passe trop court" },
		};
		this.required = obj.required;
		this.parent = Ti.UI.createView({
			height: Ti.UI.SIZE,
			layout: "vertical",
			width: Ti.UI.FILL,
		});
		this.parent.applyProperties(Alloy.Globals.form.parent);
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
					backgroundColor: "white",
					borderColor: Alloy.CFG.COLORS.black,
					borderRadius: 5,
					touchFeedback: true,
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
			touchFeedback: true,
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
				this[key] = Ti.UI.createButton({
					width: 40,
					height: Ti.UI.FILL,
					left: 0,
					font: { fontFamily: "FontAwesome5Pro-Solid", fontSize: 16 },
					color: "black",
					backgroundColor: null,
				});
				this[key].applyProperties(Alloy.Globals.form.buttonIcons);
				this[key].applyProperties(obj);
				this.fieldView.left = 40;
				this.container.add(this[key]);
			} else {
				this[key] = Ti.UI.createButton(
					_.extend(
						{
							width: 40,
							font: { fontFamily: "FontAwesome5Pro-Solid", fontSize: 16 },
							color: "black",
							backgroundColor: null,
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
