import './RadioQuiz.scss';
import {
	AudioClip,
	Button,
	// Monologue,
	// Radio,
	// RadioGroup,
	Table,
	TableBody,
	TableCell,
	TableRow
} from '..';
import React from 'react';
import {
	resolveAsset,
} from '../../utility';

export class RadioQuiz extends React.Component {

	// Table of phrases with translatiopns column and sound files column.
	// config is passed from the parent so that multiple exercises are possible.

	constructor(props) {
		super(props);
		this.state = ({
			...props.config,
			disabled: [],
			nCorrect: 0,
			showExplanation: [],
		});
		this.countCorrect = this.countCorrect.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	// nCorrect = 0;

	countCorrect = () => {
		// console.log("countCorrect");
		const {
			congratulationsText,
			phrases,
		} = this.state;
		let {
			nCorrect,
		} = this.state;
		// let newNCorrect = nCorrect;
		const { showDialog } = this.props;
		const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

		nCorrect++;
		if (nCorrect === phrases.length) {
			tadaAudio.play();
			showDialog(congratulationsText);
		}
		this.setState({
			nCorrect: nCorrect,
		});
	};

	handleChange = (e) => {
		const {
			// id,
			showDialog,
		} = this.props;
		const {
			congratulationsText,
			disabled,
			phrases,
		} = this.state;
		let {
			nCorrect,
			showExplanation
		} = this.state;

		// console.log("handleChange", e.target.id);
		const regex = /^([^-]+)-(\d+)-(\d+)$/;
		const match = e.target.id.match(regex);
		let rowNum, colNum;
		if (match) {
			// const prefix = match[1]; // "radio1"
			rowNum = parseInt(match[2], 10); // 2
			colNum = parseInt(match[3], 10); // 3
			// console.log(prefix, rowNum, colNum);
		} else {
			return;
		}
		// const [rowNum, colNum] = e.target.id.match(/radio(\d+)-(\d+)-(\d+)/);
		// console.log(rowNum, colNum);

		e.stopPropagation();
		const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));
		const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));

		// console.log(colNum === phrases[rowNum][2], colNum);
		if (colNum === phrases[rowNum][1]) {
			tadaAudio.play();
			nCorrect++;
			if (nCorrect === phrases.length) {
				tadaAudio.play();
				showDialog(congratulationsText);
			}
			disabled[rowNum] = true;
		} else {
			errorAudio.play();
		}
		showExplanation[rowNum] = true;
		this.setState({
			disabled: disabled,
			nCorrect: nCorrect,
			showExplanation: showExplanation,
		});
	};

	handleReset = () => {
		// console.log("RESET!");

		const radios = document.querySelectorAll('[id^="radio"]');
		for(let i = 0;i < radios.length;i++)
			radios[i].checked = false;

		this.setState({
			disabled: [],
			nCorrect: 0,
			showExplanation: [],
		// 	matched: [],
		// 	startTime: undefined,
		// 	timeReport: '',
		});
	};

	render = () => {
		const {
			disabled,
			header,
			htmlContent,
			id = [],
			instructionsText,
			instructionsTextHTML,
			nCorrect = 0,
			options,
			phrases,
			showExplanation = [],
		} = this.state;
		// const { id = '' } = config;
		const nPhrases = phrases.length;
		let longestRow = 0;
		for (let i = 0; i < phrases.length; i++) {
			if (phrases[i].length > longestRow)longestRow = phrases[i].length;
		}
		// console.log("longestRow", longestRow);
		const headerCells = new Array;
		if (header) {
			for(let i = 0; i < header.length; i++) {
				headerCells.push(<th key={`${id}header${i}`}>{header[i]}</th>);
			}
		}
		const rows = new Array();
		for (let i = 0; i < phrases.length; i++){
			const phrase = phrases[i][0];
			const answerIndex = phrases[i][1];
			const explanation = phrases[i][2];
			const radios = [];
			for (let j = 0; j < options.length; j++) {
				radios.push(
					<label key={`label-${id}-${i}-${j}`} forhtml={`${id}-${i}-${j}`}>{options[j]}:
						<input
							disabled={disabled[i] === true}
							id={`${id}-${i}-${j}`}
							key={`input-${id}-${i}-${j}`}
							visible-key={`input-${id}-${i}-${j}`}
							name={`${id}-${i}`}
							type={`radio`}
							onChange={this.handleChange}
						/></label>
				);
			};
			const sound = [];
			if (phrases[i][3] !== '') {
				// console.log("Got a sound file");
				sound.push(
					<AudioClip key={`radio-audio-${id}-${i}`} className={`super-compact`} soundFile={phrases[i][3]}/>
				);
			}
			rows.push(
				<TableRow key={`radio-${id}-${i}`}>
					<TableCell key={`radio-${id}-${i}-1`}><span className={`phrase`}>{phrase}</span>&nbsp;</TableCell>
					<TableCell key={`radio-${id}-${i}-2`}>{radios}</TableCell>
					<TableCell key={`radio-${id}-${i}-3`}>{sound}&nbsp;</TableCell>
					<TableCell key={`radio-${id}-${i}-4`}><span className={`explanation ${showExplanation[i] ? 'show' : ''}`}>{explanation}</span></TableCell>
				</TableRow>
			);
		}

		return (
			<div
				className={`radio-quiz-container container`}
				id={`${id ? id : ''}`}
				key={`${id}PhraseTable`}
			>
				<Button className={`reset`} onClick={this.handleReset}>Reset</Button>
				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
				{instructionsText ? <p className={`instructions`}>{instructionsText}</p> : null}
				{instructionsTextHTML ? <p className={`instructions`} dangerouslySetInnerHTML={{ __html: instructionsTextHTML }} /> : null}

				<Table>
					<TableBody>
						{rows}
					</TableBody>
				</Table>

				<p>{nCorrect} correct out of {nPhrases}.</p>
			</div>
		);
	};
}
