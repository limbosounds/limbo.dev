import { languageProficiencies } from "consts"
import { Instance, types } from "mobx-state-tree"
import { LanguageProficiency } from "typings"

export interface ILanguage extends Instance<typeof LanguageModel> {}
export interface ILanguagesElement extends Instance<typeof LanguagesElementModel> {}

// TODO ordering
export const LanguageModel = types
	.model("Language", {
		language: types.optional(types.string, ""),
		proficiency: types.optional(types.enumeration([...languageProficiencies]), "elementary"),
	})
	.actions(self => {
		return {
			updateLanguage: (
				value: string,
			) => {
				self.language = value.trim()
			},
			updateProficiency: (
				proficiency: LanguageProficiency,
			) => {
				self.proficiency = proficiency
			},
		}
	})
	.views(self => {
		return {
			get isValid(): boolean {
				return self.language.length > 0
			},
		}
	})

export const LanguagesElementModel = types
	.model("LanguagesElement", {
		type: types.literal("languages"),
		title: types.optional(types.string, "Languages"),
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
			updateTitle: (
				value: string,
			) => {
				self.title = value.trim()
			}
		}
	})
	.views(self => {
		return {
			get isValid(): boolean {
				return self.title.length > 0
			},
		}
	})