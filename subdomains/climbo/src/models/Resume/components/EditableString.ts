import { Instance, types } from "mobx-state-tree"

export interface IEditableString extends Instance<typeof EditableStringModel> {}

export const EditableStringModel = types
	.model("EditableString", {
		value: types.string
	})
	.volatile(self => {
		return {
			buffer: `${self.value}`
		}
	})
	.views(self => {
		return {
			get isBufferValid(): boolean {
				return self.buffer.trim().length > 0
			},
		}
	})
	.actions(self => {
		return {
			updateValue: () => {
				if (self.isBufferValid)
					self.value = `${self.buffer}`
			},
			setBuffer: (
				value: string
			) => {
				self.buffer = value.trim()
			},
		}
	})