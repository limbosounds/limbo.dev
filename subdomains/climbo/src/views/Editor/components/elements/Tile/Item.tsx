import ContentEditable from "components/ContentEditable"
import { observer } from "mobx-react"
import { IEditableString } from "models/Resume/components/EditableString"
import React from "react"

import "styles/views/editor/components/elements/tile/item"

export interface TileElementItemProps {
	model: IEditableString
}

export interface TileElementItemState {

}

@observer
export default
class TileElementItem
extends React.Component<TileElementItemProps, TileElementItemState> {
	render() {
		return <>
			<div className="c-tile-element-item">
				<ContentEditable
					model={this.props.model}
					autofocus={!this.props.model.value}
				/>
			</div>
		</>
	}
}