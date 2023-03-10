import { Instance, IType, types } from "mobx-state-tree"
import { toJS } from "mobx"
import { v4 as uuid } from "uuid"

export
interface IOrderableArray<T extends IType<any, any, any>>
extends Instance<ReturnType<typeof orderableArray<T>>> {}

export const orderableArray = <T extends IType<any, any, any>>(
	name: string,
	model: T,
) => {
	return types
		.model(`OrderableArray -> ${name}`, {
			items: types.array(
				types.model(`OrderableArray -> ${name} -> Item`, {
					id: types.optional(types.string, uuid),
					data: model,
				})
			)
		})
		.volatile(() => {
			return {
				dropTo: -1,
				isDragged: false,
			}
		})
		.views(self => {
			return {
				get: (
					id: string
				) => {
					let index = -1
					const item = self.items.find(item => {
						index++
						return item.id == id
					})!

					return {
						index,
						item,
					}
				},
			}
		})
		.actions(self => {
			return {
				reorder: (
					id: string,
				) => {
					if (!self.isDragged)
						return

					self.isDragged = false
					if (self.dropTo < 0)
						return
						
					const { index, item } = self.get(id)
					if (index == self.dropTo)
						return

					self.items.splice(
						self.dropTo > index
							? self.dropTo + 1
							: self.dropTo,
						0,
						toJS(item)
					)
					self.items.remove(item)
					self.dropTo = -1
				},
				setDragged: (
					isDragged: boolean,
				) => {
					self.isDragged = isDragged
				},
				setDropTo: (
					dropTo?: number,
				) => {
					self.dropTo = typeof dropTo == "undefined"
						? -1
						: dropTo
				}
			}
		})
}