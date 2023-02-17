import { Instance, types } from "mobx-state-tree"
import { EditableStringModel, IEditableString } from "../components/EditableString"

export interface ITileElement extends Instance<typeof TileElementModel> {}

// TODO ordering
export const TileElementModel = types
	.model("TileElement", {
		type: types.literal("tile"),
		title: types.optional(
			EditableStringModel.named("TileElementTitle"),
			{ value: "Tile" },
		),
		items: types.array(EditableStringModel.named("TileItem")),
	})
	.actions(self => {
		return {
			add: (
				item: IEditableString,
			) => {
				self.items.push(item)
			},
			remove: (
				item: IEditableString,
			) => {
				self.items.remove(item)
			},
		}
	})