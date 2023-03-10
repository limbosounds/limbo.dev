import { Instance, types } from "mobx-state-tree"
import { EditableStringModel, IEditableString } from "../components/EditableString"
import { orderableArray } from "../components/SortableArray"

export interface ITileElement extends Instance<typeof TileElementModel> {}

// TODO ordering
export const TileElementModel = types
	.model("TileElement", {
		type: types.literal("tile"),
		title: types.optional(
			EditableStringModel.named("TileElementTitle"),
			{ value: "Tile" },
		),
		// items: types.array(EditableStringModel.named("TileItem")),
		list: orderableArray("Tile", EditableStringModel.named("TileItem"))
	})
	.actions(self => {
		return {
			add: (
				item: IEditableString,
			) => {
				self.list.items.push({ data: item })
			},
			remove: (
				item: {
					id: string
					data: IEditableString
				},
			) => {
				self.list.items.remove(item)
			},
		}
	})