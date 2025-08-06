import {Info} from '..';
import React from 'react';

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

		this.state = ({
			expanded: expanded, // Set up from sessionStorage
			id: id,
		});

		this.toggleExpanded = this.toggleExpanded.bind(this);
	}

	componentDidUpdate = (prevProps) => {
		if (this.props.expandNow !== prevProps.expandNow) {
			this.expand();
		}
	};

	expand = () => {
		const {
			id,
		} = this.state;

		sessionStorage.setItem(`${id}-expanded`, JSON.stringify(true));
		this.setState({
			expanded: true
		});
	};

	toggleExpanded = () => {
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
			children,
			className,
			info,
			title = '',
			titleHTML = '',
		} = this.props;

		const {
			expanded,
			id,
		} = this.state;

		let h2 = (
			<h2
				onClick={this.toggleExpanded}
				title={`${expanded ? 'Click to close' : 'Click to expand'}`}
			>
				{title}
				{info ? <Info infoTitle={info.infoTitle} infoMessage={info.infoMessage} /> : null}
			</h2>
		);

		if (titleHTML !== '') {
			h2 = (
				<h2
					onClick={this.toggleExpanded}
					title={`${expanded ? 'Click to close' : 'Click to expand'}`}
				>
					<span dangerouslySetInnerHTML={{ __html: titleHTML }}/>
					{info ? <Info infoTitle={info.infoTitle} infoMessage={info.infoMessage} /> : null}
				</h2>
			);
		}

		return (
			<article
				className={`accordion-article ${expanded ? 'expanded' : ''} ${className ? className : ''}`}
				id={`${id}`}
				key={`article${id}`}
			>
				<header>
					<div
						className={`arrow ${expanded ? 'expanded' : ''}`}
						onClick={this.toggleExpanded}
						title={`${expanded ? 'Click to close' : 'Click to expand'}`}
					/>
					{h2}
				</header>
				<div className='content'>
					{children}
				</div>
			</article >
		);
	};
}