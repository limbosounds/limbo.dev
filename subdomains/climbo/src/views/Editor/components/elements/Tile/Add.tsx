import { Element as Tooltip } from "@sounds.of.limbo/tooltip"
import React from "react"

import "styles/views/editor/components/elements/tile/add"

export interface TileElementAddProps {
	onClick: () => void
}

export interface TileElementAddState {

}

export default
class TileElementAdd
extends React.Component<TileElementAddProps, TileElementAddState> {
	render() {
		return <>
			<Tooltip
				element="div"
				elementProps={{
					className: "c-tile-element-add",
					onClick: this.props.onClick
				}}
				content="Add item"
			>
				<i className="fas fa-plus" />
			</Tooltip>
		</>
	}
}