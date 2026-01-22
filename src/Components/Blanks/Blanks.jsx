import './Blanks.scss';
import {
	AudioClip,
	// ConcatenatedPlaylist,
	CircularAudioProgressAnimatedSpeakerDisplay,
	IconButton,
	Info,
	SequenceAudioController,
	Word,
} from '../../Components';
import {
	resolveAsset,
	shuffleArray
} from '../../utility';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DOMPurify from "dompurify";
import { Label } from "@/components/ui/label";
import { mouseRelativeTo } from '../../mouseUtility';
import React from 'react';
import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import Variables from '../../styles/variables.module';

export class Blanks extends React.Component {

	// Set of phrases with blanks and words to fill those blanks.
	// config is passed from the parent so that multiple exercises are possible.

	constructor(props) {

		super(props);

		// Grab some items from the DOM
		// this.congratulationsRef = React.createRef();
		this.placeholdersRef = React.createRef();
		this.sequenceRef = React.createRef();
		this.wordsContainerRef = React.createRef();
		const {
			config,
		} = props;
		const {
			answers,
			blanksType,
			id,
			items,
			pictures,
			questions,
		} = config;
		const {words = []} = config;
		let wordTiles = [];
		let nToPlace = 0;
		let mixer = [];
		switch (blanksType) {
			case 'phrases': {
				let wordTileIndex = 0;
				for (let i = 0; i < items.length; i++) {
					const item = items[i];
					const phraseSplit = item.text.match(/\[[^\]]+\]|\S+/g);
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
			case "pictures-answers": {
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
			}
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
		this.handleToggle = this.handleToggle.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.inLimits = this.inLimits.bind(this);
		this.pinTiles = this.pinTiles.bind(this);

		// NEW: handlers
		this.handleMasterTrackChange = this.handleMasterTrackChange.bind(this);
		this.handleMasterTime = this.handleMasterTime.bind(this);
		this.handleRowToggle = this.handleRowToggle.bind(this);

		this.state = ({
			...config,
			id: id,
			margin: 20,
			nToPlace: nToPlace,
			showHints: false,
			wordTiles: wordTiles,
			words: words,

			// NEW: playlist UI state
			activeRowIndex: -1, // which row is currently playing
			masterPlayState: "stopped",
			rowProgress: {}, // { [rowIndex]: { currentTime, duration } }
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
		// const { showHints = false } = this.state;
		// e.preventDefault();
		// e.stopPropagation();
		// const { showHints } = this.state;
		this.setState({ showHints: e.target.checked });
	};

	handleToggle = (value) => {
		this.setState({ showHints: value });
	};

	handleMasterStopped = (playlistIndex, playlist) => {
		const rowIndex = playlist[playlistIndex]?.rowIndex ?? -1;

		this.setState((prev) => ({
			activeRowIndex: -1,
			masterPlayState: "stopped",
			rowProgress: rowIndex >= 0 ? {
				...prev.rowProgress,
				[rowIndex]: {
					currentTime: 0,
					duration: prev.rowProgress[rowIndex]?.duration || 0
				},
			} : prev.rowProgress
		}));
	};

	handleMasterPlayStateChange = (playState, playlistIndex, playlist) => {
		// playState = "playing" | "paused" | "stopped"
		this.setState({ masterPlayState: playState });

		// optional: if stopped, clear activeRowIndex too (you may already do this via onStopped)
		// if (playState === "stopped") this.setState({ activeRowIndex: -1 });
	};


	handleMasterTrackChange(playlistIndex, playlist) {
		// playlistIndex is 0..playlist.length-1
		const rowIndex = playlist[playlistIndex]?.rowIndex ?? -1;
		this.setState({ activeRowIndex: rowIndex });
	}

	handleMasterTime(playlistIndex, currentTime, duration, playlist) {
		const rowIndex = playlist[playlistIndex]?.rowIndex;
		if (rowIndex === undefined) return;

		this.setState((prev) => ({
			rowProgress: {
				...prev.rowProgress,
				[rowIndex]: { currentTime, duration },
			},
		}));
	}

	handleMouseDown = (e) => {
		// console.log("handleMouseDown", e);
		// 1️⃣ Let UI controls behave normally
		if (this.isInteractiveElement(e.target)) {
			return;
		}

		// 2️⃣ Only left mouse button
		if (e.button && e.button !== 0) return;

		// 3️⃣ ONLY draggable word tiles can start a drag
		const draggableWord = e.target.closest(".word.draggable");
		if (!draggableWord) {
			return;
		}

		// 4️⃣ Now we know this is a valid tile drag
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
		if (this.isInteractiveElement(e.target)) {
			return;
		}

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

				if (this.inLimits().success) {
					this.movingPiece.classList.add('highlight');
					this.movingPiece.classList.add('success');
				}
				else if (this.inLimits().overTarget){
					this.movingPiece.classList.add('highlight');
					this.movingPiece.classList.remove('success');
				}
				else {
					this.movingPiece.classList.remove('highlight');
					this.movingPiece.classList.remove('success');
				}
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
			this.movingPiece.classList.remove('highlight');
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

	handleRowToggle(rowIndex, rowToPlaylistIndex) {
		const playlistIndex = rowToPlaylistIndex[rowIndex];
		if (playlistIndex === undefined) return;

		// If the user clicked the active row, toggle play/pause
		if (this.sequenceRef.current) {
			if (this.state.activeRowIndex === rowIndex) {
				this.sequenceRef.current.toggle(); // play/pause
			} else {
				// Start playing from that row
				this.sequenceRef.current.playItem(playlistIndex, { playSequence: false });
			}
		}
	}

	inLimits = () => {

		// Is the piece close to its target position? Enough to show hint highlight or snap it in?
		const {
			id,
			margin,
		} = this.state;
		// console.log("==========inLimits==========");

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
			const pieceMid = pieceLeft + (pieceRight - pieceLeft) / 2;
			if ((pieceMid >= targetLeft) && (pieceMid <= targetRight) && pieceTop >= targetTop - margin && pieceBottom <= targetBottom + margin) {
			// if ((pieceLeft >= targetLeft - margin) && (pieceRight <= targetRight + margin) && pieceTop >= targetTop - margin && pieceBottom <= targetBottom + margin) {
				return {
					overTarget: true,
					success: true,
					"targetLeft": targetLeft,
					"targetSpan": targetSpan,
					"targetTop": targetTop,
				};
			}
		}
		// console.log(`#${id} .target.${cl[0]}`);
		const targetWords = document.querySelectorAll(`#${id} .target.word`);
		// const targetSpans = document.querySelectorAll(`.target.${cl[0]} span`);
		// console.log("margin", margin);
		const pieceRect = this.movingPiece.getBoundingClientRect();
		const { left: pieceLeft, top: pieceTop, right: pieceRight, bottom: pieceBottom } = pieceRect;
		// console.log("piece", pieceLeft, pieceTop, pieceRight, pieceBottom);
		if (targetWords) {
			for (let i = 0; i < targetWords.length; i++){ // [...targetWords].forEach((targetWord) => {
				const targetWord = targetWords[i];

				const targetRect = targetWord.getBoundingClientRect();
				// console.log("targetRect", targetRect);
				const { left:targetLeft, top:targetTop, right:targetRight, bottom: targetBottom} = targetRect;
				// console.log("target", targetLeft, targetTop, targetRight, targetBottom);

				// console.log((pieceLeft >= targetLeft - margin), (pieceRight <= targetRight + margin), (pieceTop >= targetTop - margin), (pieceBottom <= targetBottom + margin));
				// Do it my middle of piece as some tiles/targets can be longer than other. See LO8 Ex5 for an example.
				const pieceMid = pieceLeft + (pieceRight - pieceLeft) / 2;
				if ((pieceMid >= targetLeft) && (pieceMid <= targetRight) && pieceTop >= targetTop - margin && pieceBottom <= targetBottom + margin) {
					// console.log("Boom");
					return {
						overTarget: true,
					};
				}
			};
		}
		return { success: false };
	};

	isInteractiveElement = (target) => {
		return (
			target.closest(".sequence-audio-controller") ||
			target.closest("input") ||
			target.closest("button") ||
			target.closest("select") ||
			target.closest("textarea")
		);
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
			// audio,
			blanksType = 'phrases',
			cheatText,
			complete = false,
			failCount,
			header = [],
			htmlContent,
			id = '',
			items,
			listenDescriptionText,
			nPlaced = 0,
			nToPlace,
			// phrases = [],
			pictures,
			questions,
			showHints,
			showHintsText,
			soundFile,
			soundFiles = [],
			words = [],
		} = this.state;
		const {
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

		const playlist = (items || [])
			.map((it, idx) => ({
				rowIndex: idx,
				src: it && it.audio ? resolveAsset(`${it.audio}`) : null,
			}))
			.filter(x => !!x.src); // only rows that actually have audio

		const rowToPlaylistIndex = {};
		playlist.forEach((p, pi) => { rowToPlaylistIndex[p.rowIndex] = pi; });


		// phrases, table or questions/answers?
		switch (blanksType) {
			case 'phrases': {
				for (let i = 0; i < items.length; i++) {
					const item = items[i];
					const isActive = this.state.activeRowIndex === i;
					const { masterPlayState } = this.state;

					const status = isActive ? (masterPlayState === "playing" ? "playing" : "stopped") : "stopped";

					const prog = this.state.rowProgress[i] || { currentTime: 0, duration: 0 };
					const phrase = [];
					const phraseSplit = item.text.match(/\[[^\]]+\]|\S+/g);
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
					// let soundFile;
					// if (item.audio) {
					// 	soundFile = resolveAsset(`${item.audio}`);
					// 	soundFiles.push(soundFile);
					// }
					phraseList.push(
						<li key={`phrase${i}`}>
							<div className='phrase'>
								{item.audio ? <CircularAudioProgressAnimatedSpeakerDisplay
									className={`super-compact-speaker`}
									status={status}
									progress={prog.currentTime}
									duration={prog.duration}
									handleClick={(e) => {
										e.preventDefault();
										e.stopPropagation();

										const pi = rowToPlaylistIndex[i];
										if (pi === undefined) return;

										// click on the active row => toggle
										if (isActive) {
											this.sequenceRef.current?.toggle();
										} else {
											// play this row
											this.sequenceRef.current?.playItem(pi, { playSequence: false });
										}
									}}
									title={isActive ? "Click to pause" : "Click to play"}
								/> : null}{phrase}</div> </li>
					);
				}
				// wordTiles = shuffleArray(wordTiles);
				break;
			}
			case "table": {
				const nRows = parseInt(words.length / 2) + words.length % 2;
				for (let i = 1; i <= nRows; i++) {
					const phrase = words[i - 1].replace(/ /g, '\u00a0');
					tableRows.push(
						<TableRow key={`${id}row${i}`}>
							<TableCell>{i}.</TableCell>
							<TableCell>
								<Word
									className={`blank target`}
									index={i - 1}
									key={`${id}word${i}`}>{phrase}</Word>
							</TableCell>
							{i <= words.length / 2 ?
								<>
									<TableCell>{i + nRows}.</TableCell>
									<TableCell>
										<Word
											className={`blank target`}
											index={i - 1 + nRows}
											key={`${id}word${i + nRows}`}>{words[i - 1 + nRows]}</Word>
									</TableCell>
								</>
								:
								null
							}
						</TableRow>
					);
				}
				break;
			}
			case "questions-answers": {
				for (let i = 1; i <= questions.length; i++) {
					const soundFile = resolveAsset(`${soundFiles[i - 1]}`);
					// soundFiles.push(soundFile);

					tableRows.push(
						<TableRow key={`${id}row${i}`}>
							<TableCell>
								<AudioClip
									className={`super-compact-speaker`}
									soundFile={soundFile}
								/>
							</TableCell>
							<TableCell>
								{questions[i - 1]}
							</TableCell>
							<TableCell>
								<Word
									className={`blank target`}
									index={i - 1}
									key={`${id}word${i}`}>{answers[i - 1]}</Word>
							</TableCell>
						</TableRow>
					);
				}
				break;
			}
			case "group-table": {
				if (header) {
					for(let i = 0; i < header.length; i++) {
						headerCells.push(<TableHead key={`${id}header${i}`}>{header[i]}</TableHead>);
					}
				}
				for (let i = 1; i <= answers.length; i++) {
					tableRows.push(
						<TableRow key={`${id}row${i}`}>
							<TableCell>
								<Word
									className={`blank target`}
									index={words.indexOf(answers[i - 1][0])}
									key={`${id}word${i}`}>{answers[i - 1][0]}</Word>
							</TableCell>
							<TableCell>
								<Word
									className={`blank target`}
									index={words.indexOf(answers[i - 1][1])}
									key={`${id}word${i}`}>{answers[i - 1][1]}</Word>
							</TableCell>
						</TableRow>
					);
				}
				break;
			}
			case "pictures-answers": {
				for (let i = 1; i <= pictures.length; i++) {
					const soundFile = resolveAsset(`${soundFiles[i - 1]}`);
					// soundFiles.push(soundFile);

					tableRows.push(
						<TableRow key={`${id}row${i}`}>
							<TableCell>
								<AudioClip
									className={`super-compact-speaker`}
									soundFile={soundFile}
								/>
							</TableCell>
							<TableCell>
								<img src={`${pictures[i - 1]}`}/>
							</TableCell>
							<TableCell>
								<Word
									className={`blank target`}
									index={i - 1}
									key={`${id}word${i}`}>{answers[i - 1]}</Word>
							</TableCell>
						</TableRow>
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
		console.log("playlist", playlist);
		console.log(blanksType, "listenDescriptionText", listenDescriptionText, "soundFile", soundFile);
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
				<Info className={`text`} id={`info-${id}`} informationText={informationText} informationTextHTML={informationTextHTML}/>
				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }} /> : null}

				{listenDescriptionText && soundFile ?
					<AudioClip
						id={`${id}Audio`}
						listenText={listenDescriptionText}
						soundFile={soundFile}
					/>
					:
					null
				}
				{/* {soundFiles.length > 0 && blanksType === 'phrases' ?
					<ConcatenatedPlaylist
						sources={soundFiles}
						pauseSeconds={0.5}
					/> : null} */}

				{blanksType === "phrases" && playlist.length > 0 ? (
					<SequenceAudioController
						ref={this.sequenceRef}
						sources={playlist.map(p => p.src)}
						pauseSeconds={0.5}

						onTrackChange={(playlistIndex) => this.handleMasterTrackChange(playlistIndex, playlist)}

						onTimeUpdate={(
							playlistIndex,
							clipTime,
							clipDuration,
							masterTime,
							masterDuration
						) =>
							this.handleMasterTime(
								playlistIndex,
								clipTime,
								clipDuration,
								playlist
							)
						}

						onPlayStateChange={(playState, playlistIndex) =>
							this.handleMasterPlayStateChange(playState, playlistIndex, playlist)
						}

						onStopped={(playlistIndex) => this.handleMasterStopped(playlistIndex, playlist)}
					/>
				) : null}

				<div
					className={`blanks ${showHints ? 'show-hints' : ''} ${blanksType} mb-8`}
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
							<Table>
								{header.length > 0 ?
									<TableHeader><TableRow>{headerCells}</TableRow></TableHeader> : null}
								<TableBody>
									{tableRows}
								</TableBody>
							</Table>
						}
					</div>
				</div>

				<p>{nPlaced} correct out of {nToPlace}</p>

				<div className='help'>
					{/* <label>{showHintsText}:&nbsp; */}
					{/* <div className={`flex items-center space-x-2`}> */}
					{/* <input name={`showHintsId-${id ? id : ''}`} type='checkbox' onClick={this.handleHints} checked={showHints} /> */}
					{/* <Label htmlFor={`showHintsId-${id ? id : ''}`} className={`cursor-pointer`}>
							<Switch id={`showHintsId-${id ? id : ''}`} onClick={this.handleHints} />
							{showHintsText}</Label> */}


					<Switch
						id={`showHintsId-${id ? id : ''}`}
						checked={showHints}
						onCheckedChange={this.handleToggle}
					/>
					<Label
						htmlFor={`showHintsId-${id ? id : ''}`}
						className="cursor-pointer"
					>
						{showHintsText}
					</Label>
					{/* </div> */}
					{/* </label> */}
					{/* <div className='mt-4 flex justify-start gap-2'> */}
					{/* <Button className={`hidden-help ${failCount >= 2 ? 'show' : ''}`} onClick={this.autoSolve}>{cheatText}</Button> */}
					<IconButton className={`hidden-help ${nPlaced >= 1 || failCount >= 2 || complete ? 'show' : ''}`} onClick={this.handleReset} theme={`reset`} >Reset</IconButton>
					<IconButton className={`hidden-help ${failCount >= 2 ? 'show' : ''}`} onClick={this.autoSolve} theme={`eye`}>{cheatText}</IconButton>
					{/* <Button className={`hidden-help ${nPlaced >= 1 || failCount >= 2 || complete ? 'show' : ''}`} onClick={this.handleReset}>Reset</Button> */}
					{/* </div> */}
				</div>
			</div>
		);
	};
}
