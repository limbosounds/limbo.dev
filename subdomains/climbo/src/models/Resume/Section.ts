import { Instance, types } from "mobx-state-tree"
import { ResumeElementInstance, ResumeElementModel, ResumeElementType } from "typings/Resume"

import { ContactsElementModel } from "./elements/Contacts"
import { LanguagesElementModel } from "./elements/Languages"
import { TileElementModel } from "./elements/Tile"

export interface IResumeSection extends Instance<typeof ResumeSectionModel> {}

export const typeModelReferrence: {
	[key in ResumeElementType]: ResumeElementModel
} = {
	tile: TileElementModel,
	languages: LanguagesElementModel,
	contacts: ContactsElementModel,
}

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
				item: ResumeElementInstance,
			) => {
				if (!self.hasSlotsLimit || self.elements.length < self.slotsLimit)
					self.elements.push(item)
			},
			remove: (
				item: ResumeElementInstance,
			) => {
				self.elements.remove(item)
			},
		}
	})