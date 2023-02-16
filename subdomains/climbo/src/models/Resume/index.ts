import { Instance, types } from "mobx-state-tree"
import { EditableStringModel } from "./components/EditableString"

import { ResumeSectionModel } from "./Section"

export interface IResume extends Instance<typeof ResumeModel> {}

export const ResumeModel = types
	.model("Resume", {
		name: types.optional(
			EditableStringModel.named("ResumeName"),
			{ value: "Your Name" },
		),
		position: types.optional(
			EditableStringModel.named("ResumePosition"),
			{ value: "Your Position" },
		),
		photo: types.maybe(types.string),
		background: types.maybe(types.string),
		description: types.maybe(types.string),
		sections: types.array(ResumeSectionModel),
	})
	.actions(self => {
		return {
			setDescription: (
				value: string,
			) => {
				self.description = value.trim()
			},
			removeDescription: () => {
				self.description = undefined
			},
			setPhoto: (
				value?: string,
			) => {
				self.photo = value
			},
			setBackground: (
				value: string,
			) => {
				self.background = value
			},
		}
	})