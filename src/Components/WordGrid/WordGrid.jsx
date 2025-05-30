import './WordGrid.scss';
import React, { PureComponent } from 'react';
import Colours from '../../styles/_colours.module.scss';
import {resolveAsset} from '../../utility';
import Variables from '../../styles/_variables.module.scss';

const directions = [
	{ x: 1, y: 0 }, // right
	{ x: 0, y: 1 }, // down
	{ x: 1, y: 1 }, // down-right
	{ x: 1, y: -1 }, // up-right
	{ x: 1, y: 1 }, // down-right (repeated to try to favour more diagonals)
	{ x: 1, y: -1 }, // up-right  "
];

// let lastDirection;

function createEmptyGrid(size) {
	return Array.from({ length: size }, () => Array(size).fill(''));
}

function canPlaceWord(grid, word, x, y, dir) {
	const size = grid.length;
	for (let i = 0; i < word.length; i++) {
		const nx = x + dir.x * i;
		const ny = y + dir.y * i;
		if (nx < 0 || ny < 0 || nx >= size || ny >= size) return false;
		const cell = grid[ny][nx];
		if (cell !== '' && cell !== word[i]) return false;
	}
	return true;
}

function placeWord(grid, word, solutionLines) {
	const size = grid.length;
	const attempts = 300;
	for (let i = 0; i < attempts; i++) {
		const dir = directions[Math.floor(Math.random() * directions.length)];
		// console.log(10, dir);
		// while (dir === lastDirection)dir = directions[Math.floor(Math.random() * directions.length)];
		// console.log(20, dir);
		// lastDirection = dir;
		const x = Math.floor(Math.random() * size);
		const y = Math.floor(Math.random() * size);
		// console.log(`canPlaceWord(grid, ${ word }, ${ x}, ${ y },dir)`);
		if (canPlaceWord(grid, word, x, y, dir)) {
			let nx, ny;
			for (let j = 0; j < word.length; j++) {
				nx = x + dir.x * j;
				ny = y + dir.y * j;
				grid[ny][nx] = word[j];
			}
			solutionLines.push({end: {col:nx, row:ny}, start: { col:x, row:y} });
			// console.log("success");
			return true;
		}
		// console.log("fail");
	}
	return false;
}

function fillEmpty(grid) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz'; // àâçéèêëîïôùûüÿœæ'; We could put these in config
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === '') {
				grid[y][x] = alphabet[Math.floor(Math.random() * alphabet.length)];
			}
		}
	}
}

function generateWordGrid(words, solutionLines, logError) {
	// Determine grid size: max word length + enough room
	const longestWord = Math.max(...words.map(w => w.length));
	let estimatedSize = Math.max(longestWord + 2, Math.ceil(Math.sqrt(words.join('').length * 2)));
	// console.log("estimatedSize", estimatedSize);

	let grid = createEmptyGrid(estimatedSize);
	let placedAll = false;
	for (let j = 0; j < 10 && placedAll === false; j++) {
		for (let i = 0; i < 100 && placedAll === false; i++) { // Try 100 times
			// console.log(i, "th attempt"); // eslint-disable-line
			placedAll = true;
			words.forEach(word => {
				const success = placeWord(grid, word.toLowerCase(), solutionLines);
				if (!success) {
				// console.warn(`Could not place: ${word}`);
					placedAll = false;
				}
			});
			if (placedAll) {
				// console.log("placed all! i", i); // eslint-disable-line
				break;
			}
		}
		if (placedAll) {
			// console.log("placed all! j", j); // eslint-disable-line
			break;
		}
		estimatedSize++;
		// console.log("estimatedSize", estimatedSize);
		grid = createEmptyGrid(estimatedSize);
	}
	if (!placedAll) {
		console.log("Could not place all words in word grid, please refresh.", {}); // eslint-disable-line
		logError("Could not place all words in word grid, please refresh.", {});
	}
	fillEmpty(grid);
	return grid;
}

export class WordGrid extends PureComponent {
	constructor(props) {
		super(props);
		const { config, logError } = props;
		const { words } = config;
		const soundFiles = words.map(w => w[2]);
		const foreignWords = words.map(w => w[0]);
		const localWords = words.map(w => w[1]);
		const solutionLines = new Array;
		const grid = generateWordGrid(foreignWords || [], solutionLines, logError);
		this.state = ({
			...props.config,
			failCount: 0,
			foreignWords: foreignWords,
			foundLines: [],
			foundWords: [],
			grid: grid,
			isTouching: false,
			line: null,
			lines: [],
			localWords:localWords,
			nPlaced: 0,
			nToSolve: words.length,
			selection: [],
			solutionLines: solutionLines,
			soundFiles: soundFiles,
			words: foreignWords,
		});
	}

	handleMouseDown = (e, row, col) => {
		if (e.button && e.button !== 0) return;
		this.setState({
			isTouching: true,
			line: null,
			selection: [{ row, col }], // eslint-disable-line
		});
	};

	handleMouseEnter = (e, row, col) => {
		const {
			lines,
			nPlaced,
			nToSolve,
			selection
		} = this.state;
		row = parseInt(row);
		col = parseInt(col);
		if (nPlaced === nToSolve) return;

		if (selection.length > 0) {
			const [start] = selection;
			const dx = col - start.col;
			const dy = row - start.row;

			// Check if the movement is a straight line (horizontal, vertical, or diagonal)
			const absDx = Math.abs(dx);
			const absDy = Math.abs(dy);
			const isStraight =
				(dx === 0 && dy !== 0) ||
				(dy === 0 && dx !== 0) ||
				(absDx === absDy);

			if (!isStraight) return;

			lines.push({ end: { row, col }, start }); // eslint-disable-line
			this.setState({
				line: { end: { row, col }, start }, // eslint-disable-line
				lines,
				selection: [start, { row, col }], // eslint-disable-line
			});
		}
	};

	handleMouseUp = () => {
		const {
			congratulationsText,
			line,
			foundLines,
			foundWords,
			grid,
			nToSolve,
			selection,
			soundFiles,
			words,
		} = this.state;
		let {
			failCount,
			nPlaced,
		} = this.state;
		const { showDialog } = this.props;
		if(nPlaced === nToSolve) return;
		const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
		// const correctAudio = new Audio(resolveAsset('/sounds/ting.mp3'));
		const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

		const positions = this.getLinearSelection(selection);
		let letters = positions.map(pos => grid[pos.row][pos.col]).join('');
		const reversed = letters.split('').reverse().join('');
		const found = (words.includes(letters) && !foundWords.includes(letters)) || (words.includes(reversed) && !foundWords.includes(reversed));
		if (words.includes(reversed) && !foundWords.includes(reversed))letters = reversed;
		if (found) {

			let index = words.indexOf(letters);
			if (index === -1) index = words.indexOf(reversed);
			const soundFile = new Audio(resolveAsset(`/${soundFiles[index]}`));

			nPlaced++;
			nPlaced = Math.min(words.length, nPlaced);

			if (nPlaced === nToSolve) {
				const { showDialog } = this.props;
				soundFile.onended = () => {
					tadaAudio.play();
					showDialog(congratulationsText);
				};
				soundFile.play();
				// tadaAudio.play();
			} else {
				soundFile.play();
				// correctAudio.play();
			}
			foundLines.push(line);
			this.setState(prev => ({
				foundLines: foundLines,
				foundWords: [...prev.foundWords, letters],
				isTouching: false,
				line: null,
				nPlaced: nPlaced,
				selection: [],
			}));
			// alert(`✅ Found: ${letters}`);
		} else if (foundWords.includes(letters)) {
			showDialog(`You already found: ${letters}`);
			this.setState({
				isTouching: false,
				line: null,
				selection: [],
			});
		} else {
			errorAudio.play();
			failCount++,
			failCount = Math.min(words.length, failCount);

			this.setState({
				failCount: failCount,
				isTouching: false,
				line: null,
				selection: [],
			});
			// alert(`❌ Not found: ${letters}`);
		}
	};

	handleHints = (e) => {
		// console.log("handleHints", e);
		this.setState({showHints: e.target.checked});
	};

	getLinearSelection = ([start, end]) => {
		if (!start || !end) return [];
		const dx = Math.sign(end.col - start.col);
		const dy = Math.sign(end.row - start.row);
		const length = Math.max(
			Math.abs(end.col - start.col),
			Math.abs(end.row - start.row)
		) + 1;
		const result = [];
		for (let i = 0; i < length; i++) {
			result.push({ col: start.col + i * dx, row: start.row + i * dy });
		}
		return result;
	};

	autoSolve = () => {
		// console.log("autosolve");
		this.setState({showSolution: true});
	};

	render() {
		const {
			cheatText,
			failCount,
			foreignWords,
			foundLines,
			foundWords,
			grid,
			htmlContent,
			id,
			instructionsText,
			line,
			localWords,
			nPlaced,
			nToSolve,
			showHints = false,
			showHintsText,
			solutionLines,
			showSolution = false,
			// words
		} = this.state;
		// console.log("lines", lines, "line", line);
		let cellDimension = 36;
		const media = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content');
		// console.log("media", media, media[1]);
		if (media[1] === 'S' || media[1] === 'M') cellDimension = 24;
		const renderedFoundLines = new Array();
		const { highlight } = Colours;
		const strokeWidth = cellDimension / 1.2;
		foundLines.forEach((l, index) => renderedFoundLines.push(
			<line
				key={`line${index}`}
				x1={l.start.col * cellDimension + cellDimension / 2}
				y1={l.start.row * cellDimension + cellDimension / 2}
				x2={l.end.col * cellDimension + cellDimension / 2}
				y2={l.end.row * cellDimension + cellDimension / 2}
				opacity={0.6}
				stroke={highlight}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
		));
		const renderedSolutionLines = new Array();
		if (showSolution) {
			solutionLines.forEach((l, index) => renderedSolutionLines.push(
				<line
					key={`line${index}`}
					x1={l.start.col * cellDimension + cellDimension / 2}
					y1={l.start.row * cellDimension + cellDimension / 2}
					x2={l.end.col * cellDimension + cellDimension / 2}
					y2={l.end.row * cellDimension + cellDimension / 2}
					stroke="rgba(255, 255, 0, 0.3)"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
				/>
			));
		}

		const foreignWordsRendered = new Array();
		const localWordsRendered = new Array();
		for (let i = 0; i < localWords.length; i++){
			if (foundWords.includes(foreignWords[i])) {
				foreignWordsRendered.push(<span key={`lw${i}`} className={`found`}>{foreignWords[i]}{i === foreignWords.length - 1 ? '' : ', '}</span>);
				localWordsRendered.push(<span key={`lw${i}`} className={`found`}>{localWords[i]}{i === localWords.length - 1 ? '' : ', '}</span>);
			} else {
				foreignWordsRendered.push(<span key={`lw${i}`}>{foreignWords[i]}{i === foreignWords.length - 1 ? '' : ', '}</span>);
				localWordsRendered.push(<span key={`lw${i}`}>{localWords[i]}{i === localWords.length - 1 ? '' : ', '}</span>);
			}
		}

		return (
			<div className="word-grid-container" id={id} key={id}>
				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
				<p className={`instructions`}>{instructionsText}</p>
				<p className={`word-list`}>{localWordsRendered}</p>

				<p className={`hidden-hints ${showHints ? 'show' : ''}`}>You're looking for these words:</p>
				<p className={`hidden-hints word-list ${showHints ? 'show' : ''}`} >{foreignWordsRendered}</p>


				<div className="word-grid-table-outer-container">
					<div className='help'>
						<label className={`hidden-help ${failCount >= 2 ? 'show' : ''}`}>{showHintsText}: <input type='checkbox' onChange={this.handleHints} /></label>
						<button className={`hidden-help ${failCount >= 2 ? 'show' : ''}`} disabled={nPlaced === this.nToSolve} onClick={this.autoSolve}>{cheatText}</button>&nbsp;
					</div>
					<div className={`table-top`}>
						<div className="word-grid-table-container"
							onMouseUp={this.handleMouseUp}
							onTouchEnd={this.handleMouseUp}
						>
							<svg
								width={grid.length * cellDimension}
								height={grid.length * cellDimension}
								style={{ left: 0, pointerEvents: 'none', position: 'absolute', top: 0 }}
							>
								{renderedFoundLines}
								{renderedSolutionLines}
								{line && (
									<line
										x1={line.start.col * cellDimension + cellDimension / 2}
										y1={line.start.row * cellDimension + cellDimension / 2}
										x2={line.end.col * cellDimension + cellDimension / 2}
										y2={line.end.row * cellDimension + cellDimension / 2}
										stroke="rgba(0, 120, 255, 0.5)"
										strokeWidth={strokeWidth}
										strokeLinecap="round"
									/>
								)}
							</svg>
							<table 								width={grid.length * cellDimension}
								height={grid.length * cellDimension}
								className='word-grid'>
								<tbody>
									{grid.map((row, rowIndex) => (
										<tr key={rowIndex}>
											{row.map((cell, colIndex) => (
												<td
													data-row={rowIndex}
													data-col={colIndex} key={colIndex}
													onMouseDown={(e) => this.handleMouseDown(e, rowIndex, colIndex)}
													onTouchStart={(e) => this.handleMouseDown(e, rowIndex, colIndex)}
													onMouseEnter={(e) => this.handleMouseEnter(e, rowIndex, colIndex)}
													onTouchMove={(e) => {
														const [touch] = e.touches;
														const el = document.elementFromPoint(
															touch.clientX,
															touch.clientY
														);
														if (el && el.closest('td')) {
															const td = el.closest('td');
															const row = td.getAttribute('data-row');
															const col = td.getAttribute('data-col');
															if (row !== null && col !== null) {
																this.handleMouseEnter(e, row, col);
															}
														}
													}}
												>
													{cell}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<p>{`${nPlaced} correct out of ${nToSolve}`}</p>
				</div>
			</div>
		);
	}
}
