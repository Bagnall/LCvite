import './AudioClip.scss';
import React from 'react';

export class AudioClip extends React.PureComponent {
	constructor(props) {
		super(props);
		this.initialiseProgress = this.initialiseProgress.bind(this);
		this.notePlaying = this.notePlaying.bind(this);
		this.playSound = this.playSound.bind(this);
		this.state = ({
			status: 'stopped',
		});
		this.audioRef = React.createRef();
	}

	notePlaying = (e, useRef) =>
	{
		e.preventDefault();
		e.stopPropagation();
		// useRef is true when the player is an audio control
		if (useRef) {
			this.initialiseProgress(this.audioRef.current);
		}
		this.setState({
			status: 'playing'
		});
	};

	handleClick = (e) => {
		// console.log("handleClick (only for super-compact and link)");
		e.preventDefault();
		e.stopPropagation();
		const {
			soundFileAudio,
			status = 'stopped',
		} = this.state;
		switch (status) {
			case 'stopped':
				this.playSound(e);
				break;
			case 'paused':
				this.setState({
					status: 'playing'
				});

				soundFileAudio.play();
				break;
			case 'playing':
				this.pause(e);
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

	playSound = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const { soundFile } = this.props;
		this.notePlaying(e, false);
		const soundFileAudio = new Audio(soundFile);
		this.initialiseProgress(soundFileAudio);
		soundFileAudio.onended = () => {
			this.setState({
				status: 'stopped'
			});
		};
		soundFileAudio.play();
		this.setState({
			soundFileAudio: soundFileAudio,
			status: 'playing'
		});
	};

	pause = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const { soundFileAudio } = this.state;
		this.setState({
			status: 'paused'
		});
		soundFileAudio.pause();
	};

	render = () => {
		const {
			className = '',
			children,
			id,
			inline = false,
			listenText = '',
			soundFile,
		} = this.props;

		if (className.includes('link')) {
			return (
				<LinkAudioProgress
					id={id}
					key={id}
					soundFile={soundFile}
				>{children}</LinkAudioProgress>
			);
		} else if (className.includes('super-compact')) {
			return (
				<CircularAudioProgress
					id={id}
					inline={inline}
					key={id}
					soundFile={soundFile}
				/>
			);
		} else if (className.includes('compact')) {
			return (
				<audio
					className={`${className ? className : ''}`}
					controls
					id={id}
					key={id}
					onPlay={(e) => this.notePlaying(e, true)}
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
							key={id}
							onPlay={(e) => this.notePlaying(e, true)}
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
						id={id}
						key={id}
						onPlay={(e) => this.notePlaying(e, true)}
						ref={this.audioRef}
					><source src={soundFile} /></audio>
				);
			}
		}
	};
}

class CircularAudioProgress extends AudioClip {
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
		const strokeWidth = 2;
		const colour = '#000';
		const bgColour = '#ddd';

		const inline = this.props;

		const root = getComputedStyle(document.documentElement);
		let compactDimension = root.getPropertyValue('--compact-dimension').trim();
		compactDimension = parseInt(compactDimension);
		const size = compactDimension;
		const radius = (size - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;
		const { status = 'stopped' } = this.state;
		if (isNaN(size)){
			return null;
		} else {
			return (
				<span
					className={`audio-container ${inline ? 'inline' : ''} super-compact circular-audio-progress ${status}`}
					onClick={this.handleClick}
					onPlay={(e) => this.notePlaying(e, false)}
					ref={this.audioRef}
					title={`${status !== 'playing' ? 'Click to play' : 'Click to pause'}`}
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
				</span>
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
		const {
			status = ''
		} = this.state;

		return (
			<span
				className={`audio-link ${status}`}
				onClick={this.handleClick}
				onPlay={(e) => this.notePlaying(e, false)}
				ref={this.linkRef}
				title={`${status !== 'playing' ? 'Click to play' : 'Click to pause'}`}
			><svg xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-volume-icon lucide-volume"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /></svg>{children}</span>
		);
	};
}