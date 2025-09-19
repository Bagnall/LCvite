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

	// componentDidUpdate = (prevProps) => {
	// 	const {
	// 		expanded = false,
	// 		id,
	// 	} = this.state;
	// 	// console.log("componentDidUpdate", expanded);
	// 	if (this.props.expandNow !== prevProps.expandNow) {
	// 		// this.expand();
	// 		this.setState({
	// 			expanded: true
	// 		});

	// 	}
	// 	// const content = document.getElementById(`content-${id}`);
	// 	// if (expanded)
	// 	// 	content.style.maxHeight = `${content.scrollHeight}px`;
	// 	// else
	// 	// 	content.style.maxHeight = `0`;
	// };

	// expand = () => {
	// 	const {
	// 		id,
	// 	} = this.state;

	// 	sessionStorage.setItem(`${id}-expanded`, JSON.stringify(true));
	// 	this.setState({
	// 		expanded: true
	// 	});
	// };

	doNowt = (e) => {
		console.log("doNowt", e);
		e.preventDefault();
		e.stopPropagation();

	};

	// toggleAccordion = (e) => {
	// 	const {
	// 		expanded,
	// 		id,
	// 	} = this.state;
	// 	e.preventDefault();
	// 	e.stopPropagation();

	// 	if (expanded) {
	// 		this.setState({
	// 			expanded: false
	// 		});
	// 		sessionStorage.setItem(`${id}-expanded`, JSON.stringify(false));

	// 	} else {
	// 		this.setState({
	// 			expanded: true
	// 		});
	// 		sessionStorage.setItem(`${id}-expanded`, JSON.stringify(true));
	// 	}
	// 	if ("vibrate" in navigator) {
	// 		window.navigator.vibrate(100);
	// 	}

	// };

	toggleExpanded = (e) => {
		console.log("toggleExpanded");
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
			title = '',
			titleHTML = '',
			info,
			expandedByDefault = false,
			className = '',
			children,
		} = this.props;

		const {
			expanded,
			id,
		} = this.state;

		return (
			<article
				className={`accordion-article border-b border-slate-200 
				${expanded ? 'expanded' : ''} ${className ? className : ''}`}
				onClick={this.toggleExpanded}
				id={`${id}`}
				key={`article${id}`}
			>
				<button
					onClick={this.toggleExpanded}
					className={`w-full flex justify-between items-center py-5 text-slate-800`}>
					{titleHTML ? (
						<span
							onClick={this.toggleExpanded}
							dangerouslySetInnerHTML={{ __html: titleHTML }}
						/>
					) : (
						<span onClick={this.toggleExpanded}
						>{title}</span>
					)}
					{info ? <Info infoTitle={info.infoTitle} infoMessage={info.infoMessage} /> : null}
					<span
						id={`icon-${id}`}
						className={`text-slate-800 transition-transform duration-300`}
						onClick={this.toggleExpanded}
					>
						<svg
							className={`arrow-icon`}
							onClick={this.toggleExpanded}
							xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
							<path fillRule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
						</svg>
					</span>
				</button>
				<div
					id={`content-${id}`}
					onClick={this.doNowt}
					className={`overflow-hidden transition-all duration-300 ease-in-out`}>
					<div
						// onClick={auto}
						className={`pb-5 text-sm text-slate-500`}
					>
						{children}
					</div>
				</div>
			</article>
		);
	};
}
