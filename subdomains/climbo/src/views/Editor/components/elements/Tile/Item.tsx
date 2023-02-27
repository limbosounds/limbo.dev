import React from "react"
import { observer } from "mobx-react"
import { Element as Tooltip } from "@sounds.of.limbo/tooltip"

import "styles/views/editor/components/elements/tile/item"

import { IEditableString } from "models/Resume/components/EditableString"

import ContentEditable from "components/ContentEditable"
import { DefaultElementProps } from "typings/Resume"

export interface TileElementItemProps
extends DefaultElementProps<IEditableString> {
	creator: () => void
}

export interface TileElementItemState {

}

@observer
export default
class TileElementItem
extends React.Component<TileElementItemProps, TileElementItemState> {
	handleContextMenu = (
		event: React.MouseEvent<HTMLDivElement>
	) => {
		event.preventDefault()
		event.nativeEvent.preventDefault()
		this.props.onRemove()
	}
	
	render() {
		return <>
			<Tooltip
				element="div"
				elementProps={{
					className: "c-tile-element-item",
					onContextMenu: this.handleContextMenu,
				}}
				content={<>
					<p><strong>Left click</strong> to start editing</p>
					<p><strong>Right click</strong> to remove item</p>
					<p><strong>Ctrl + Enter</strong> while editing to save and create new</p>
				</>}
			>
				<ContentEditable
					model={this.props.model}
					autofocus={!this.props.model.value}
					onEmptySave={this.props.onRemove}
					onCtrlEnter={this.props.creator}
				/>
			</Tooltip>
		</>
	}
}