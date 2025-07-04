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
		const soundFileAudio = new Audio(soundFile);
		soundFileAudio.play();
	};

	render = () => {
		const {
			className = '',
			children,
			id,
			listenText = '',
			soundFile,
		} = this.props;

		if (className.includes('link')) {
			return (
				<span className={`audio-link`}
					sound-file={soundFile}
				>{children}</span>
			);
		} else if (className.includes('super-compact')) {
			return (
				<div className={`audio-container super-compact`}
					onClick={this.playSound}
					title={`play`}
				></div>
			);
		} else if (className.includes('compact')) {
			return (
				<audio className={`${className ? className : ''}`} controls ><source src={soundFile}/></audio>
			);
		} else {
			if (listenText !== '') {
				return (
					<label className='audio-clip' htmlFor={`${id}`}>{listenText}{listenText === '' ? '' : ':'}&nbsp;
						<audio
							className={`${className ? className : ''}`}
							controls
							id={`${id}`}
						><source src={soundFile}
							/></audio>
					</label>
				);
			} else {
				return (
					<audio className={`${className ? className : ''}`} controls ><source src={soundFile} /></audio>
				);
			}
		}
	};
}

