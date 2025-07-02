import './Explanation.scss';
// import {
// 	resolveAsset,
// 	speak,
// } from '../../utility';
import { Panel } from "./Panel";
import React from 'react';

export class Explanation extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render = () => {
		const { config } = this.props;
		const {
			content = [],
			htmlContent,
			id
		} = config;
		const contents = new Array;
		if (content.length) {
			for (let i = 0; i < content.length; i++) {
				contents.push(
					<Panel id={`${id}-${i}`} content={content[i]} key={`${id}-Panel${i}`}></Panel>
				);
			}
		}
		return (
			<div
				className={`explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}PhraseTable`}
			>
				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}

				{contents}
			</div>
		);
	};
}
