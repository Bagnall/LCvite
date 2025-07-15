import './ConnectFour.scss';
import React, { PureComponent } from 'react';
import { copyObject } from '../../utility.js';

const boardWidth = 4;
const boardHeight = 4;
const yellow = 1; // player
const red = 2;
const root = {
	"board": [
		[0, 0, 0, 0], // , 0], // , 0, 0],
		[0, 0, 0, 0], // , 0], // , 0, 0],
		[0, 0, 0, 0], // , 0], // , 0, 0],
		[0, 0, 0, 0], // , 0], // , 0, 0],
		// [0, 0, 0, 0, 0], // , 0, 0],
		// [0, 0, 0, 0], // , 0], // , 0, 0],
		// [0, 0, 0, 0], // , 0], // , 0, 0],
		// [0, 0, 0, 0], // , 0], // , 0, 0],
		// [0, 0, 0, 0, 0,//, 0, 0],
		// [0, 0, 0, 0, 0,//, 0, 0],
	],
	"children": []
};

const testWin = {
	"board":[[1, 1, 1, 1], // , 0], // , 0, 0],
		[2, 0, 2, 0], // , 0], // , 0, 0],
		[2, 0, 0, 0], // , 0], // , 0, 0],
		[0, 0, 0, 0], // , 0], // , 0, 0],
	],
	"children": []
};
let gameTree;
let nBoards = 0;

const add = (move, column, colour) => {
	// console.log("add", move, column);
	let addRow = 0;
	const moveCopy = copyObject(move);
	while (addRow <= boardHeight) {
		if (isEmpty(moveCopy, addRow, column)) {
			moveCopy.board[addRow][column] = colour;
			// move.children[column] = childBoard;
			// printMove(moveCopy);
			return moveCopy;
		}
		addRow++;
	}
};

const isEmpty = (move, row, column) => {
	if (row < boardHeight && column < boardWidth) {
		if (move.board && move.board[row][column] === 0) return true;
		return false;
	}
};

const growBoard = (depth, board) => {
	// Grow the game board recursively
	console.log("growBoard", depth, win(board));
	// printMove(board);
	// if (depth >= boardHeight) return;
	if(win(board)) return 1;
	let player = red;
	if (depth % 2 === 0) player = yellow;
	const boardCopy = copyObject(board);
	boardCopy.depth = depth;
	const score = 0;
	for (let i = 0; i < boardWidth; i++){
		// const child = copyObject(root);
		boardCopy.children[i] = add(boardCopy, i, player);
		if (boardCopy.children[i])printMove(boardCopy.children[i], `child [${i}]`);
		if (boardCopy.children[i])boardCopy.children[i].score += growBoard(depth + 1, boardCopy.children[i]);
	}
	return score; // boardCopy;
};

const win = (move) => {
	console.log("win", move);
	if (move !== undefined) {
		const { board } = move;
		// printMove(move, `win`);
		for (let i = 0; i < boardHeight; i++) {
			for (let j = 0; j < boardWidth; j++) {
				// console.log("win", board, `i = ${i}, j = ${j}`);
				// console.log(`i = ${i}, j = ${j}`, board);
				const boardIJ = board[i][j];
				let won = false;
				if (boardIJ !== 0 && i <= boardHeight - 4 && (boardIJ === board[i + 1][j] && boardIJ === board[i + 2][j] && boardIJ === board[i + 3][j])) {
					won = true; // vertical
				}
				if (boardIJ !== 0 && j <= boardWidth - 4 && (boardIJ === board[i][j + 1] && boardIJ === board[i][j + 2] && boardIJ === board[i][j + 3])) {
					won = true; // horizontal
				}
				if (boardIJ !== 0 && i <= boardHeight - 4 && j <= boardWidth - 4 && (boardIJ === board[i + 1][j + 1] && boardIJ === board[i + 1][j + 2] && boardIJ === board[i + 1][j + 3])) {
					won = true; // diagonal (lower left to upper right)
				}
				if (boardIJ !== 0 && i <= boardHeight - 4 && j <= boardWidth - 4 && (boardIJ === board[i + 1][j + 2] && boardIJ === board[i + 1][j + 1] && boardIJ === board[i + 1][j])) {
					won = true; // diagonal (upper left to lower right)
				}
				if (won) {
					console.log("**********WIN!**********");
					printMove(move);
					return true;
				}
			}
		}
	}
	return false;
};

const generateGameTree = () => {
	// if (gameTree) return;
	console.log("generateGameTree");
	return growBoard(0, root);

	// const rootCopy = copyObject(root);
	// for (let i = 0; i < boardWidth; i++){
	// 	// const child = copyObject(root);
	// 	root.children[i] = add(rootCopy, i, yellow);
	// 	// printMove(root.children[i]);
	// }
	// return root;
};

const printMove = (move, comment) => {
	console.log(`nBoards = ${nBoards} depth:${move.depth} ${comment}`);
	if (move) {
		const { board } = move;
		// if (win(move)) console.log("**********WIN!**********");
		for (let i = boardHeight - 1; i >= 0; i--) {
			let strRow = `${i}:`;
			for (let j = 0; j < boardWidth; j++) {
				let counter = ' ';
				if (board[i][j] === 1) counter = '*';
				if (board[i][j] === 2) counter = 'o';
				strRow += `[${counter}]`;
				// strRow += `[${board[i][j]}]`;
			}
			console.log(strRow);
		}
		nBoards++;
	}
};

export class ConnectFour extends PureComponent {
	constructor(props) {
		super(props);
		// debugger;
		const { config } = this.props;
		console.log("win(testWin)", win(testWin));
		debugger;
		if (!gameTree || !gameTree.board) gameTree = generateGameTree();
		console.log("Done!");

		// debugger;
		// debugger;
		// const { grid, placements } = generateSimpleCrossword(this.wordPairs);
		this.state = ({
			gameTree: gameTree,
			// gameTreeInitialised: true;
			// selected: null,
			// activeClueIndex: null,
			// grid,
			// placements,
			// filled: createEmptyGrid(grid.length),
			...config
		});
	}

	componentDidMount = () => {
		console.log("componentDidMount");
		// if (!gameTree || !gameTree.board)gameTree = generateGameTree();
		console.log("DONE!");
	};


	render = () => {
		const {
			gameTree,
			htmlContent,
			instructionsText,
			instructionsTextHTML,
		} = this.state;

		return (
			<div>
				<div className={`connect-four-container`}>
					<h1>Connect Four</h1>
					<div className={`instructions`}>
						{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
						{instructionsText ? <p className={`instructions`}>{instructionsText}</p> : null}
						{instructionsTextHTML ? <p className={`instructions`} dangerouslySetInnerHTML={{ __html: instructionsTextHTML }} /> : null}
					</div>
					<table className={`board`} style={{ borderCollapse: 'collapse' }}>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
