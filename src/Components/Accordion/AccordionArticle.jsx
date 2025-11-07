// src/Components/Accordion/AccordionArticle.jsx
import React from 'react';
import { Info } from '..';

export class AccordionArticle extends React.PureComponent {
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

		this.toggleExpanded = this.toggleExpanded.bind(this);
	}


	doNowt = (e) => {
		// console.log("doNowt", e);
		e.preventDefault();
		e.stopPropagation();
	};

	toggleExpanded = (e) => {
		// console.log("toggleExpanded");
		e.preventDefault();
		e.stopPropagation();
		let {
			expanded,
		} = this.state;
		const {
			id,
		} = this.state;
		expanded = !expanded;
		sessionStorage.setItem(`${id}-expanded`, JSON.stringify(expanded));
		this.setState({
			expanded: expanded
		});
		if ("vibrate" in navigator) {
			window.navigator.vibrate(100);
		}
	};

	render = () => {
		const {
			config,
			title = '',
			titleHTML = '',
			info,
			className = '',
			children,
			target,
		} = this.props;

		const {
			informationText,
			informationTextHTML,
			instructionsText,
			instructionsTextHTML,
		} = config;

		const {
			expanded,
			id,
		} = this.state;

		// console.log("target", target);

		return (
			<>

				<article
					className={`accordion-article border-b border-slate-200 special-anchor-target 
				${expanded ? 'expanded' : ''} ${className ? className : ''}`}
					onClick={this.toggleExpanded}
					id={`${id}`}
					name={`${id}`}
					key={`article${id}`}
				>
					<a className={`special-anchor-target`} name={`special-anchor-${target}`} >
						<button
							onClick={this.toggleExpanded}
							className={`w-full flex items-center py-5 text-slate-800`}>
							<span
								id={`icon-${id}`}
								className={`text-slate-800 transition-transform duration-300`}
								onClick={this.toggleExpanded}
							>
								<svg
									className={`arrow-icon w-4 h-4`}
									onClick={this.toggleExpanded}
									xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
									<path fillRule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
								</svg>
							</span>
							{titleHTML ? (
								<span
									onClick={this.toggleExpanded}
									dangerouslySetInnerHTML={{ __html: titleHTML }}
								/>
							) : (
								<span onClick={this.toggleExpanded}
								>{title}</span>
							)}
						</button>
					</a>

					<div
						id={`content-${id}`}
						onClick={this.doNowt}
						className={`overflow-hidden transition-all duration-300 ease-in-out`}>
						<div
							className={`pb-5 text-sm text-slate-500`}
						>
							<Info className={`text accordionarticle`} id={`info-${id}`} informationText={informationText} informationTextHTML={informationTextHTML}/>
							{instructionsText ? <p className={`instructions text accordionarticle`}>{instructionsText}</p> : null}
							{instructionsTextHTML ? <p className={`instructions html accordionarticle`} dangerouslySetInnerHTML={{ __html: instructionsTextHTML }} /> : null}
							{children}
						</div>
						{/* <button className={`top`} onClick={() => { scrollTo({ behavior: 'smooth', left: 0, top: 0 });}}>Top</button> */}
					</div>
				</article>
			</>
		);
	};
}
