// src/Components/Accordion/Section.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
	Info,
	TopButton
} from '..';
import DOMPurify from "dompurify";
import React from 'react';

export class Section extends React.PureComponent {
	constructor(props) {
		super(props);

		let {
			expandedByDefault: expanded = false,
		} = this.props;

		const {
			id,
		} = this.props;

		if (sessionStorage.getItem(`${id}-expanded`)) expanded = JSON.parse(sessionStorage.getItem(`${id}-expanded`));
		// console.log(`${id} ${expanded}`);
		this.state = ({
			expanded: expanded, // Set up from sessionStorage and expandd by default
			id: id,
		});
	}

	doNowt = (e) => {
		// console.log("doNowt", e);
		e.preventDefault();
		e.stopPropagation();
	};

	render = () => {
		const {
			config,
			title = '',
			titleHTML = '',
			// info,
			className = '',
			children,
			target,
		} = this.props;

		const {
			// informationText,
			// informationTextHTML,
			instructionsText,
			instructionsTextHTML,
		} = config;

		const {
			id,
		} = this.state;

		// console.log("target", target);

		return (
			<div
				className={`section ${className ? className : ''}`}
				id={`${id}`}
			>
				<Card className="w-full sortable mt-8">
					<CardHeader>
						<CardTitle className="text-base">{/* font-semibold">*/}
							<span className={`special-anchor-target`} id={`special-anchor-${target}`} name={`special-anchor-${target}`} >
								<h2>{titleHTML ? (
									<span
										dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(titleHTML) }}
									/>
								) : (
									<span
									>{title}</span>
								)}</h2>
							</span>

							{/* {title} */}
						</CardTitle>
						{/* <Info className={`text accordionarticle`} id={`info-${id}`} informationText={informationText} informationTextHTML={informationTextHTML}/> */}
						{instructionsText ? <p className={`instructions text section`}>{instructionsText}</p> : null}
						{instructionsTextHTML ? <div className={`instructions html section`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instructionsTextHTML) }} /> : null}

					</CardHeader>

					<CardContent>

						<div
							id={`${id}`}
							name={`article-${id}`}
							key={`article-${id}`}
						>
							<div
								id={`content-${id}`}
								onClick={this.doNowt}
							>
								<div
									className={`pb-5 text-sm text-slate-500`}
								>
									{children}
								</div>
							</div>
						</div>
						<TopButton />
					</CardContent>
				</Card>
			</div>
		);
	};
}
