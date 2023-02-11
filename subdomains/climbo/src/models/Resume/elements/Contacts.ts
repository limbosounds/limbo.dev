import { contactTypes } from "consts"
import { Instance, types } from "mobx-state-tree"
import { ContactType } from "typings"

export interface IContact extends Instance<typeof ContactModel> {}
export interface IContactsElement extends Instance<typeof ContactsElementModel> {}

// TODO ordering
export const ContactModel = types
	.model("Contact", {
		type: types.enumeration([...contactTypes]),
		value: types.string,
	})
	.actions(self => {
		return {
			updateType: (
				type: ContactType,
			) => {
				self.type = type
			},
			updateValue: (
				value: string,
			) => {
				self.value = value.trim()
			},
		}
	})
	.views(self => {
		return {
			get isValid(): boolean {
				return self.value.length > 0
			},
		}
	})

export const ContactsElementModel = types
	.model("ContactsElement", {
		type: types.literal("contacts"),
		title: types.optional(types.string, "Contacts"),
		items: types.array(ContactModel),
	})
	.actions(self => {
		return {
			add: (
				item: IContact,
			) => {
				self.items.push(item)
			},
			remove: (
				item: IContact,
			) => {
				self.items.remove(item)
			},
			updateTitle: (
				value: string,
			) => {
				self.title = value.trim()
			},
		}
	})
	.views(self => {
		return {
			get isValid(): boolean {
				return self.title.length > 0
			},
			get availableContactTypes(): ContactType[] {
				return contactTypes.filter(type => {
					return !self.items.find(item => item.type == type)
				})
			},
		}
	})