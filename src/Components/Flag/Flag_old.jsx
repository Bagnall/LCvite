import './Flag.scss';
import React, { createRef, PureComponent } from 'react';

export class Flag extends PureComponent {
	constructor(props) {
		super(props);
		this.canvasRef = createRef();

		this.loadFlag = this.loadFlag.bind(this);
	}

	flagLoaded = false;

	componentDidMount = () => {
		this.loadFlag();
	};

	componentDidUpdate = () => {
		this.loadFlag();
	};

	loadFlag = () => {

		if (!this.flagLoaded) {
			// Set up canvas etc.
			const canvas = this.canvasRef.current;
			const ctx = canvas.getContext('2d');
			const DPR = window.devicePixelRatio || 1;
			const image = new Image();

			image.onload = () => {
				const { width } = image;
				const { height } = image;
				const amplitude = 8;

				// const shadowBuffer = this.props.shadow ? 10 : 0;
				// canvas.width = width * DPR + shadowBuffer;
				// canvas.height = (height + amplitude * 2 + shadowBuffer) * DPR;
				// canvas.style.width = `${width + shadowBuffer }px`;
				// canvas.style.height = `${height + amplitude * 2 + shadowBuffer}px`;
				// ctx.scale(DPR, DPR);

				const shadowBuffer = this.props.shadow ? 20 : 0;
				canvas.width = (width + shadowBuffer * 2) * DPR;
				canvas.height = (height + amplitude * 2 + shadowBuffer * 2) * DPR;
				canvas.style.width = `${width + shadowBuffer * 2}px`;
				canvas.style.height = `${height + amplitude * 2 + shadowBuffer * 2}px`;
				ctx.setTransform(DPR, 0, 0, DPR, shadowBuffer, shadowBuffer); // shifts drawing

				const offCanvas = document.createElement('canvas');
				offCanvas.width = width;
				offCanvas.height = height;
				const offCtx = offCanvas.getContext('2d');
				offCtx.drawImage(image, 0, 0);

				let time = 0;

				const draw = () => {
					const { fix, shadow: showDropShadow } = this.props;

					if (showDropShadow) {
						ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
						ctx.shadowBlur = 8;
						ctx.shadowOffsetX = 8;
						ctx.shadowOffsetY = 6;
					} else {
						ctx.shadowColor = 'transparent';
						ctx.shadowBlur = 0;
						ctx.shadowOffsetX = 0;
						ctx.shadowOffsetY = 0;
					}
					ctx.clearRect(-shadowBuffer, -shadowBuffer, width + shadowBuffer * 2, height + amplitude * 2 + shadowBuffer * 2);
					const modAmplitude = amplitude;
					let modHeight = height;
					for (let x = 0; x < width; x++) {
						let waveOffset;
						switch (fix) {
							case 'left':
								waveOffset = Math.sin(((x - time) * 0.05) - (time * 0.05)) * amplitude * x / width; // * x / width : fixes left edge
								break;
							case 'right':
								waveOffset = Math.sin(((x - time) * 0.05) - (time * 0.05)) * amplitude * (width - x) / width; // * x / width : fixes left edge
								break;
							case 'top':
								// This doesn't work yet
								waveOffset = 0; // Math.sin(((x - time) * 0.05)) * amplitude; // * x / width : fixes top edge
								modHeight = height + amplitude * Math.sin(((x - time) * 0.05)) - amplitude;
								break;
							default:
								waveOffset = Math.sin(((x - time) * 0.05) - (time * 0.05)) * amplitude;
						}

						// Light and shadow effect
						const light = Math.sin(((x - time) * 0.05 - (time * 0.05)) + Math.PI / 2) * 0.5 + 0.5; // 0 to 1
						ctx.globalAlpha = 1;
						ctx.drawImage(
							offCanvas,
							x, 0, 1, modHeight,
							x, waveOffset + modAmplitude, 1, modHeight
						);

						ctx.fillStyle = `rgba(255, 255, 255, ${0.15 * light})`;
						ctx.fillRect(x, waveOffset + modAmplitude, 1, modHeight);

						ctx.fillStyle = `rgba(0, 0, 0, ${0.1 * (1 - light)})`;
						ctx.fillRect(x, waveOffset + modAmplitude, 1, modHeight);
					}

					time += 0.5;
					requestAnimationFrame(draw);
				};

				draw();
			};

			image.src = this.props.flag;

			this.flagLoaded = true;
		}
	};

	render() {
		const { shadow } = this.props;
		return (
			<div className={`flag-container ${shadow ? 'shadow' : ''}`} >
				<canvas ref={this.canvasRef} style={{ display: 'block' }} />
			</div>
		);
	}
}
