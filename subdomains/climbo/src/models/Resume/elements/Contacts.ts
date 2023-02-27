import { contactTypes } from "consts"
import { Instance, types } from "mobx-state-tree"
import { ContactType } from "typings"
import { EditableStringModel } from "../components/EditableString"

export interface IContact extends Instance<typeof ContactModel> {}
export interface IContactsElement extends Instance<typeof ContactsElementModel> {}

export const ContactTypeModel = types
	.model("ContactType", {
		type: types.enumeration([...contactTypes]),
	})

export const ContactModel = types
	.compose(
		"Contact",
		ContactTypeModel,
		EditableStringModel,
	)

// TODO ordering
export const ContactsElementModel = types
	.model("ContactsElement", {
		type: types.literal("contacts"),
		title: types.optional(
			EditableStringModel.named("ContactsElementTitle"),
			{ value: "Contacts" },
		),
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
		}
	})
	.views(self => {
		return {
			get availableContactTypes(): ContactType[] {
				return contactTypes.filter(type => {
					return !self.items.find(item => item.type == type)
				})
			},
		}
	})