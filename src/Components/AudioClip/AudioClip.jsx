import './AudioClip.scss';
import React from 'react';

export class AudioClip extends React.PureComponent {
	constructor(props) {
		super(props);
		this.initialiseProgress = this.initialiseProgress.bind(this);
		this.notePlaying = this.notePlaying.bind(this);
		this.playSound = this.playSound.bind(this);

		this.audioRef = React.createRef();
		this.status = 'stopped';
	}

	notePlaying = (useRef) => {
		// useRef is true when the player is an audio control
		if (useRef) {
			this.initialiseProgress(this.audioRef.current);
		}
		this.status = "playing";
	};

	handleClick = () => {
		// console.log("handleClick (only for super-compact and link)");
		const {
			soundFileAudio,
		} = this.state;
		switch (this.status) {
			case 'stopped':
				this.playSound();
				break;
			case 'paused':
				this.status = 'playing';
				soundFileAudio.play();
				break;
			case 'playing':
				this.pause();
				break;
		}
	};

	initialiseProgress = (audio) => {
		// console.log("initialiseProgress", audio);
		if (!audio.setup) {
			audio.addEventListener('timeupdate', () => {
				const progress = (audio.currentTime / audio.duration) * 100;
				// console.log(`Playback progress: ${progress.toFixed(1)}%`);
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
			this.status = 'stopped';
		};
		soundFileAudio.play();
		this.status = 'playing';
		this.setState({
			soundFileAudio: soundFileAudio,
		});
	};

	pause = () => {
		const { soundFileAudio } = this.state;
		this.status = 'paused';

		soundFileAudio.pause();
	};

	render = () => {
		const {
			className = '',
			children,
			id,
			listenText = '',
			soundFile,
		} = this.props;
		// const {
		// 	progress = '0%',
		// } = this.state;

		if (className.includes('link')) {
			return (
				<LinkAudioProgress
					soundFile={soundFile}
				>{children}</LinkAudioProgress>
			);
		} else if (className.includes('super-compact')) {
			return (
				<CircularAudioProgress
					soundFile={soundFile}
					size={30}
					strokeWidth={3}
					colour={'#000'}
					bgColour={'#ddd'}
				/>
			);
		} else if (className.includes('compact')) {
			return (
				<audio
					className={`${className ? className : ''}`}
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
							className={`${className ? className : ''}`}
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
						className={`${className ? className : ''}`}
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
		this.circleRef = React.createRef();

		this.state = ({
			duration: 0,
			progress: 0,
		});

		this.pause = this.pause.bind(this);
	}

	componentDidMount = () => {
		const { soundFileAudio } = this.state;
		if (soundFileAudio !== undefined && soundFileAudio.setup !== true) {
			soundFileAudio.addEventListener('loadedmetadata', this.handleMetadataLoaded);
			soundFileAudio.addEventListener('timeupdate', this.handleTimeUpdate);
			soundFileAudio.setup = true;
		}
	};

	componentWillUnmount = () => {
		const { soundFileAudio } = this.state;
		if (soundFileAudio !== undefined && soundFileAudio.setup !== true) {
			soundFileAudio.removeEventListener('loadedmetadata', this.handleMetadataLoaded);
			soundFileAudio.removeEventListener('timeupdate', this.handleTimeUpdate);
			soundFileAudio.setup = true;
		}
	};

	componentDidUpdate(prevProps, prevState) {
		const { soundFileAudio } = this.state;
		if (soundFileAudio !== undefined && soundFileAudio.setup !== true) {
			soundFileAudio.addEventListener('loadedmetadata', this.handleMetadataLoaded);
			soundFileAudio.addEventListener('timeupdate', this.handleTimeUpdate);
			soundFileAudio.setup = true;
		}
		if (prevState.progress !== this.state.progress || prevState.duration !== this.state.duration) {
			this.updateCircleOffset();
		}
	}

	handleClick = () => {
		// console.log("handleClick (only for super-compact and link)");
		const {
			soundFileAudio,
		} = this.state;
		switch (this.status) {
			case 'paused':
				this.status = 'playing';
				soundFileAudio.play();
				break;
			case 'playing':
				this.pause();
				break;
			case 'stopped':
			default:
				this.playSound();
				break;
		}
	};

	handleMetadataLoaded = () => {
		const {
			soundFileAudio,
		} = this.state;
		this.setState({ duration: soundFileAudio.duration });
	};

	handleTimeUpdate = () => {
		const {
			soundFileAudio,
		} = this.state;
		this.setState({ progress: soundFileAudio.currentTime });
	};

	pause = () => {
		const { soundFileAudio } = this.state;
		soundFileAudio.pause();
		this.status = 'paused';
	};

	playSound = () => {
		const { soundFile } = this.props;
		this.status = "playing";
		const soundFileAudio = new Audio(soundFile);
		// this.initialiseProgress(soundFileAudio);
		soundFileAudio.onended = () => {
			this.status = 'stopped';
		};
		soundFileAudio.play();
		this.status = 'playing';
		this.setState({
			soundFileAudio: soundFileAudio,
		});
	};

	updateCircleOffset = () => {
		const { progress, duration } = this.state;
		const { strokeWidth = 2 } = this.props;
		const compactDimension = 27;
		const size = compactDimension;

		const radius = (size - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;
		const offset = circumference * (1 - (progress / duration || 0));

		if (this.circleRef.current) {
			this.circleRef.current.style.strokeDashoffset = offset;
		}
	};

	render = () => {
		const { strokeWidth = 2, colour = '#f90', bgColour = '#ddd' } = this.props;
		const root = getComputedStyle(document.documentElement);
		let compactDimension = root.getPropertyValue('--compact-dimension').trim();
		compactDimension = parseInt(compactDimension);
		const size = compactDimension;
		const radius = (size - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;
		if (isNaN(size)){
			return null;
		} else {
			return (
				<div
					className={`audio-container super-compact circular-audio-progress ${this.status}`}
					onClick={this.handleClick}
					onPlay={() => this.notePlaying(false)}
					ref={this.audioRef}
					title={`${this.status !== 'paused' ? 'Click to play' : 'Click to pause'}`}
					style={{
						backgroundPosition: `center center`,
						backgroundSize: `${compactDimension / 2}px`,
					}}
				>
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
	};
}

class LinkAudioProgress extends CircularAudioProgress {
	constructor(props) {
		super(props);
		this.linkRef = React.createRef();

		this.state = ({
			duration: 0,
			progress: 0,
		});

		this.updateUnderscoreOffset = this.updateUnderscoreOffset.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		const { soundFileAudio } = this.state;
		if (soundFileAudio !== undefined && soundFileAudio.setup !== true) {
			soundFileAudio.addEventListener('loadedmetadata', this.handleMetadataLoaded);
			soundFileAudio.addEventListener('timeupdate', this.handleTimeUpdate);
			soundFileAudio.setup = true;
		}
		if (prevState.progress !== this.state.progress || prevState.duration !== this.state.duration) {
			this.updateUnderscoreOffset();
		}
	}

	updateUnderscoreOffset = () => {
		const { progress, duration } = this.state;
		// console.log("progress", progress, "duration", duration);
		this.linkRef.current.style.setProperty('--progress-width', `${100 * progress / duration}%`);
		// this.linkRef.current.setAttribute('title', 'Click to pause');
	};

	render = () => {
		const { children } = this.props;
		// const {
		// 	status
		// } = this.state;

		return (
			<span
				className={`audio-link ${this.status}`}
				onClick={this.handleClick}
				onPlay={() => this.notePlaying(false)}
				ref={this.linkRef}
				title={`${this.status !== 'paused' ? 'Click to play' : 'Click to pause'}`}
			>{children}</span>
		);
	};
}