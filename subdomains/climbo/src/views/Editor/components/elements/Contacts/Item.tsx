import React from "react"
import { observer } from "mobx-react"
import { Element as Tooltip } from "@sounds.of.limbo/tooltip"

import "styles/views/editor/components/elements/contacts/item"

import { ContactType } from "typings"

import { IContact } from "models/Resume/elements/Contacts"
import ContentEditable from "components/ContentEditable"
import { DefaultElementProps } from "typings/Resume"

export interface ContactItemProps
extends DefaultElementProps<IContact> {

}

export interface ContactItemState {

}

const icons: {
	[key in ContactType]: string
} = {
	location: "fas fa-map-marker-alt",
	phone: "fas fa-phone",
	email: "fas fa-envelope",
	facebook: "fab fa-facebook",
	github: "fab fa-github",
	instagram: "fab fa-instagram",
	linkedin: "fab fa-linkedin",
	skype: "fab fa-skype",
	telegram: "fab fa-telegram",
	twitter: "fab fa-twitter",
	vk: "fab fa-vk",
}

const links: {
	[key in ContactType]: (
		value: string
	) => string
} = {
	location: value => `https://maps.google.com/?q=${value}`,
	phone: value => `tel:${value}`,
	email: value => `mailto:${value}`,
	facebook: value => `https://facebook.com/${value}`,
	github: value => `https://github.com/${value}`,
	instagram: value => `https://instagram.com/${value}`,
	linkedin: value => `https://linkedin.com/in/${value}`,
	skype: value => `skype:${value}?chat`,
	telegram: value => `https://t.me/${value}`,
	twitter: value => `https://twitter.com/${value}`,
	vk: value => `https://vk.com/${value}`,
}

@observer
export default
class ContactItem
extends React.Component<ContactItemProps, ContactItemState> {
	render() {
		const { model } = this.props
		const contactName = model.type == "vk"
			? model.type.toUpperCase()
			: model.type.replace(/^(.)/g, group => group.toUpperCase())

		return <>
			<div className="c-contact-item">
				<span className="ci-icons">
					<i className={`ci-contact-icon ${icons[model.type]}`} />
					<Tooltip
						element="i"
						elementProps={{
							className: "ci-remover fas fa-trash-alt",
							onClick: this.props.onRemove,
						}}
						content={`Remove ${contactName} contact`}
					/>
				</span>
				<Tooltip
					element="a"
					elementProps={{
						href: links[model.type](model.value),
						onClick: event => event.preventDefault(),
						// target: "_blank",
					} as React.AnchorHTMLAttributes<HTMLAnchorElement>}
					content={contactName}
				>
					<ContentEditable
						model={model}
						autofocus
					/>
				</Tooltip>
			</div>
		</>
	}
}