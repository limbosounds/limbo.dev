import React from "react"
import { cast } from "mobx-state-tree"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/contacts"

import { DefaultElementProps } from "typings/Resume"

import { IContactsElement } from "models/Resume/elements/Contacts"

import ElementWrapper from "../Wrapper"
import ElementHeader from "../Header"
import ContactItem from "./Item"
import AddButton from "components/Buttons/Add"
import ContextMenu from "components/ContextMenu"
import { contactIcons, contactNames } from "consts"

export interface ContactsElementProps
extends DefaultElementProps<IContactsElement> {

}

export interface ContactsElementState {

}

@observer
export default
class ContactsElement
extends React.Component<ContactsElementProps, ContactsElementState> {
	render() {
		const { model } = this.props
		return <>
			<ElementWrapper
				info="Contacts element"
				onRemove={this.props.onRemove}
			>
				<div className="c-contacts-element">
					<ElementHeader
						model={model.title}
					/>
					<div className="ce-list">
						{model.items.map((item, i) => {
							return <ContactItem
								key={i}
								model={item}
								onRemove={() => model.remove(item)}
							/>
						})}
					</div>
					<ContextMenu
						items={model.availableContactTypes}
						onSelect={value => model.add(cast({ type: value, value }))}
						renderItem={item => {
							return <div
								key={item}
								className="c-contact-item-menu"
							>
								<i className={contactIcons[item]} />
								<span>
									{contactNames[item]}
								</span>
							</div>
						}}
					>
						{props => {
							return <AddButton
								compact
								size="small"
								className={`__no-print ab__iph ${props.className || ""}`}
								tooltip="Add contact"
								getRef={props.ref}
								onClick={props.onClick}
							/>
						}}
					</ContextMenu>
				</div>
			</ElementWrapper>
		</>
	}
}