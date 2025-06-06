import './Explanation.scss';
import {
	resolveAsset,
	speak,
} from '../../utility';
import { Panel } from "./Panel";
import React from 'react';

export class Explanation extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	handleSoundLinkClick = (e) => {
		e.preventDefault(e);
		e.stopPropagation(e);
		console.log("Clicky", e.target.href, resolveAsset(e.target.href));
		const myAudio = new Audio(resolveAsset(e.target.href));
		myAudio.play();
		return false;
	};

	handlePlaySound = (e) => {
		e.preventDefault();
		new Audio(e.target.href).play();
		return false;
	};

	componentDidMount = () => {
		const soundClips = document.querySelectorAll('.sound-link');
		soundClips.forEach((soundClip) => {
			// soundClip.removeEventListener('click', this.handleSoundLinkClick);
			// soundClip.addEventListener('click', this.handleSoundLinkClick);
			soundClip.setAttribute('title', 'Click to play sound');
			soundClip.setAttribute('onclick', 'event.preventDefault(); new Audio(this.href).play(); return false;');
		});

		// const speeches = document.querySelectorAll('.speak');
		// speeches.forEach((speech) => {
		// 	speech.setAttribute('title', 'Click to play sound');
		// 	// speech.removeEventListener('click', speak); // Prevent duplicates
		// 	console.log("speech.setup", speech.setup);
		// 	if (speech.setup) {
		// 		// Do nowt!
		// 	} else {
		// 		speech.addEventListener('click', speak);
		// 	}
		// 	speech.setup = true;
		// });
	};

	// componentWillUnmount = () => {
	// 	const speeches = document.querySelectorAll('.speak');
	// 	speeches.forEach((speech) => {
	// 		speech.removeEventListener('click', speak); // Prevent duplicates
	// 	});
	// };

	render = () => {
		const { config } = this.props;
		const {
			content,
			htmlContent,
			id
		} = config;
		const contents = new Array;
		for (let i = 0; i < content.length; i++){
			contents.push(
				<Panel id={`${id}-${i}`} content={content[i]} key={`${id}-Panel${i}`}></Panel>
			);
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
