import React from "react"
import { observer } from "mobx-react"
import { isEventFiredInsideElement } from "utils/dom"

export interface EditableEditorProps {
	onEditEnd: () => void
}

export interface EditableViewerProps {
	onEditStart: () => void
}

export interface EditableProps<
	EEP extends EditableEditorProps = EditableEditorProps,
	EVP extends EditableViewerProps = EditableViewerProps,
> {
	editor: [React.ComponentType<EEP>, Omit<EEP, keyof EditableEditorProps>]
	viewer: [React.ComponentType<EVP>, Omit<EVP, keyof EditableViewerProps>]
}

export interface EditableState {
	isEditing: boolean
}

@observer
export default
class Editable<
	EEP extends EditableEditorProps = EditableEditorProps,
	EVP extends EditableViewerProps = EditableViewerProps,
> extends React.Component<EditableProps<EEP, EVP>, EditableState> {
	wrapper
		: HTMLDivElement

	timeout
		: number

	canHide
		: boolean
		= false

	state
		: EditableState
		= {
			isEditing: false,
		}

	componentDidMount() {
		document.addEventListener("click", this.handleDocumentClick)
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.handleDocumentClick)
		clearTimeout(this.timeout)
	}

	handleDocumentClick = (
		event: MouseEvent
	) => {
		if (this.state.isEditing && this.canHide && !isEventFiredInsideElement(event.target, this.wrapper))
			this.finishEditing()
	}

	startEditing = () => {
		this.timeout = window.setTimeout(() => this.canHide = true, 300)

		this.setState({
			isEditing: true,
		})
	}

	finishEditing = () => {
		clearTimeout(this.timeout)
		this.canHide = false

		this.setState({
			isEditing: false,
		})
	}

	render() {
		const { editor, viewer } = this.props
		const [ Editor, editorProps ] = editor
		const [ Viewer, viewerProps ] = viewer

		return <div
			className="c-editable"
			ref={r => this.wrapper = r!}
		>
			{this.state.isEditing
				? <Editor
					{...editorProps as any} // suppressing ts(2322)
					onEditEnd={this.finishEditing}
				/>
				: <Viewer
					{...viewerProps as any} // suppressing ts(2322)
					onEditStart={this.startEditing}
				/>
			}
		</div>
	}
}