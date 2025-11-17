import './Accordion.scss';
import React from 'react';
// npx shadcn@latest add accordion
import { Accordion as ShAccordion } from "@/components/ui/accordion";

export class Accordion extends React.PureComponent {

	render = () => {
		const {
			children,
			className = '',
			id = '',
			type = "multiple",
			collapsible = "true",
		} = this.props;

		return (
			<ShAccordion
				id={id}
				type={type}
				className={`w-full space-y-3 ${className}`}
				collapsible={collapsible}
			>
				{children}
			</ShAccordion>
		);
	};
}