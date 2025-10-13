import './MainMenu.scss';
import React from 'react';

export class MainMenu extends React.Component {

	render = () => {
		const {
			config,
			subTitle,
		} = this.props;
		console.log("MainMenu render", config, subTitle);
		const topMenu = []; // new Array;

		if (config) {

			for (const [/* key */, value] of Object.entries(config)) {
				// console.log(key, value);
				const { component, titleText } = value;
				if (component) {

					const { id } = value;
					topMenu.push(<li key={`menuItem-${id}`}>
						<a className={`special-anchor`} href={`#special-anchor-${id}`}>{titleText}</a></li>);
				}
			}

			return (
				<div className={`main-menu`}>
					<a className={`special-anchor`} href={`#special-anchor-top`}>{subTitle}</a>
					<ul id='topMenu'>{topMenu}</ul>
				</div>
			);
		}
	};
}

