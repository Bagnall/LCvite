import './Blanks.scss';
import {
	AudioClip,
	CheckBox,
	IconButton,
	Info,
	Word,
} from '../../Components';
import {
	resolveAsset,
	shuffleArray
} from '../../utility';
import { Button } from "@/components/ui/button";
import {
	mouseRelativeTo,
} from '../../mouseUtility';
import React from 'react';
// import Variables from '../../styles/variables.module';

export class Blanks extends React.Component {

	// Set of phrases with blanks and words to fill those blanks.
	// config is passed from the parent so that multiple exercises are possible.

	constructor(props) {

		super(props);

		// Grab some items from the DOM
		// this.congratulationsRef = React.createRef();
		this.placeholdersRef = React.createRef();
		this.wordsContainerRef = React.createRef();
		const {
			config,
		} = props;
		const {
			answers,
			audio,
			blanksType,
			id,
			phrases,
			pictures,
			questions,
		} = config;
		// console.log("id", id);
		const {words = []} = config;
		let wordTiles = [];
		let nToPlace = 0;
		const phraseList = [];
		let mixer = [];
		switch (blanksType) {
			case 'phrases': {
				let wordTileIndex = 0;
				for (let i = 0; i < phrases.length; i++) {
					const phraseSplit = phrases[i].match(/\[[^\]]+\]|\S+/g);
					const phrase = [];
					for (let j = 0; j < phraseSplit.length; j++) {
						if (phraseSplit[j][0] === '[') {
							// span it as a target!
							const cleanedPhraseSplit = phraseSplit[j].replace('[', '').replace(']', '');
							// word${index} must be the first class (Done in Word component)
							wordTiles.push(
								<Word
									className={`blank draggable`}
									index={wordTileIndex}
									key={`${id}word${wordTileIndex + 1}`}>{cleanedPhraseSplit}</Word>
							);
							wordTileIndex++;

							words.push(cleanedPhraseSplit);
							nToPlace++;
						}
					}

					if (audio) {
						const soundFile = resolveAsset(`${audio[i]}`);
						phraseList.push(
							<li key={`phrase${i}`}><div className='phrase'>{phrase}</div> <AudioClip
								className={`compact inset`}
								soundFile={soundFile}
							/></li>
						);
					}
				}
				wordTiles = shuffleArray(wordTiles);
				break;
			}
			case 'group-table': {
				nToPlace = words.length;
				for (let i = 0; i < nToPlace; i++) {
					wordTiles.push(
						<Word
							className={`blank draggable visiblekey-${id}word${i}`}
							index={i}
							key={`${id}word${i}`}>{words[i]}</Word>
					);
				}
				wordTiles = shuffleArray(wordTiles);

				break;
			}
			case 'table':{
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
			}
			case "pictures-answers":
				nToPlace = pictures.length;

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

			case "questions-answers": {
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

		this.autoSolve = this.autoSolve.bind(this);
		this.handleHints = this.handleHints.bind(this);
		// this.handleChange = this.handleChange.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.inLimits = this.inLimits.bind(this);
		this.pinTiles = this.pinTiles.bind(this);

		this.state = ({
			...config,
			id: id,
			margin: 20,
			nToPlace: nToPlace,
			showHints: false,
			wordTiles: wordTiles,
			words: words,
		});
	}

	autoSolve = () => {

		// User has had enough, solve it
		// console.log("autoSolve");
		const {
			id,
			// wordTiles,
		} = this.state;

		// const newWordTiles = [];
		// for (let i = 0; i < wordTiles.length; i++) {
		// 	const wordTile = wordTiles[i];

		// 	const { index } = wordTile.props;

		// 	const targetTile = document.querySelector(`#${id} .word${index}.target`);

		// 	const style = window.getComputedStyle(targetTile);
		// 	let { marginLeft, marginTop } = style;
		// 	marginLeft = parseInt(marginLeft);
		// 	marginTop = parseInt(marginTop);
		// 	const targetX = parseInt(targetTile.offsetLeft - marginLeft);
		// 	const targetY = parseInt(targetTile.offsetTop - marginTop);

		// 	newWordTiles.push(
		// 		<Word
		// 			className={`blank placed`}
		// 			index={index}
		// 			x={targetX}
		// 			y={targetY}
		// 			key={`${id}word${index}`} >{wordTile.props.children}</Word>
		// 	);

		// }
		// this.setState({
		// 	wordTiles: newWordTiles,
		// });

		// console.log(`#${id} .word.target`);
		const objectTiles = document.querySelectorAll(`#${id} .word.draggable > span`);
		const targetTiles = document.querySelectorAll(`#${id} .word.target > span`);
		targetTiles.forEach((w) => { w.style.opacity = 1; });
		objectTiles.forEach((w) => { w.style.opacity = 0; });
	};

	handleHints = (e) => {
		// console.log("handleHints", e, e.target.checked);
		// e.preventDefault();
		e.stopPropagation();
		// const { showHints } = this.state;
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

			this.pinTiles();
		}
		let { target } = e;
		if (!target.classList.contains('draggable'))target = target.parentElement;
		if (target.classList.contains('word') && (target.classList.contains('draggable') || target.classList.contains('dragged'))) { // Not context menu (right mouse)
			this.movingPiece = target;
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

				target.classList.add("dragging");
			}
		}
	};

	handleMouseMove = (e) => {
		// console.log("handleMouseMove", this.movingPiece !== undefined);// , e);

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

	handleMouseUp = (e) => {
		// console.log("handleMouseUp", this.movingPiece !== undefined);
		e.stopPropagation();
		// const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));
		const clickAudio = new Audio(resolveAsset('/sounds/click.mp3'));
		// const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
		let {
			failCount = 0,
		} = this.state;

		// Check valid spot and valid set of tiles
		if (this.movingPiece !== undefined) {

			const {
				// congratulationsText,
				nToPlace,
			} = this.state;
			let {
				nPlaced = 0,
			} = this.state;

			let targetLeft, targetTop, targetSpan;
			const inLimitsResult = this.inLimits();
			if (inLimitsResult.success) {
				({ targetLeft, targetTop, targetSpan } = inLimitsResult);
				// The eagle has landed
				clickAudio.play();

				// if (this.movingPiece) {
				this.movingPiece.style.left = `${targetLeft}px`;
				this.movingPiece.style.top = `${targetTop}px`;
				this.movingPiece.style.opacity = `0`;
				// debugger;
				// console.log(target);
				// const _this = this;
				this.movingPiece.classList.remove("dragging");
				this.movingPiece.classList.add("placed");
				this.movingPiece.classList.remove("draggable");
				this.movingPiece.classList.remove('highlight');
				// console.log(10, "Removing movingPiece");
				this.movingPiece = undefined;
				// }
				// setTimeout(() => {
				targetSpan.style.opacity = 1;
				// }
				// , 1); // 000); // Corresponds to SCSS transition times
				nPlaced++;
				if (nPlaced === nToPlace) {

					// Last piece of the jigsaw placed
					// const { showDialog } = this.props;
					// showDialog(congratulationsText);
					// tadaAudio.play();
					this.setState({
						complete: true,
					});
				}
				this.setState({
					nPlaced: nPlaced
				});
			} else {
				this.movingPiece.classList.remove("dragging");

				// Nowhere near!
				this.movingPiece.style.left = `${this.startX}px`;
				this.movingPiece.style.top = `${this.startY}px`;

				failCount++;
				this.setState({
					failCount: failCount
				});
				// errorAudio.play();
				this.movingPiece = undefined;
			}
		}
	};

	handleReset = () => {

		// Set all tiles with class placed to remove that class
		const { id } = this.state;
		// console.log("RESET!", id);

		// Remove position absolute from tiles in the words-container
		let tiles = document.querySelectorAll(`#${id} .words-container .word`);
		tiles.forEach((tile) => {
			tile.classList.remove('placed');
			tile.classList.add('draggable');
			tile.style = [];
		});
		tiles = document.querySelectorAll(`#${id} .words-container .blank span`);
		tiles.forEach((tile) => {
			tile.style = [];
		});

		tiles = document.querySelectorAll(`#${id} .target-board .blank span`);
		tiles.forEach((tile) => {
		// tile.classList = ['word target'];
			tile.style.opacity = 0;
		// tile.style.top = '';
		});

		this.pinTiles();

		this.setState({
			failCount: 0,
			firstMouseDown: false,
			matched: [],
			nPlaced: 0,
		});
	};

	inLimits = () => {

		// Is the piece close to its target position? Enough to show hint highlight or snap it in?
		const {
			id,
			margin,
		} = this.state;

		const cl = this.movingPiece.classList;
		// console.log("id", id);
		const targetWord = document.querySelector(`#${id} .target.${cl[0]}`);
		const targetSpan = document.querySelector(`#${id} .target.${cl[0]} span`);
		if (targetWord) {
			// targeting point in case we want to return it
			const targetRect = targetWord.getBoundingClientRect();
			const { left:targetLeft, top:targetTop, right:targetRight, bottom: targetBottom} = targetRect;

			const pieceRect = this.movingPiece.getBoundingClientRect();
			const { left: pieceLeft, top: pieceTop, right: pieceRight, bottom: pieceBottom } = pieceRect;

			// console.log("pieceWidth", pieceWidth, "targetWidth", targetWidth);

			// console.log("pieceLeft", pieceLeft, "targetLeft", targetLeft, "pieceTop", pieceTop, "targetTop", targetTop, "pieceRight", pieceRight, "targetRight", targetRight, "pieceBottom", pieceBottom, "targetBottom", targetBottom, "margin", margin);
			if ((pieceLeft >= targetLeft - margin) && (pieceRight <= targetRight + margin) && pieceTop >= targetTop - margin && pieceBottom <= targetBottom + margin) {
				return {
					success: true,
					"targetLeft": targetLeft,
					"targetSpan": targetSpan,
					"targetTop": targetTop,
				};
			}
		}
		return { success: false };
	};

	pinTiles = () => {
		const { id } = this.state;
		// console.log("pinTiles id=", id);
		// draggable words (relatively positioned)
		const draggables = document.querySelectorAll(`#${id} .draggable`);
		const coords = [];
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
	};

	render = () => {
		const {
			answers,
			audio,
			blanksType = 'phrases',
			cheatText,
			complete = false,
			failCount,
			header = [],
			htmlContent,
			id = '',
			listenDescriptionText,
			nPlaced = 0,
			nToPlace,
			phrases = [],
			pictures,
			questions,
			showHints,
			showHintsText,
			soundFile,
			soundFiles,
			words = [],
		} = this.state;
		let {
			wordTiles,
		} = this.state;
		const {
			config,
			logError,
		} = this.props;
		const {
			informationText,
			informationTextHTML,
		} = config;
		const phraseList = [];
		const tableRows = [];
		const headerCells = [];

		// phrases, table or questions/answers?
		switch (blanksType) {
			case 'phrases': {
				// const reg = /\]| /;
				// const reg = /(?:(?<=\])|(?<!\[))\s+(?=\[|[^\]])/;
				// words = []; // render is called multiple times in dev env, so don't add to it twice!
				// wordTiles = []; // render is called multiple times in dev env, so don't add to it twice!
				// let wordTileIndex = 0;
				for (let i = 0; i < phrases.length; i++) {
					// const phraseSplit = phrases[i].split(reg);
					const phraseSplit = phrases[i].match(/\[[^\]]+\]|\S+/g);
					const phrase = [];
					for (let j = 0; j < phraseSplit.length; j++) {
						if (phraseSplit[j][0] === '[') {
							const cleanedPhraseSplit = phraseSplit[j].replace('[', '').replace(']', '');

							let foundIndex;
							for (let i = 0; i < words.length; i++) {
								if (words[i] === cleanedPhraseSplit) foundIndex = i;
							}
							phrase.push(<div
								className={`word${foundIndex} word blank target `}
								key={`phraseSpan${i}-${j}`}><span>{cleanedPhraseSplit}</span></div>);
						}else {
							phrase.push(<span className='word' key={`phraseSpan${i}-${j}`}>{phraseSplit[j]} </span>);
						}
					}
					let soundFile;
					if (audio) soundFile = resolveAsset(`${audio[i]}`);
					phraseList.push(
						<li key={`phrase${i}`}><div className='phrase'>{phrase}</div> {audio ? <AudioClip
							className={`compact inset`}
							soundFile={soundFile}
						/> : null}</li>
					);
				}
				wordTiles = shuffleArray(wordTiles);
				break;
			}
			case "table": {
				const nRows = parseInt(words.length / 2) + words.length % 2;
				for (let i = 1; i <= nRows; i++) {
					const phrase = words[i - 1].replace(/ /g, '\u00a0');
					tableRows.push(
						<tr key={`${id}row${i}`}>
							<td>{i}.</td>
							<td>
								<Word
									className={`blank target`}
									index={i - 1}
									key={`${id}word${i}`}>{phrase}</Word>
							</td>
							{i <= words.length / 2 ?
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
				}
				break;
			}
			case "questions-answers": {
				for (let i = 1; i <= questions.length; i++) {
					const soundFile = resolveAsset(`${soundFiles[i - 1]}`);
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
			case "group-table": {
				if (header) {
					for(let i = 0; i < header.length; i++) {
						headerCells.push(<th key={`${id}header${i}`}>{header[i]}</th>);
					}
				}
				for (let i = 1; i <= answers.length; i++) {
					tableRows.push(
						<tr key={`${id}row${i}`}>
							<td>
								<Word
									className={`blank target`}
									index={words.indexOf(answers[i - 1][0])}
									key={`${id}word${i}`}>{answers[i - 1][0]}</Word>
							</td>
							<td>
								<Word
									className={`blank target`}
									index={words.indexOf(answers[i - 1][1])}
									key={`${id}word${i}`}>{answers[i - 1][1]}</Word>
							</td>
						</tr>
					);
				}
				break;
			}
			case "pictures-answers": {
				for (let i = 1; i <= pictures.length; i++) {
					const soundFile = resolveAsset(`${soundFiles[i - 1]}`);
					tableRows.push(
						<tr key={`${id}row${i}`}>
							<td>
								<img src={`${pictures[i - 1]}`}/>
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
		// console.log("showHints", showHints, showHints.constructor, typeof showHints);

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
				{/* <Button className={`reset`} onClick={this.handleReset}>Reset</Button> */}
				<Info className={`text`} id={`info-${id}`} informationText={informationText} informationTextHTML={informationTextHTML}/>
				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}

				{listenDescriptionText && soundFile ?
					<AudioClip
						id={`${id}Audio`}
						listenText={listenDescriptionText}
						soundFile={soundFile}
					/>
					:
					null
				}

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
						className='target-board'
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
								{header.length > 0 ?
									<thead><tr>{headerCells}</tr></thead> : null}
								<tbody>
									{tableRows}
								</tbody>
							</table>
						}
					</div>
				</div>
				<div className='help'>
					<label>{showHintsText}:&nbsp;
						<input name={`showHintsId-${id ? id : ''}`} type='checkbox' onClick={this.handleHints} checked={showHints} /></label>
					{/* <Button className={`hidden-help w-full ${failCount >= 2 ? 'show' : ''}`} onClick={this.autoSolve}>{cheatText}</Button> */}
					<IconButton className={`hidden-help w-full ${failCount >= 2 ? 'show' : ''}`} onClick={this.autoSolve} theme={`eye`}>{cheatText}</IconButton>
					{/* <Button className={`hidden-help w-full ${nPlaced >= 1 || failCount >= 2 || complete ? 'show' : ''}`} onClick={this.handleReset}>Reset</Button> */}
					<IconButton className={`hidden-help w-full ${nPlaced >= 1 || failCount >= 2 || complete ? 'show' : ''}`} onClick={this.handleReset} theme={`reset`} >Reset</IconButton>
				</div>

				<p>{nPlaced} correct out of {nToPlace}</p>
			</div>
		);
	};
}
