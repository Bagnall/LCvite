// src/Components/Accordion/AccordionArticle.jsx
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "..";
import React from "react";

export class AccordionArticle extends React.PureComponent {
	render() {
		const {
			config,
			title = "",
			titleHTML = "",
			className = "",
			children,
			target,
			id,
			value,
		} = this.props;

		const {
			informationText,
			informationTextHTML,
			instructionsText,
			instructionsTextHTML,
		} = config;

		// shadcn needs a stable string value per item
		const itemValue = value || String(id);

		return (
			<AccordionItem
				value={itemValue}
				className={`accordion-article special-anchor-target ${className}`}
			>
				{/* Anchor target for scrolling */}
				{/* <a
					className="special-anchor-target"

				> */}

				<AccordionTrigger className="special-anchor-target w-full flex items-center gap-2 py-5 text-text-primary" name={`special-anchor-${target}`}>
					{/* Icon that rotates when open via data-state */}
					{/* <span
						className="mr-2 flex h-4 w-4 items-center justify-center
                       transition-transform duration-300
                       data-[state=open]:rotate-180"
					>
						<svg
							className="arrow-icon h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
								clipRule="evenodd"
							/>
						</svg>
					</span> */}

					{titleHTML ? (
						<span dangerouslySetInnerHTML={{ __html: titleHTML }} />
					) : (
						<span>{title}</span>
					)}
				</AccordionTrigger>
				{/* </a> */}

				<AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out" forceMount>
					<div className="pb-5 text-sm text-text-secondary">
						<Info
							className="text accordionarticle"
							id={`info-${id}`}
							informationText={informationText}
							informationTextHTML={informationTextHTML}
						/>
						{instructionsText ? (
							<p className="instructions text accordionarticle">
								{instructionsText}
							</p>
						) : null}
						{instructionsTextHTML ? (
							<p
								className="instructions html accordionarticle"
								dangerouslySetInnerHTML={{
									__html: instructionsTextHTML,
								}}
							/>
						) : null}
						{children}
					</div>
				</AccordionContent>
			</AccordionItem>
		);
	}
}
