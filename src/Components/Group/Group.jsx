import './Group.scss';
import React from 'react';

export class Group extends React.PureComponent {

	render = () => {
		const {
			content,
			id,
			titleText,
		} = this.props;
		return (
			<AccordionArticle
				className={`group`}
				id={`Group${id}Accordion`}
				title={titleText}
			>
				{content}
			</AccordionArticle>
		);
	};
}

