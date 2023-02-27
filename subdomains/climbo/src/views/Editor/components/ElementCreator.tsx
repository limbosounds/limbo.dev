import React from "react"
import ReactDOM from "react-dom"
import { observer } from "mobx-react"

import "styles/views/editor/components/element-creator"

import { Coordinates2D } from "typings"
import { isEventFiredInsideElement } from "utils/dom"
import { ResumeElementInstance, ResumeElementType } from "typings/Resume"
import { resumeElements } from "consts/resume"
import { TileElementModel } from "models/Resume/elements/Tile"
import { LanguagesElementModel } from "models/Resume/elements/Languages"
import AddButton from "components/Buttons/Add"
import { ContactsElementModel } from "models/Resume/elements/Contacts"

export interface ElementCreatorProps {
	onSelect: (
		item: ResumeElementInstance
	) => void
}

export interface ElementCreatorState {
	isMenuShown: boolean
}

@observer
export default
class ElementCreator
extends React.Component<ElementCreatorProps, ElementCreatorState> {
	state
		: ElementCreatorState
		= {
			isMenuShown: false,
		}

	clickCoords
		: Coordinates2D
		= {
			x: 0,
			y: 0,
		}

	componentDidMount() {
		window.addEventListener("resize", this.hideMenu)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.hideMenu)
	}

	handleClick = (
		event: React.MouseEvent
	) => {
		const { clientX: x, clientY: y } = event
		this.clickCoords = { x, y }
		this.showMenu()
	}

	toggleMenu = () => {
		this.setState({
			isMenuShown: !this.state.isMenuShown,
		})
	}

	showMenu = () => {
		this.setState({
			isMenuShown: true,
		})
	}

	hideMenu = () => {
		this.setState({
			isMenuShown: false,
		})
	}

	handleSelect = (
		type: ResumeElementType
	) => {
		let modelInstance: ResumeElementInstance | undefined = undefined

		switch (type) {
			case "tile":
				modelInstance = TileElementModel.create({
					type: "tile",
					items: [
						{ value: "Tile item", },
					],
				})
				break
			case "languages":
				modelInstance = LanguagesElementModel.create({
					type: "languages",
					items: [
						{
							language: { value: "Language" },
						}
					]
				})
				break
			case "contacts":
				modelInstance = ContactsElementModel.create({
					type: "contacts",
					items: [
						{
							type: "location",
							value: "location",
						},
						{
							type: "email",
							value: "email",
						},
					]
				})
		}

		if (typeof modelInstance == "undefined")
			return

		this.props.onSelect(modelInstance)
		this.hideMenu()
	}

	render() {
		const { isMenuShown } = this.state
		return <>
			<AddButton
				className={`c-element-creator __no-print ${isMenuShown ? "hover" : ""}`}
				onClick={this.handleClick}
			>
				Add Element
			</AddButton>
			{isMenuShown && ReactDOM.createPortal(
				<ElementCreatorMenu
					position={this.clickCoords}
					onOutsideClick={this.hideMenu}
					onSelect={this.handleSelect}
				/>,
				document.body
			)}
		</>
	}
}

interface ElementCreatorMenuProps {
	position: Coordinates2D
	availableItems?: ResumeElementType[]
	onSelect: (
		type: ResumeElementType
	) => void
	onOutsideClick?: () => void
}

interface ElementCreatorMenuState {

}

@observer
class ElementCreatorMenu
extends React.Component<ElementCreatorMenuProps, ElementCreatorMenuState> {
	wrapper
		: HTMLDivElement

	isAbleToHide
		: boolean
		= false

	elementTypesContent
		: {
			[key in ResumeElementType]: {
				title: string
				description: string
			}
		}
		= {
			tile: {
				title: "Tile",
				description: "Typically used for short listing your skills",
			},
			contacts: {
				title: "Contacts",
				description: "List of your contacts/socials",
			},
			languages: {
				title: "Languages",
				description: "List of languages and your proficiencies",
			},
		}

	componentDidMount() {
		document.addEventListener("click", this.handleOutsideClick)
		setTimeout(() => {
			this.isAbleToHide = true
		}, 300)
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.handleOutsideClick)
	}

	handleOutsideClick = (
		event: MouseEvent
	) => {
		if (!this.isAbleToHide)
			return

		if (!isEventFiredInsideElement(event.target, this.wrapper))
			this.props.onOutsideClick?.()
	}

	render() {
		const { availableItems = resumeElements } = this.props
		const { x, y } = this.props.position

		return <>
			<div
				ref={r => this.wrapper = r!}
				className="c-element-creator-menu u-fancy-scale-in"
				style={{
					top: y,
					left: x,
				}}
			>
				{availableItems.map(type => {
					const item = this.elementTypesContent[type]
					return <div
						key={type}
						className="ecm-item"
						onClick={() => this.props.onSelect(type)}
					>
						<h3>
							{item.title}
						</h3>
						<p>
							{item.description}
						</p>
					</div>
				})}
			</div>
		</>
	}
}