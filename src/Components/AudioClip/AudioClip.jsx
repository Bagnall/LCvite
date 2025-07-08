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
		this.initialiseProgress = this.initialiseProgress.bind(this);
		this.notePlaying = this.notePlaying.bind(this);
		this.playSound = this.playSound.bind(this);

		this.audioRef = React.createRef();
	}

	notePlaying = (useRef) => {
		// useRef is true when the player is an audio control
		if (useRef) {
			this.initialiseProgress(this.audioRef.current);
		}
		this.setState({
			status: "playing"
		});
	};

	handleClick = () => {
		console.log("handleClick (only for super-compact and link)");
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

	initialiseProgress = (audio) => {
		console.log("initialiseProgress", audio);
		if (!audio.setup) {
			audio.addEventListener('timeupdate', () => {
				const progress = (audio.currentTime / audio.duration) * 100;
				console.log(`Playback progress: ${progress.toFixed(1)}%`);
				this.setState({progress:  `${progress.toFixed(1)}%`});
			});
		}
	};

	playSound = () => {
		const { soundFile } = this.props;
		this.notePlaying();
		const soundFileAudio = new Audio(soundFile);
		this.initialiseProgress(soundFileAudio);
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
			progress = '0%',
			status
		} = this.state;

		if (className.includes('link')) {
			return (
				<span
					className={`audio-link ${status} ${progress}`}
					onClick={this.handleClick}
					onPlay={() => this.notePlaying(false)}
					title={`play`}
				>{children}</span>
			);
		} else if (className.includes('super-compact')) {
			// return (
			// 	<div
			// 		className={`audio-container super-compact ${status} ${progress}`}
			// 		onClick={this.handleClick}
			// 		onPlay={() => this.notePlaying(false)}
			// 		title={`play`}
			// 	>
			// 		<svg width="120" height="120">
			// 			<circle cx="60" cy="60" r="50" stroke="#ddd" stroke-width="10" fill="none" />

			// 			<circle id="progressRing"
			// 				cx="60" cy="60" r="50"
			// 				stroke="#f90" stroke-width="10"
			// 				fill="none"
			// 				stroke-dasharray="314.16"
			// 				stroke-dashoffset="314.16"
			// 				transform="rotate(-90 60 60)" />
			// 		</svg>
			// 	</div>
			// );
				    // const { soundFile, size = 120, strokeWidth = 10, colour = '#f90', bgColour = '#ddd' } = this.props;
			return (
				<CircularAudioProgress
					src={soundFile}
					size={60}
					strokeWidth={10}
					colour={'#f90'}
					bgColour={'#ddd'}
				/>
			);
		} else if (className.includes('compact')) {
			return (
				<audio
					className={`${className ? className : ''} ${progress}`}
					controls
					onPlay={() => this.notePlaying(true)}
					ref={this.audioRef}
				><source src={soundFile} /></audio>
			);
		} else {
			if (listenText !== '') {
				return (
					<label className='audio-clip' htmlFor={`${id}`}>{listenText}{listenText === '' ? '' : ':'}&nbsp;
						<audio
							className={`${className ? className : ''} ${progress}`}
							controls
							id={`${id}`}
							onPlay={() => this.notePlaying(true)}
							ref={this.audioRef}
						><source src={soundFile}
							/></audio>
					</label>
				);
			} else {
				return (
					<audio
						className={`${className ? className : ''} ${progress ? progress : null}`}
						controls
						onPlay={() => this.notePlaying(true)}
						ref={this.audioRef}
					><source src={soundFile} /></audio>
				);
			}
		}
	};
}

class CircularAudioProgress extends React.Component {
	constructor(props) {
		super(props);
		this.audioRef = React.createRef();
		this.circleRef = React.createRef();

		this.state = {
			duration: 0,
			progress: 0,
		};
	}

	componentDidMount() {
		const audio = this.audioRef.current;

		audio.addEventListener('loadedmetadata', this.handleMetadataLoaded);
		audio.addEventListener('timeupdate', this.handleTimeUpdate);
	}

	componentWillUnmount() {
		const audio = this.audioRef.current;

		audio.removeEventListener('loadedmetadata', this.handleMetadataLoaded);
		audio.removeEventListener('timeupdate', this.handleTimeUpdate);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.progress !== this.state.progress || prevState.duration !== this.state.duration) {
			this.updateCircleOffset();
		}
	}

	handleMetadataLoaded = () => {
		this.setState({ duration: this.audioRef.current.duration });
	};

	handleTimeUpdate = () => {
		this.setState({ progress: this.audioRef.current.currentTime });
	};

	updateCircleOffset() {
		const { progress, duration } = this.state;
		const { size = 120, strokeWidth = 10 } = this.props;

		const radius = (size - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;
		const offset = circumference * (1 - (progress / duration || 0));

		if (this.circleRef.current) {
			this.circleRef.current.style.strokeDashoffset = offset;
		}
	}

	render() {
		const { src, size = 120, strokeWidth = 10, colour = '#f90', bgColour = '#ddd' } = this.props;

		const radius = (size - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;

		return (
			<div style={{ textAlign: 'center' }}>
				<audio ref={this.audioRef} controls style={{ marginBottom: '1rem' }}>
					<source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
				</audio>

				<svg width={size} height={size}>
					{/* Background ring */}
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={bgColour}
						strokeWidth={strokeWidth}
						fill="none"
					/>
					{/* Progress ring */}
					<circle
						ref={this.circleRef}
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={colour}
						strokeWidth={strokeWidth}
						fill="none"
						strokeDasharray={circumference}
						strokeDashoffset={circumference}
						transform={`rotate(-90 ${size / 2} ${size / 2})`}
						style={{ transition: 'stroke-dashoffset 0.2s linear' }}
					/>
				</svg>
			</div>
		);
	}
}
