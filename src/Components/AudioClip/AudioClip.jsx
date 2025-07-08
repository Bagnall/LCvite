import './AudioClip.scss';
import React from 'react';

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
		// console.log("handleClick (only for super-compact and link)");
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
		} = this.state;

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
		this.circleRef = React.createRef();

		this.state = ({
			duration: 0,
			progress: 0,
		});
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
			status
		} = this.state;
		switch (status) {
			case 'paused':
				soundFileAudio.play();
				this.setState({status: 'playing'});
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
		this.setState({ status: 'paused' });
	};

	playSound = () => {
		const { soundFile } = this.props;
		this.setState({
			status: "playing"
		});
		const soundFileAudio = new Audio(soundFile);
		// this.initialiseProgress(soundFileAudio);
		soundFileAudio.onended = () => {
			this.setState({ status: 'stopped' });
		};
		soundFileAudio.play();
		this.setState({
			soundFileAudio: soundFileAudio,
			status: 'playing',
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
		const { status } = this.state;
		const root = getComputedStyle(document.documentElement);
		let compactDimension = root.getPropertyValue('--compact-dimension').trim();
		compactDimension = parseInt(compactDimension);
		// const {
		// 	compactDimension
		// } = Variables;
		// const compactDimension = 27;
		const size = compactDimension;
		const radius = (size - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;

		return (
			<div
				className={`audio-container super-compact circular-audio-progress ${status}`}
				onClick={this.handleClick}
				onPlay={() => this.notePlaying(false)}
				ref={this.audioRef}
				title={`${status !== 'paused' ? 'Click to play' : 'Click to pause'}`}
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
	};

	render = () => {
		const { children } = this.props;
		const {
			status
		} = this.state;

		return (
			<span
				className={`audio-link ${status}`}
				onClick={this.handleClick}
				onPlay={() => this.notePlaying(false)}
				ref={this.linkRef}
				title={`${status !== 'paused' ? 'Click to play' : 'Click to pause'}`}
			>{children}</span>
		);
	};
}