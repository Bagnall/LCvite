import './AudioClip.scss';
import React from 'react';
import {
	resolveAsset,
} from '../../utility';

export class AudioClip extends React.PureComponent {
	constructor(props) {
		super(props);
		this.playSound = this.playSound.bind(this);

	}

	playSound = () => {
		const { soundFile } = this.props;
		// console.log("soundFile", soundFile, resolveAsset(soundFile));
		// const soundFileAudio = new Audio(resolveAsset(soundFile));
		const soundFileAudio = new Audio(soundFile);
		// const soundFileAudio = new Audio(resolveAsset('/sounds/tada.mp3'));
		soundFileAudio.play();

		// console.log("playSound");
	};

	render = () => {
		const {
			className = '',
			listenText = '',
			soundFile,
		} = this.props;

		if (className.includes('super-compact')) {
			return (
				<div className={`audio-container super-compact`}
					onClick={this.playSound}
					title={`play`}
				>
					{/* <audio controls><source src={soundFile} /></audio> */}
				</div>
			);
		} else if (className.includes('compact')) {
			return (
				<audio className={`${className ? className : ''}`} controls ><source src={soundFile}/></audio>
			);
		} else {
			return (
				<label className='audio-clip'>{listenText}{listenText === '' ? '' : ':'}&nbsp;
					<audio className={`${className ? className : ''}`} controls ><source src={soundFile}/></audio>
				</label>
			);
		}
	};
}

