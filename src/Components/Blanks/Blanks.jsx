import './Blanks.scss';
import {
	AudioClip,
	Word,
} from '../../Components';
import {
	resolveAsset,
	shuffleArray
} from '../../utility';
import {
	mouseRelativeTo,
} from '../../mouseUtility';
import React from 'react';
import Variables from '../../styles/_variables.module.scss';

export class Blanks extends React.PureComponent {

	// Set of phrases with blanks and words to fill those blanks.
	// config is passed from the parent so that multiple exercises are possible.

	constructor(props) {

		super(props);

		// Grab some items from the DOM
		// this.congratulationsRef = React.createRef();
		this.placeholdersRef = React.createRef();
		this.wordsContainerRef = React.createRef();
		const { config, id } = props;
		const { answers, questions, blanksType, words } = config;
		let wordTiles = new Array;
		let nToPlace = 0;
		switch (blanksType) {
			case 'phrases':
			case 'table':
				nToPlace = words.length;
				for (let i = 0; i < nToPlace; i++) {
					wordTiles.push(
						<Word
							className={`blank draggable`}
							index={i}
							key={`${id}word${i}`}>{words[i]}</Word>
					);
				}
				wordTiles = shuffleArray(wordTiles);
				break;
			case "questions-answers": {
				let mixer = new Array;
				nToPlace = questions.length;

				for (let i = 0; i < nToPlace; i++) {
					mixer.push([i, answers[i]]);
				}
				// Now randomise
				mixer = shuffleArray(mixer);
				for (let i = 0; i < nToPlace; i++) {
					wordTiles.push(
						<Word
							className={`blank draggable`}
							index={mixer[i][0]}
							key={`${id}word${i}`}>{mixer[i][1]}</Word>
					);
				}

				break;
			}
		}

		this.state = ({
			...config,
			margin: 20,
			nToPlace: nToPlace,
			wordTiles: wordTiles,
		});
	}

	autoSolve = () => {

		// User has had enough, solve it
		// console.log("autoSolve");
		const {
			// answers,
			// blanksType,
			id,
			wordTiles,
			// words,
		} = this.state;

		const newWordTiles = new Array;
		for (let i = 0; i < wordTiles.length; i++) {
			const wordTile = wordTiles[i];

			const { index } = wordTile.props;

			const targetTile = document.querySelector(`#${id} .word${index}.target`);

			const style = window.getComputedStyle(targetTile);
			let { marginLeft, marginTop } = style;
			marginLeft = parseInt(marginLeft);
			marginTop = parseInt(marginTop);
			const targetX = parseInt(targetTile.offsetLeft - marginLeft);
			const targetY = parseInt(targetTile.offsetTop - marginTop);

			newWordTiles.push(
				<Word
					className={`blank placed`}
					index={index}
					x={targetX}
					y={targetY}
					key={`${id}word${index}`} >{wordTile.props.children}</Word>
			);

		}
		this.setState({
			wordTiles: newWordTiles,
		});
	};

	handleHints = (e) => {
		// console.log("handleHints", e);
		this.setState({ showHints: e.target.checked });
	};

	handleMouseDown = (e) => {
		// console.log("handleMouseDown", e);
		if (e.button && e.button !== 0) return;
		e.preventDefault();
		e.stopPropagation();
		const {
			id,
			firstMouseDown = true,
		} = this.state;

		if (firstMouseDown) {
			// Convert all words to absolute position so they animate properly
			this.setState({ firstMouseDown: false });

			// Fix container size
			const { width, height } = window.getComputedStyle(this.wordsContainerRef.current);
			this.wordsContainerRef.current.style.width = width;
			this.wordsContainerRef.current.style.height = height;

			// draggable words (relatively positioned)
			const draggables = document.querySelectorAll(`#${id} .draggable`);
			const coords = new Array;
			for (let i = 0; i < draggables.length; i++) {
				const draggable = draggables[i];
				const style = window.getComputedStyle(draggable);
				coords.push({
					x: `${draggable.offsetLeft - parseInt(style.paddingLeft)}px`,
					y: `${draggable.offsetTop - parseInt(style.marginTop)}px`
				});
			}
			for (let i = 0; i < draggables.length; i++) {
				const draggable = draggables[i];
				draggable.style.left = coords[i].x;
				draggable.style.top = coords[i].y;
				draggable.style.position = `absolute`;
			}
		}

		if (e.target.classList.contains('word') && (e.target.classList.contains('draggable') || e.target.classList.contains('dragged'))) { // Not context menu (right mouse)
			this.movingPiece = e.target;
			const cl = this.movingPiece.classList;

			const startWord = document.querySelector(`#${id} .draggable.${cl[0]}`);

			if (startWord) {

				const swStyles = window.getComputedStyle(startWord);

				// Starting point in case we want to return it
				this.startX = parseInt(startWord.offsetLeft) - parseInt(swStyles.marginLeft);
				this.startY = parseInt(startWord.offsetTop) - parseInt(swStyles.marginTop);

				// Start the drag with a friendly offset
				let { height, marginLeft, marginTop, paddingLeft, paddingTop, width } = window.getComputedStyle(this.movingPiece);
				height = parseInt(height);
				marginLeft = parseInt(marginLeft);
				marginTop = parseInt(marginTop);
				paddingLeft = parseInt(paddingLeft);
				paddingTop = parseInt(paddingTop);
				width = parseInt(width);
				let { x: relMouseX, y: relMouseY } = mouseRelativeTo(e, '.blanks-container', 1);
				relMouseX -= width / 2 + marginLeft + paddingLeft;
				relMouseY -= height / 2 + marginTop + paddingTop;
				if (relMouseX && relMouseY) {
					this.movingPiece.style.left = `${relMouseX}px`;
					this.movingPiece.style.top = `${relMouseY}px`;
				}

				e.target.classList.add("dragging");
			}
		}
	};

	handleMouseMove = (e) => {
		// console.log("handleMouseMove",e)

		if (this.movingPiece && this.movingPiece.classList.contains("dragging")) {
			let { height, marginLeft, marginTop, paddingLeft, paddingTop, width } = window.getComputedStyle(this.movingPiece);
			height = parseInt(height);
			marginLeft = parseInt(marginLeft);
			marginTop = parseInt(marginTop);
			paddingLeft = parseInt(paddingLeft);
			paddingTop = parseInt(paddingTop);
			width = parseInt(width);
			let { x: relMouseX, y: relMouseY } = mouseRelativeTo(e, '.blanks-container', 1);
			relMouseX -= width / 2 + marginLeft + paddingLeft;
			relMouseY -= height / 2 + marginTop + paddingTop;

			// Drag via centre of word (not top left)
			if (relMouseX && relMouseY) {
				this.movingPiece.style.left = `${relMouseX}px`;
				this.movingPiece.style.top = `${relMouseY}px`;

				if (this.inLimits().success)
					this.movingPiece.classList.add('highlight');
				else
					this.movingPiece.classList.remove('highlight');
			}
		}
	};

	handleMouseUp = () => {
		// console.log("handleMouseUp", e)

		const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));
		const clickAudio = new Audio(resolveAsset('/sounds/click.mp3'));
		const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
		let {
			failCount = 0,
		} = this.state;

		// Check valid spot and valid set of tiles
		if (this.movingPiece) {
			this.movingPiece.classList.remove("dragging");

			const {
				congratulationsText,
				nToPlace,
				// questions,
				// words,
			} = this.state;
			let {
				nPlaced = 0,
			} = this.state;

			let targetX, targetY;
			const inLimitsResult = this.inLimits();
			if (inLimitsResult.success) {
				({ targetX, targetY } = inLimitsResult);
				// The eagle has landed
				this.movingPiece.classList.remove("draggable");
				this.movingPiece.classList.remove('highlight');
				clickAudio.play();

				this.movingPiece.style.left = `${targetX}px`;
				this.movingPiece.style.top = `${targetY}px`;
				this.movingPiece.classList.add("placed");
				nPlaced++;
				if (nPlaced === nToPlace) {

					// Last piece of the jigsaw placed
					const { showDialog } = this.props;
					showDialog(congratulationsText);
					tadaAudio.play();
					this.setState({
						complete: true,
					});
				}
				this.setState({
					nPlaced: nPlaced
				});
			} else {

				// Nowhere near!
				this.movingPiece.style.left = `${this.startX}px`;
				this.movingPiece.style.top = `${this.startY}px`;

				failCount++;
				this.setState({
					failCount: failCount
				});
				errorAudio.play();
			}
			this.movingPiece = undefined;
		}
	};

	inLimits = () => {

		// Is the piece close to its target position? Enough to show hint highlight or snap it in?
		const {
			id,
			margin,
		} = this.state;

		const cl = this.movingPiece.classList;
		const targetWord = document.querySelector(`#${id} .target.${cl[0]}`);
		let targetX, targetY;
		if (targetWord) {
			// targeting point in case we want to return it
			const style = window.getComputedStyle(targetWord);
			let { marginLeft, marginTop } = style;
			marginLeft = parseInt(marginLeft);
			marginTop = parseInt(marginTop);
			targetX = parseInt(targetWord.offsetLeft - marginLeft);
			targetY = parseInt(targetWord.offsetTop - marginTop);
		}

		let { left, top } = this.movingPiece.style;
		left = parseInt(left);
		top = parseInt(top);
		if (Math.abs(left - targetX) < margin && Math.abs(top - targetY) < margin) {
			return {
				success: true,
				"targetX": targetX,
				"targetY": targetY,
			};
		}
		return { success: false };
	};

	render = () => {
		const {
			answers,
			audio,
			blanksType = 'phrases',
			complete = false,
			cheatText,
			failCount,
			id = '',
			instructionsText,
			listenDescriptionText,
			showHints = false,
			showHintsText,
			phrases = [],
			questions,
			soundFile,
			soundFiles,
			words = [],
			wordTiles,
		} = this.state;
		const { logError } = this.props;

		const phraseList = new Array;
		const tableRows = new Array;

		// phrases, table or questions/answers?
		switch (blanksType) {
			case 'phrases': {
				const reg = /\]| /;
				for (let i = 0; i < phrases.length; i++) {
					const phraseSplit = phrases[i].split(reg);
					const phrase = new Array;
					for (let j = 0; j < phraseSplit.length; j++) {
						if (phraseSplit[j][0] === '[') {
							// span it as a target!
							// word${index} must be the first class
							const cleanedPhraseSplit = phraseSplit[j].replace('[', '').replace(']', '');

							// Find the corresponding placeholder to determine its correct index
							let foundIndex;
							for (let i = 0; i < words.length; i++) {
								if (words[i] === cleanedPhraseSplit) foundIndex = i;
							}
							phrase.push(<span
								className={`word${foundIndex} word blank target `}
								key={`phraseSpan${i}-${j}`}>{cleanedPhraseSplit} </span>);
						}else {
							phrase.push(<span className='word' key={`phraseSpan${i}-${j}`}>{phraseSplit[j]} </span>);
						}
					}

					const soundFile = resolveAsset(`/sounds/${audio[i]}`);
					phraseList.push(
						<li key={`phrase${i}`}><div className='phrase'>{phrase}</div> <AudioClip
							className={`compact`}
							soundFile={soundFile}
						/></li>
					);
				}
				break;
			}
			case "table": {
				const nRows = parseInt(words.length / 2) + words.length % 2;
				for (let i = 1; i <= nRows; i++)
					tableRows.push(
						<tr key={`${id}row${i}`}>
							<td>{i}.</td>
							<td>
								<Word
									className={`blank target`}
									index={i - 1}
									key={`${id}word${i}`}>{words[i - 1]}</Word>
							</td>
							{i < words.length / 2 ?
								<>
									<td>{i + nRows}.</td>
									<td>
										<Word
											className={`blank target`}
											index={i - 1 + nRows}
											key={`${id}word${i + nRows}`}>{words[i - 1 + nRows]}</Word>
									</td>
								</>
								:
								null
							}
						</tr>
					);
				break;
			}
			case "questions-answers": {
				for (let i = 1; i <= questions.length; i++) {
					const soundFile = resolveAsset(`/sounds/${soundFiles[i - 1]}`);
					tableRows.push(
						<tr key={`${id}row${i}`}>
							<td>
								{questions[i - 1]}
							</td>
							<td>
								<Word
									className={`blank target`}
									index={i - 1}
									key={`${id}word${i}`}>{answers[i - 1]}</Word>
							</td>
							<td>
								<AudioClip
									className={`compact`}
									soundFile={soundFile}
								/>
							</td>
						</tr>
					);
				}
				break;
			}
			default: {
				const action = "Not a valid type of Blanks";
				logError(action, {
					message: "Not a valid type of Blanks"
				});
			}
		}

		return (
			<div
				className={`blanks-container type-${blanksType} container ${complete ? 'complete' : ''}`}
				id={`${id ? id : ''}`}
				onMouseDown={this.handleMouseDown}
				onMouseMove={this.handleMouseMove}
				onMouseUp={this.handleMouseUp}
				onTouchStart={this.handleMouseDown}
				onTouchMove={this.handleMouseMove}
				onTouchEnd={this.handleMouseUp}
				key={`${id}Blanks`}
			>
				<p className={`instructions`}>{instructionsText}</p>

				{listenDescriptionText && soundFile ?
					<AudioClip
						listenText={listenDescriptionText}
						soundFile={soundFile}
					/>
					:
					null
				}

				<div className='help'>
					<label className={`hidden-help ${failCount >= 2 ? 'show' : ''}`}>{showHintsText}: <input type='checkbox' onChange={this.handleHints} /></label>
					<button className={`hidden-help ${failCount >= 2 ? 'show' : ''}`} onClick={this.autoSolve}>{cheatText}</button>&nbsp;
				</div>
				<div
					className={`blanks ${showHints ? 'show-hints' : ''}`}
					onMouseDown={this.handleMouseDown}
					onMouseMove={this.handleMouseMove}
					onMouseUp={this.handleMouseUp}
					onTouchStart={this.handleMouseDown}
					onTouchMove={this.handleMouseMove}
					onTouchEnd={this.handleMouseUp}
				>
					<div className={`words-container`} ref={this.wordsContainerRef}>
						{wordTiles}
					</div>
					<div
						className='target'
						onMouseDown={this.handleMouseDown}
						onMouseMove={this.handleMouseMove}
						onMouseUp={this.handleMouseUp}
						onTouchStart={this.handleMouseDown}
						onTouchMove={this.handleMouseMove}
						onTouchEnd={this.handleMouseUp}
					>
						{blanksType === 'phrases' ?
							<ul>
								{phraseList}
							</ul> :
							<table>
								<tbody>
									{tableRows}
								</tbody>
							</table>
						}
					</div>
				</div>
			</div>
		);
	};
}
