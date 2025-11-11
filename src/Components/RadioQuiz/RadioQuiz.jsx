import './RadioQuiz.scss';
import {
	AudioClip,
	Button,
	Label,
	Monologue,
	Radio,
	RadioField,
	RadioGroup,
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
		// const answers = new Array();
		const { phrases } = props.config;
		const answers = Array.from({ length: phrases.length }, () => Array(2).fill(false));
		this.state = ({
			...props.config,
			answers: answers,
			disabled: [],
			nCorrect: 0,
			showExplanation: [],
		});
		this.handleChange = this.handleChange.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleChange = (e, rowNum, colNum) => {
		const {
			// id,
			onComplete = () => { },
			showDialog,
		} = this.props;
		const {
			answers,
			congratulationsText,
			disabled,
			phrases,
		} = this.state;
		if (disabled[rowNum]) return;
		let {
			nCorrect,
			showExplanation
		} = this.state;

		// console.log("handleChange", rowNum, colNum); // e.target.id);
		e.stopPropagation();
		const clickAudio = new Audio(resolveAsset('/sounds/click.mp3'));
		// const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));
		// const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));

		// console.log(colNum === phrases[rowNum][2], colNum);
		if (colNum === phrases[rowNum][1]) {
			clickAudio.play();
			if (!answers[rowNum]) answers[rowNum] = [];
			answers[rowNum][colNum] = true;
			nCorrect++;
			if (nCorrect === phrases.length) {
				// tadaAudio.play();
				showDialog(congratulationsText);
				onComplete();
			}
			disabled[rowNum] = true;
		// } else {
		// 	errorAudio.play();
		}
		// console.log("showExplanation", showExplanation, rowNum);
		showExplanation[rowNum] = true;
		// console.log("showExplanation", showExplanation);
		this.setState({
			answers: answers,
			disabled: disabled,
			nCorrect: nCorrect,
			showExplanation: showExplanation,
		});
	};

	handleReset = () => {
		// console.log("RESET!");
		const {
			id = [],
		} = this.state;

		const radios = document.querySelectorAll(`[id^="${id}"]`);
		for(let i = 0;i < radios.length;i++)
			radios[i].checked = false;

		this.setState({
			answers: [],
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
			answers,
			disabled,
			header,
			htmlContent,
			id = [],
			// instructionsText,
			// instructionsTextHTML,
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
			// const answerIndex = phrases[i][1];
			const explanation = phrases[i][2];
			const radios = [];
			for (let j = 0; j < options.length; j++) {
				radios.push(
					<label
						className={disabled[i] ? 'disabled' : ''}
						key={`label-${id}-${i}-${j}`}
						onClick={(e) => this.handleChange(e, i, j)}
						forhtml={`${id}-${i}-${j}`}>{options[j]}:&nbsp;
						<input
							checked={answers && answers[i] && answers[i][j] ? true : ''}
							disabled={disabled[i] === true}
							id={`${id}-${i}-${j}`}
							key={`input-${id}-${i}-${j}`}
							visible-key={`input-${id}-${i}-${j}`}
							name={`${id}-${i}`}
							type={`checkbox`}
							onChange={(e) => this.handleChange(e, i, j)}
						/>
					</label>
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
				<tr key={`radio-${id}-${i}`}>
					<td key={`radio-${id}-${i}-1`}><span className={`phrase`}>{phrase}</span>&nbsp;</td>
					<td key={`radio-${id}-${i}-2`}>{radios}</td>
					<td key={`radio-${id}-${i}-3`}>{sound}&nbsp;</td>
					<td key={`radio-${id}-${i}-4`}><span className={`explanation ${showExplanation[i] ? 'show' : ''}`}>{explanation}</span></td>
				</tr>
			);
		}
		// const value = 1;
		return (
			<div
				className={`radio-quiz-container container`}
				id={`${id ? id : ''}`}
				key={`${id}PhraseTable`}
			>
				<Button className={`reset btn`} onClick={this.handleReset}>Reset</Button>
				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}

				<table>
					<tbody>
						{rows}
					</tbody>
				</table>

				<p>{nCorrect} correct out of {nPhrases}.</p>
			</div>
		);
	};
}
