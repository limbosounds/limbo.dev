import { Instance, types } from "mobx-state-tree"

import { ResumeSectionModel } from "./Section"

export interface IResume extends Instance<typeof ResumeModel> {}

export const ResumeModel = types
	.model("Resume", {
		name: types.string,
		position: types.string,
		photo: types.maybe(types.string),
		background: types.maybe(types.string),
		description: types.maybe(types.string),
		sections: types.array(ResumeSectionModel),
	})
	.actions(self => {
		return {
			updateName: (
				name: string,
			) => {
				self.name = name.trim()
			},
			updatePosition: (
				position: string,
			) => {
				self.position = position.trim()
			},
			setDescription: (
				value: string,
			) => {
				self.description = value.trim()
			},
			removeDescription: () => {
				self.description = undefined
			},
			setPhoto: (
				value: string,
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