// src/Components/Accordion/Section.jsx
import React from 'react';
import {
	Info,
	TopButton
} from '..';

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
			info,
			className = '',
			children,
			target,
		} = this.props;

		const {
			instructionsText,
			instructionsTextHTML,
		} = config;

		const {
			expanded,
			id,
		} = this.state;

		// console.log("target", target);

		return (
			<div
				className={`section`}
				id={`${id}`}
			>
				<a className={`special-anchor-target`} name={`special-anchor-${target}`} />
				<h2>{titleHTML ? (
					<span
						dangerouslySetInnerHTML={{ __html: titleHTML }}
					/>
				) : (
					<span
					>{title}</span>
				)}</h2>
				{info ? <Info infoTitle={info.infoTitle} infoMessage={info.infoMessage} /> : null}
				{/* {instructionsText ? <p className={`instructions text section`}>{instructionsText}</p> : null}
				{instructionsTextHTML ? <p className={`instructions html section`} dangerouslySetInnerHTML={{ __html: instructionsTextHTML }} /> : null} */}

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
				{/* <button className={`top`} onClick={() => { scrollTo({ behavior: 'smooth', left: 0, top: 0 }); }}>Top</button> */}
			</div>
		);
	};
}
