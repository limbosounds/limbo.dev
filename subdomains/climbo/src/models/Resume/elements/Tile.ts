import { Instance, types } from "mobx-state-tree"

export interface ITileElement extends Instance<typeof TileElementModel> {}

// TODO ordering
export const TileElementModel = types
	.model("TileElement", {
		type: types.literal("tile"),
		title: types.optional(types.string, "Tile"),
		items: types.array(types.string)
	})
	.actions(self => {
		return {
			add: (
				item: string
			) => {
				self.items.push(item)
			},
			remove: (
				item: string
			) => {
				self.items.remove(item)
			},
			update: (
				index: number,
				newValue: string,
			) => {
				self.items[index] = newValue
			},
			updateTitle: (
				value: string
			) => {
				self.title = value.trim()
			}
		}
	})
	.views(self => {
		return {
			get isValid(): boolean {
				return self.title.length > 0
			}
		}
	})