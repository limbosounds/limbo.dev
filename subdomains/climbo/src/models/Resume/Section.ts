import { Instance, types } from "mobx-state-tree"
import { ContactsElementModel, IContactsElement } from "./elements/Contacts"
import { ILanguagesElement, LanguagesElementModel } from "./elements/Languages"
import { ITileElement, TileElementModel } from "./elements/Tile"

export interface IResumeSection extends Instance<typeof ResumeSectionModel> {}

type ElementArg =
	| ITileElement
	| ILanguagesElement
	| IContactsElement

export const ResumeSectionModel = types
	.model("ResumeSection", {
		isMain: false,
		hasDescriptionSlot: false,
		slotsLimit: -1,
		elements: types.array(types.union(
			TileElementModel,
			LanguagesElementModel,
			ContactsElementModel,
		)),
	})
	.views(self => {
		return {
			get hasSlotsLimit(): boolean {
				return self.slotsLimit >= 0
			}
		}
	})
	.actions(self => {
		return {
			add: (
				item: ElementArg,
			) => {
				if (!self.hasSlotsLimit || self.elements.length < self.slotsLimit)
					self.elements.push(item)
			},
			remove: (
				item: ElementArg,
			) => {
				self.elements.remove(item)
			},
		}
	})