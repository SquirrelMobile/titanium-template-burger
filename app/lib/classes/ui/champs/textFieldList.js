import { FakeTextField } from "classes/ui/champs/fakeTextField";

class TextFieldList extends FakeTextField {
	constructor(obj) {
		super(obj);

		this.createButton(
			{
				title: "\uf0d7",
			},
			"buttonRight",
		);

		if (OS_ANDROID) {
			this.fieldView.remove(this.faketextField);
			var data = [];
			if (obj.list) {
				this.faketextField = Ti.UI.createPicker({
					text: obj.textField.hintText,
					height: Ti.UI.FILL,
					width: Ti.UI.FILL,
				});
				if (this.defaultParams && this.defaultParams.textField) {
					this.faketextField.applyProperties(this.defaultParams.textField);
				}
				this.setList(obj.list);
				var that = this;
				this.faketextField.addEventListener("change", function(e) {
					that.faketextField.value = that.list[e.rowIndex];
					that.faketextField.val = that.list[e.rowIndex];
				});
				this.fieldView.add(this.faketextField);
			}
		} else if (OS_IOS) {
			this.faketextField.color = obj.color;
			this.setList(obj.list);
			var that = this;
			this.container.addEventListener("click", function(e) {
				if (that.list) {
					Alloy.createController("/partials/_picker", {
						data: that.list,
						title: obj.hintText || obj.hintTextTitle,
					})
						.on("click", function(val) {
							that.faketextField.fireEvent("change", {
								row: {
									val: val.val,
									value: val.value,
								},
							});
							that.faketextField.value = val.value;
							that.faketextField.val = val.val;
							that.setValue(val.val);
						})
						.getView()
						.open();
				}
			});
		}
	}

	setList(list) {
		if (OS_ANDROID) {
			// console.log("list", list);
			this.currentChoice = _.first(list);
			this.list = list;
			var column1 = Ti.UI.createPickerColumn({ width: Ti.UI.FILL });
			if (list.length > 0) {
				this.faketextField.value = list[0];
				this.faketextField.val = list[0];
			}
			_.each(list, function(ev) {
				column1.addRow(
					Ti.UI.createPickerRow(
						_.extend(ev, {
							title: ev.text,
							val: ev.text,
							textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
						}),
					),
				);
			});
			this.faketextField.columns = [column1];
		} else {
			this.list = list;
			var first = _.first(list);
			if (first) {
				this.currentChoice = first;
				if (first.text === "") {
					this.faketextField.applyProperties(first);
					(this.faketextField.color = "gray"), (this.faketextField.text = "Non renseigné");
					this.faketextField.val = first.text;
				} else {
					var key = first.text;
					this.faketextField.applyProperties(first);
					this.setValue(key);
					this.faketextField.val = first.text;
				}
			}
		}
	}

	getValue() {
		return this.faketextField.value || null;
	}

	setValue(val) {
		if (OS_ANDROID) {
			this.faketextField.setSelectedRow(0, _.findIndex(this.list, { text: val }));
		}
		this.faketextField.text = val;
		this.faketextField.value = val;
		this.faketextField.val = val;
	}
}

exports.TextFieldList = TextFieldList;

exports.createView = e => {
	let textfield = new TextFieldList(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
