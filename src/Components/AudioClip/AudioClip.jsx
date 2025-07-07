import './AudioClip.scss';
import React from 'react';
import {
	resolveAsset,
} from '../../utility';

export class AudioClip extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = ({
			status: 'stopped'
		});
		this.notePlaying = this.notePlaying.bind(this);
		this.playSound = this.playSound.bind(this);
	}

	notePlaying = () => {
		this.setState({
			status: "playing"
		});
	};

	handleClick = () => {
		const {
			soundFileAudio,
			status
		} = this.state;
		switch (status) {
			case 'stopped':
				this.playSound();
				break;
			case 'paused':
				soundFileAudio.play();
				this.setState({status: 'playing'});
				break;
			case 'playing':
				this.pause();
				break;
		}
	};

	playSound = () => {
		const { soundFile } = this.props;
		this.notePlaying();
		const soundFileAudio = new Audio(soundFile);
		soundFileAudio.onended = () => {
			this.setState({ status: 'stopped' });
		};
		soundFileAudio.play();
		this.setState({
			soundFileAudio: soundFileAudio,
			status: 'playing',
		});
	};

	pause = () => {
		const { soundFileAudio } = this.state;
		soundFileAudio.pause();
		this.setState({ status: 'paused' });
	};

	render = () => {
		const {
			className = '',
			children,
			id,
			listenText = '',
			soundFile,
		} = this.props;
		const {
			status
		} = this.state;

		if (className.includes('link')) {
			return (
				<span className={`audio-link ${status}`}
					onClick={this.handleClick}
					onPlay={this.notePlaying}
					title={`play`}
				>{children}</span>
			);
		} else if (className.includes('super-compact')) {
			return (
				<div className={`audio-container super-compact ${status}`}
					onClick={this.handleClick}
					onPlay={this.notePlaying}
					title={`play`}
				></div>
			);
		} else if (className.includes('compact')) {
			return (
				<audio
					className={`${className ? className : ''}`}
					controls
					onPlay={this.notePlaying}
				><source src={soundFile} /></audio>
			);
		} else {
			if (listenText !== '') {
				return (
					<label className='audio-clip' htmlFor={`${id}`}>{listenText}{listenText === '' ? '' : ':'}&nbsp;
						<audio
							className={`${className ? className : ''}`}
							controls
							id={`${id}`}
							onPlay={this.notePlaying}
						><source src={soundFile}
							/></audio>
					</label>
				);
			} else {
				return (
					<audio className={`${className ? className : ''}`} controls onPlay={this.notePlaying}><source src={soundFile} /></audio>
				);
			}
		}
	};
}

