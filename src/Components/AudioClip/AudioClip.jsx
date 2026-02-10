import './AudioClip.scss';
import { CircularAudioProgressAnimatedSpeakerDisplay } from '.';
import React from 'react';
import { resolveAsset } from '../../utility';

export class AudioClip extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			status: 'stopped', // 'stopped' | 'playing' | 'paused'
			progress: 0, // seconds (number)
			duration: 0, // seconds (number)
		};

		this.audioRef = React.createRef(); // for native <audio controls>
		this._audio = null; // for custom players (link/super-compact)
		this._bound = false;
	}

	componentWillUnmount() {
		this.detachAudioListeners();
		if (this._audio) {
			try { this._audio.pause(); } catch (e) {}
			this._audio = null;
		}
	}

	// ---------- Audio plumbing ----------

	getAudio = (useRef) => {
		if (useRef) {
			return this.audioRef.current || null;
		}
		// Custom player uses JS Audio object
		if (!this._audio) {
			const { soundFile } = this.props;
			this._audio = new Audio(resolveAsset(soundFile));
		}
		return this._audio;
	};

	attachAudioListeners = (audio) => {
		if (!audio || audio._lcSetup) return;

		audio._lcSetup = true;

		audio.addEventListener('loadedmetadata', this.handleMetadataLoaded);
		audio.addEventListener('timeupdate', this.handleTimeUpdate);
		audio.addEventListener('ended', this.handleEnded);
		audio.addEventListener('pause', this.handlePausedEvent);
		audio.addEventListener('play', this.handlePlayEvent);
	};

	detachAudioListeners = () => {
		const audio = this._audio;
		if (!audio || !audio._lcSetup) return;

		audio.removeEventListener('loadedmetadata', this.handleMetadataLoaded);
		audio.removeEventListener('timeupdate', this.handleTimeUpdate);
		audio.removeEventListener('ended', this.handleEnded);
		audio.removeEventListener('pause', this.handlePausedEvent);
		audio.removeEventListener('play', this.handlePlayEvent);

		audio._lcSetup = false;
	};

	handleMetadataLoaded = (e) => {
		const audio = e?.target || this._audio;
		if (!audio) return;

		const duration = Number(audio.duration);
		this.setState({
			duration: isFinite(duration) && duration > 0 ? duration : 0,
		});
	};

	handleTimeUpdate = (e) => {
		const audio = e?.target || this._audio;
		if (!audio) return;

		const progress = Number(audio.currentTime);
		this.setState({
			progress: isFinite(progress) && progress >= 0 ? progress : 0,
		});
	};

	handleEnded = () => {
		// Force snap back to start
		this.setState({
			status: 'stopped',
			progress: 0,
		});
	};

	handlePausedEvent = () => {
		// Avoid marking stopped as paused (ended will set stopped)
		if (this.state.status === 'playing') {
			this.setState({ status: 'paused' });
		}
	};

	handlePlayEvent = () => {
		if (this.state.status !== 'playing') {
			this.setState({ status: 'playing' });
		}
	};

	// ---------- UI events ----------

	notePlaying = (e, useRef) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		const audio = this.getAudio(useRef);
		this.attachAudioListeners(audio);
		this.setState({ status: 'playing' });
	};

	playSound = (e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		const audio = this.getAudio(false);
		this.attachAudioListeners(audio);

		// Ensure src is current (in case props changed)
		const { soundFile } = this.props;
		const src = resolveAsset(soundFile);
		if (audio.src !== src) audio.src = src;

		// Start from beginning if stopped
		if (this.state.status === 'stopped') {
			try { audio.currentTime = 0; } catch (err) {}
			this.setState({ progress: 0 });
		}

		audio.play();
		this.setState({ status: 'playing' });
	};

	pause = (e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		const audio = this.getAudio(false);
		if (!audio) return;
		try { audio.pause(); } catch (err) {}
		this.setState({ status: 'paused' });
	};

	handleClick = (e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		const { status } = this.state;

		switch (status) {
			case 'stopped':
				this.playSound(e);
				break;
			case 'paused':
				this.playSound(e);
				break;
			case 'playing':
				this.pause(e);
				break;
			default:
				this.playSound(e);
		}
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

		const classes = className.split(/\s+/).filter(Boolean);

		if (classes.includes('link')) {
			return (
				<LinkAudioProgress
					id={id}
					key={id}
					soundFile={soundFile}
				>
					{children}
				</LinkAudioProgress>
			);
		} else if (classes.includes('super-compact')) {
			return (
				<CircularAudioProgress
					id={id}
					inline={inline}
					key={id}
					soundFile={soundFile}
				/>
			);
		} else if (classes.includes('super-compact-speaker')) {
			return (
				<CircularAudioProgressAnimatedSpeaker
					id={id}
					inline={inline}
					key={id}
					soundFile={soundFile}
				/>
			);
		} else if (classes.includes('compact')) {
			// Native controls version
			return (
				<audio
					className={`${className ? className : ''}`}
					controls
					id={id}
					key={id}
					onPlay={(e) => this.notePlaying(e, true)}
					onPause={() => this.setState({ status: 'paused' })}
					onEnded={() => this.setState({ status: 'stopped', progress: 0 })}
					ref={this.audioRef}
				>
					<source src={soundFile} />
				</audio>
			);
		} else {
			if (listenText !== '') {
				return (
					<label className="audio-clip" htmlFor={`${id}`}>
						{listenText}{listenText === '' ? '' : ':'}&nbsp;
						<audio
							className={`${className ? className : ''}`}
							controls
							id={`${id}`}
							key={id}
							onPlay={(e) => this.notePlaying(e, true)}
							onPause={() => this.setState({ status: 'paused' })}
							onEnded={() => this.setState({ status: 'stopped', progress: 0 })}
							ref={this.audioRef}
						>
							<source src={soundFile} />
						</audio>
					</label>
				);
			}
			return (
				<div className="audio-clip">
					<audio
						className={`${className ? className : ''}`}
						controls
						id={id}
						key={id}
						onPlay={(e) => this.notePlaying(e, true)}
						onPause={() => this.setState({ status: 'paused' })}
						onEnded={() => this.setState({ status: 'stopped', progress: 0 })}
						ref={this.audioRef}
					>
						<source src={soundFile} />
					</audio>
				</div>
			);
		}
	};
}

class CircularAudioProgress extends AudioClip {
	constructor(props) {
		super(props);
		this.circleRef = React.createRef();

		// IMPORTANT: merge state, don't clobber parent
		this.state = {
			...this.state,
		};
	}

	componentDidMount() {
		// Ensure audio exists and listeners are attached for custom player
		const audio = this.getAudio(false);
		this.attachAudioListeners(audio);
		this.updateCircleOffset();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.soundFile !== this.props.soundFile) {
			// swap source
			const audio = this.getAudio(false);
			if (audio) {
				const src = resolveAsset(this.props.soundFile);
				if (audio.src !== src) audio.src = src;
				this.setState({ progress: 0, duration: 0, status: 'stopped' });
			}
		}
		if (
			prevState.progress !== this.state.progress ||
			prevState.duration !== this.state.duration
		) {
			this.updateCircleOffset();
		}
	}

	updateCircleOffset = () => {
		const { progress, duration } = this.state;

		const root = getComputedStyle(document.documentElement);
		let compactDimension = parseInt(root.getPropertyValue('--compact-dimension').trim(), 10);
		if (!isFinite(compactDimension) || compactDimension <= 0) compactDimension = 27;

		const size = compactDimension;
		const circumference = Math.PI * size;

		let ratio = 0;
		if (duration > 0 && isFinite(duration)) {
			ratio = progress / duration;
		}
		ratio = Math.max(0, Math.min(1, ratio));

		const offset = circumference * (1 - ratio);

		if (this.circleRef.current) {
			this.circleRef.current.style.strokeDashoffset = String(offset);
		}
	};

	render = () => {
		const strokeWidth = 2;
		const bgColour = '#f0f0f0ff';

		const { inline } = this.props;
		const { status = 'stopped' } = this.state;

		const root = getComputedStyle(document.documentElement);
		const compactDimension = parseInt(root.getPropertyValue('--compact-dimension').trim(), 10);
		if (!isFinite(compactDimension) || compactDimension <= 0) return null;

		const size = compactDimension;
		const radius = (size - strokeWidth) / 2;
		const circumference = Math.PI * size;

		return (
			<span
				className={`audio-container ${inline ? 'inline' : ''} super-compact circular-audio-progress ${status}`}
				onClick={this.handleClick}
				title={`${status !== 'playing' ? 'Click to play' : 'Click to pause'}`}
			>
				<svg fill="none" width={size} height={size}>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={bgColour}
						strokeWidth={strokeWidth}
						fill="none"
					/>
					<circle
						ref={this.circleRef}
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke="currentColor"
						strokeWidth={strokeWidth}
						fill="none"
						strokeDasharray={circumference}
						strokeDashoffset={circumference}
						transform={`rotate(-90 ${size / 2} ${size / 2})`}
						style={{ transition: 'stroke-dashoffset 0.2s linear' }}
					/>
					<path fill="currentColor" d="m18.64 13.5-5.14 3.448-5.14 3.447V6.604l5.14 3.447z" className="play" />
					<path fill="currentColor" className="pause" d="M6.501 6.617h4.611v13.765H6.501zM14.966 6.617h4.611v13.765h-4.611z" />
				</svg>
			</span>
		);
	};
}

class CircularAudioProgressAnimatedSpeaker extends CircularAudioProgress {
	render = () => {
		const { inline } = this.props;
		const { status = 'stopped', progress = 0, duration = 0 } = this.state;

		return (
			<span>
				<CircularAudioProgressAnimatedSpeakerDisplay
					inline={inline}
					status={status}
					progress={progress}
					duration={duration}
					handleClick={this.handleClick}
				/>
			</span>
		);
	};
}

class LinkAudioProgress extends AudioClip {
	constructor(props) {
		super(props);
		this.linkRef = React.createRef();

		this.state = {
			...this.state,
		};
	}

	componentDidMount() {
		const audio = this.getAudio(false);
		this.attachAudioListeners(audio);
		this.updateUnderscoreOffset(); // ensure 0% initially
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.soundFile !== this.props.soundFile) {
			const audio = this.getAudio(false);
			if (audio) {
				const src = resolveAsset(this.props.soundFile);
				if (audio.src !== src) audio.src = src;
				this.setState({ progress: 0, duration: 0, status: 'stopped' });
			}
		}

		if (
			prevState.progress !== this.state.progress ||
			prevState.duration !== this.state.duration ||
			prevState.status !== this.state.status
		) {
			this.updateUnderscoreOffset();
		}
	}

	updateUnderscoreOffset = () => {
		if (!this.linkRef.current) return;

		const { progress, duration, status } = this.state;

		// Always force reset when stopped
		if (status === 'stopped') {
			this.linkRef.current.style.setProperty('--progress-width', '0%');
			return;
		}

		// Guard duration to avoid NaN%
		if (!duration || duration <= 0 || !isFinite(duration)) {
			this.linkRef.current.style.setProperty('--progress-width', '0%');
			return;
		}

		let pct = (100 * progress) / duration;
		if (!isFinite(pct)) pct = 0;
		pct = Math.max(0, Math.min(100, pct));

		this.linkRef.current.style.setProperty('--progress-width', `${pct}%`);
	};

	render = () => {
		const { children } = this.props;
		const { status = 'stopped' } = this.state;

		return (
			<span
				className={`audio-link ${status}`}
				onClick={this.handleClick}
				ref={this.linkRef}
				title={`${status !== 'playing' ? 'Click to play' : 'Click to pause'}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
				</svg>
				{children}
			</span>
		);
	};
}
