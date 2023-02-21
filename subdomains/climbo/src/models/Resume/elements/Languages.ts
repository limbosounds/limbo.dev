import { languageProficiencies } from "consts"
import { Instance, types } from "mobx-state-tree"
import { LanguageProficiency } from "typings"
import { EditableStringModel } from "../components/EditableString"

export interface ILanguage extends Instance<typeof LanguageModel> {}
export interface ILanguagesElement extends Instance<typeof LanguagesElementModel> {}

// TODO ordering
export const LanguageModel = types
	.model("Language", {
		language: EditableStringModel.named("LanguageName"),
		proficiency: types.optional(types.enumeration([...languageProficiencies]), "beginner"),
	})
	.actions(self => {
		return {
			updateProficiency: (
				proficiency: LanguageProficiency,
			) => {
				self.proficiency = proficiency
			},
		}
	})

export const LanguagesElementModel = types
	.model("LanguagesElement", {
		type: types.literal("languages"),
		title: types.optional(
			EditableStringModel.named("TileElementTitle"),
			{ value: "Languages" },
		),
		items: types.array(LanguageModel),
	})
	.actions(self => {
		return {
			add: (
				item: ILanguage,
			) => {
				self.items.push(item)
			},
			remove: (
				item: ILanguage,
			) => {
				self.items.remove(item)
			},
		}
	})