import "./SequenceAudioController.scss";
import React from "react";

export class SequenceAudioController extends React.Component {
	constructor(props) {
		super(props);

		this.audioRef = React.createRef();

		// Not in state: avoids rerenders while we fill it
		this.durations = []; // seconds per track (index -> number)

		this.state = {
			clipDuration: 0,
			clipTime: 0, // committed playback time
			scrubTime: null, // transient UI-only time while scrubbing
			currentIndex: 0,
			masterDuration: 0,
			masterTime: 0,
			playSequence: false,
			playState: "stopped", // "playing" | "paused" | "stopped"
			volume: 1,
		};
	}

	componentDidMount() {
		const audio = this.audioRef.current;
		audio.addEventListener("timeupdate", this.handleTimeUpdate);
		audio.addEventListener("ended", this.handleEnded);
		audio.addEventListener("loadedmetadata", this.handleLoadedMetadata);

		// Optional but very helpful: preload durations so masterDuration is correct from the start.
		this.preloadDurations();
	}

	componentWillUnmount() {
		const audio = this.audioRef.current;
		audio.removeEventListener("timeupdate", this.handleTimeUpdate);
		audio.removeEventListener("ended", this.handleEnded);
		audio.removeEventListener("loadedmetadata", this.handleLoadedMetadata);
	}

	/* ---------- Duration preload (optional) ---------- */

	preloadDurations = () => {
		const { sources = [] } = this.props;
		if (!sources.length) return;

		const loads = sources.map((src, i) => {
			return new Promise((resolve) => {
				const a = new Audio();
				a.preload = "metadata";
				a.src = src;

				const done = () => {
					const d = Number.isFinite(a.duration) ? a.duration : 0;
					this.durations[i] = d;
					resolve(d);
				};

				a.addEventListener("loadedmetadata", done, { once: true });
				a.addEventListener("error", () => resolve(0), { once: true });
			});
		});

		Promise.all(loads).then(() => {
			const masterDuration = this.durations.reduce((sum, d) => sum + (d || 0), 0);
			this.setState({ masterDuration });
		});
	};

	/* ---------- Helpers for master timeline ---------- */

	getMasterTime = (index, clipTime) => {
		let t = 0;
		for (let i = 0; i < index; i++) t += this.durations[i] || 0;
		return t + (clipTime || 0);
	};

	computeMasterDuration = () => {
		const { sources = [] } = this.props;
		let sum = 0;
		for (let i = 0; i < sources.length; i++) sum += this.durations[i] || 0;
		return sum;
	};

	// Map a master time (seconds) to { index, offsetSeconds }
	locateMasterTime = (masterTime) => {
		const { sources = [] } = this.props;
		let t = masterTime;

		for (let i = 0; i < sources.length; i++) {
			const d = this.durations[i] || 0;
			if (t <= d || i === sources.length - 1) {
				return { index: i, offset: Math.max(0, Math.min(t, d || t)) };
			}
			t -= d;
		}
		return { index: 0, offset: 0 };
	};

	/* ---------- Events up to Blanks ---------- */

	emitTrackChange = (index) => {
		if (this.props.onTrackChange) this.props.onTrackChange(index);
	};

	emitStopped = () => {
		if (this.props.onStopped) this.props.onStopped(this.state.currentIndex);
	};

	/* ---------- Master control ---------- */

	toggleMasterPlay = () => {
		const audio = this.audioRef.current;
		const { playState } = this.state;

		if (playState === "paused") {
			audio.play();
			this.setState({
				playSequence: true,
				playState: "playing",
			});
			return;
		}

		if (playState === "stopped") {
			this.playItem(0, { playSequence: true });
			return;
		}

		audio.pause();
		this.setState({ playState: "paused" });
	};

	toggle = () => {
		const { playState } = this.state;
		const audio = this.audioRef.current;

		if (playState === "playing") {
			audio.pause();
			this.setState({ playState: "paused" });
		} else if (playState === "paused") {
			audio.play();
			this.setState({ playState: "playing" });
		} else {
			this.toggleMasterPlay();
		}
	};

	/* ---------- Public API (called by Blanks) ---------- */

	playItem = (index, opts = {}) => {
		const { sources = [] } = this.props;
		const src = sources[index];
		if (!src) return;

		const { playSequence = false, offset = 0 } = opts;

		const audio = this.audioRef.current;
		audio.src = src;
		audio.load();

		// If we can, start at an offset.
		// Wait for metadata before setting currentTime reliably.
		const start = () => {
			try {
				audio.currentTime = offset || 0;
			} catch (e) {
				// ignore
			}

			const shouldPlay = opts.autoplay !== false;
			if (shouldPlay) audio.play().catch(console.error);

			this.setState({
				clipTime: offset || 0,
				currentIndex: index,
				playSequence,
				playState: shouldPlay ? "playing" : "paused",
			});

			this.emitTrackChange(index);
		};

		if (Number.isFinite(audio.duration) && audio.duration > 0) {
			start();
		} else {
			audio.addEventListener("loadedmetadata", start, { once: true });
		}
	};

	// Seek in master timeline (overall sequence)
	seekMaster = (masterTime) => {
		const { playState, playSequence } = this.state;
		const { index, offset } = this.locateMasterTime(masterTime);

		const autoplay = playState === "playing";
		this.playItem(index, { playSequence, offset, autoplay });
	};

	setVolume = (volume) => {
		this.audioRef.current.volume = volume;
		this.setState({ volume });
	};

	/* ---------- Internal handlers ---------- */

	handleLoadedMetadata = () => {
		const audio = this.audioRef.current;
		const { currentIndex } = this.state;

		const d = Number.isFinite(audio.duration) ? audio.duration : 0;
		this.durations[currentIndex] = d;

		const masterDuration = this.computeMasterDuration();
		const masterTime = this.getMasterTime(currentIndex, audio.currentTime);

		this.setState({
			clipDuration: d,
			masterDuration,
			masterTime,
		});
	};

	handleTimeUpdate = () => {
		if (this.isScrubbing) return; // 🔴 critical
		const audio = this.audioRef.current;
		const { currentIndex } = this.state;

		const clipTime = audio.currentTime;
		const clipDuration = audio.duration || 0;

		// keep masterTime stable across boundaries
		const masterTime = this.getMasterTime(currentIndex, clipTime);
		const masterDuration = this.computeMasterDuration();

		this.setState({ clipTime, clipDuration, masterTime, masterDuration });

		if (this.props.onTimeUpdate) {
			this.props.onTimeUpdate(
				currentIndex,
				clipTime,
				clipDuration,
				masterTime,
				masterDuration
			);
		}
	};

	handleEnded = () => {
		const { pauseSeconds = 0, sources = [] } = this.props;
		const { currentIndex, playSequence } = this.state;

		if (!playSequence) {
			this.setState({ playState: "stopped" }, () => this.emitStopped());
			return;
		}

		const nextIndex = currentIndex + 1;

		if (nextIndex >= sources.length) {
			this.setState({ playState: "stopped" }, () => this.emitStopped());
			return;
		}

		setTimeout(() => {
			this.playItem(nextIndex, { playSequence: true });
		}, pauseSeconds * 1000);
	};

	/* ---------- Render ---------- */

	render() {
		const {
			masterTime,
			masterDuration,
			playState,
			volume,
		} = this.state;

		return (
			<div className="sequence-audio-controller"
				onMouseDown={(e) => e.stopPropagation()}
				onTouchStart={(e) => e.stopPropagation()}
			>
				<audio ref={this.audioRef} />

				<div className="controls">
					<button onClick={this.toggleMasterPlay}>
						{playState === 'playing' ?
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 20 20">
								<path d="M.682.003H7v19.994H.682ZM13 .003h6.318v19.994H13z" style={{ "fill": "currentColor" }} />
							</svg>
							:
							<svg
								width="16"
								height="16"
								viewBox="0 0 14 17"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12.8378 7.01827L2.19005 0.21473C1.32492 -0.337792 0 0.198383 0 1.56498V15.1688C0 16.3948 1.23114 17.1337 2.19005 16.519L12.8378 9.71877C13.7876 9.11394 13.7906 7.62311 12.8378 7.01827Z"
									fill="currentColor" />
							</svg>
						}					</button>

					{/* MASTER scrubber */}
					<input
						type="range"
						min="0"
						max={masterDuration || 0}
						step="0.01"
						value={
							this.state.scrubTime !== null
								? this.state.scrubTime
								: clipTime
						}

						onMouseDown={() => {
							this.isScrubbing = true;
							this.setState({ scrubTime: clipTime });
						}}

						onChange={(e) => {
							const time = parseFloat(e.target.value);
							this.audioRef.current.currentTime = time;
							this.setState({ scrubTime: time }); // local only
						}}

						onMouseUp={() => {
							this.isScrubbing = false;

							if (this.props.onTimeUpdate) {
								this.props.onTimeUpdate(
									this.state.currentIndex,
									this.audioRef.current.currentTime,
									this.audioRef.current.duration
								);
							}
						}}

					/>
					<svg
						width="24"
						height="24"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20.001 20"
					>
						<path className={`vol1`}
							d="M98.024 132.952h3.269v2.513h-3.269z"
							style={{"fill": "currentColor", "opacity": volume > 0.20 ? 1 : volume + 0.1}}
							transform="translate(-95.102 -119.3)" />
						<path className={`vol2`}
							d="M102.427 130.321h3.531v5.143h-3.531z"
							style={{ "fill": "currentColor", "opacity": volume > 0.40 ? 1 : volume + 0.1}}
							transform="translate(-95.102 -119.3)" />
						<path className={`vol2`}
							d="M107.025 127.282h3.4v8.182h-3.4z"
							style={{ "fill": "currentColor", "opacity": volume > 0.60 ? 1 : volume + 0.1}}
							transform="translate(-95.102 -119.3)" />
						<path className={`vol3`}
							d="M111.428 124.535h3.662v10.929h-3.662z"
							style={{"fill": "currentColor", "opacity": volume > 0.80 ? 1 : volume + 0.1}}
							transform="translate(-95.102 -119.3)" />
					</svg>
					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						value={volume}
						onChange={(e) => this.setVolume(parseFloat(e.target.value))}
					/>
				</div>
			</div>
		);
	}
}
