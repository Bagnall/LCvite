import './Explanation.scss';
import { Panel } from "./Panel";
import React from 'react';
export class Explanation extends React.PureComponent {
	render = () => {
		const { config } = this.props;
		const { content, id } = config;
		const contents = new Array;
		for (let i = 0; i < content.length; i++){
			contents.push(
				<Panel id={`${id}${i}`} content={content[i]} key={`${id}-Panel${i}`}></Panel>
			);
		}
		return (
			<div
				className={`explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}PhraseTable`}
			>
				{contents}
			</div>
		);
	};
}
