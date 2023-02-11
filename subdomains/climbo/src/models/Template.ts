import { Instance, types } from "mobx-state-tree"

import { resumeLayouts } from "consts/resume"
import { pageFormats, pageOrientations } from "consts"

export interface ITemplate extends Instance<typeof TemplateModel> {}

export const TemplateModel = types
	.model("Template", {
		layout: types.enumeration([...resumeLayouts]),
		format: types.enumeration([...pageFormats]),
		orientation: types.enumeration([...pageOrientations]),
	})