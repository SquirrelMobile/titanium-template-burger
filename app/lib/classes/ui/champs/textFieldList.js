import { TextField } from "classes/ui/champs/textField";

class TextFieldList extends TextField {
	constructor(obj) {
		super(obj);
		this.fieldView.remove(this.textField);
		this.createButton(
			{
				title: "\uf0d7",
			},
			"buttonRight",
		);
		if (OS_ANDROID) {
			var data = [];
			if (obj.list) {
				this.currentChoice = _.first(obj.list);

				this.textField = Ti.UI.createPicker(
					_.extend(Alloy.Globals.form.textField, {
						text: obj.textField.hintText,
						height: Ti.UI.FILL,
					}),
				);

				var column1 = Ti.UI.createPickerColumn({ width: Ti.UI.FILL });
				this.list = obj.list;
				_.map(obj.list, function(ev) {
					var title = "picker." + ev.text;
					var titleComplete = L(title);
					return column1.addRow(
						Ti.UI.createPickerRow(
							_.extend(ev, {
								title: titleComplete,
								val: ev.text,
								textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
							}),
						),
					);
				});

				this.textField.add([column1]);
				this.fieldView.add(this.textField);
			}
		} else if (OS_IOS) {
			var first = _.first(obj.list);
			if (first) {
				this.currentChoice = first;
				if (first.text === "") {
					this.textField.applyProperties(first);
					(this.textField.color = "gray"), (this.textField.text = "Non renseigné");
					this.textField.val = first.text;
				} else {
					var key = "picker." + first.text;
					this.textField.applyProperties(first);
					this.textField.text = L(key);
					this.textField.val = first.text;
				}
			}
			var _this = this;
			this.textField.addEventListener("click", function(e) {
				if (obj.list) {
					Alloy.createController("/partials/_pickeriOS", {
						data: obj.list,
						title: obj.hintText || obj.hintTextTitle,
					})
						.on("click", function(val) {
							_this.textField.fireEvent("change", {
								row: {
									val: val.val,
									value: val.value,
								},
							});
							_this.textField.value = val.value;
							_this.textField.val = val.val;
							_this.textField.text = L("picker." + val.val);
						})
						.getView()
						.open();
				}
			});
		}
	}

	getValue() {
		return this.textField.value || null;
	}

	setValue(val) {
		if (OS_ANDROID) {
			this.textField.setSelectedRow(0, _.findIndex(this.list, { text: e }));
		}
		this.textField.text = L("picker." + e);
		this.textField.value = e;
		this.textField.val = e;
	}
}

exports.TextFieldList = TextFieldList;

exports.createTextField = e => {
	let textfield = new TextFieldList(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
