import './RadioTest.scss';
import {
	AudioClip,
	// Button,
	// Description,
	// Fieldset,
	// Label,
	// Legend,
	// Monologue,
	// Radio,
	// RadioField,
	// RadioGroup,
	// Text
} from '..';
import React from 'react';
// import {
// 	resolveAsset,
// } from '../../utility';
// import * as Headless from '@headlessui/react';

export class RadioTest extends React.Component {

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
		// this.countCorrect = this.countCorrect.bind(this);
		this.handleChange = this.handleChange.bind(this);
		// this.handleClick = this.handleClick.bind(this);
		// this.handleReset = this.handleReset.bind(this);
	}

	// nCorrect = 0;

	// countCorrect = () => {
	// 	// console.log("countCorrect");
	// 	const {
	// 		congratulationsText,
	// 		phrases,
	// 	} = this.state;
	// 	let {
	// 		nCorrect,
	// 	} = this.state;
	// 	// let newNCorrect = nCorrect;
	// 	const { showDialog } = this.props;
	// 	const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

	// 	nCorrect++;
	// 	if (nCorrect === phrases.length) {
	// 		tadaAudio.play();
	// 		showDialog(congratulationsText);
	// 	}
	// 	this.setState({
	// 		nCorrect: nCorrect,
	// 	});
	// };

	handleChange = (value) => {
		const {
			// id,
			showDialog,
		} = this.props;
		const {
			congratulationsText,
			disabled,
			phrases,
		} = this.state;
		const {
			nCorrect,
			showExplanation
		} = this.state;

		console.log("handleChange", value);// , e.target.id, e.target.value);
		this.setState({
			value: value
		});
		// 	const regex = /^([^-]+)-(\d+)-(\d+)$/;
		// 	const match = e.target.id.match(regex);
		// 	let rowNum, colNum;
		// 	if (match) {
		// 		// const prefix = match[1]; // "radio1"
		// 		rowNum = parseInt(match[2], 10); // 2
		// 		colNum = parseInt(match[3], 10); // 3
		// 		// console.log(prefix, rowNum, colNum);
		// 	} else {
		// 		return;
		// 	}
		// 	// const [rowNum, colNum] = e.target.id.match(/radio(\d+)-(\d+)-(\d+)/);
		// 	// console.log(rowNum, colNum);

		// 	e.stopPropagation();
		// 	const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));
		// 	const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));

	// 	// console.log(colNum === phrases[rowNum][2], colNum);
	// 	if (colNum === phrases[rowNum][1]) {
	// 		tadaAudio.play();
	// 		nCorrect++;
	// 		if (nCorrect === phrases.length) {
	// 			tadaAudio.play();
	// 			showDialog(congratulationsText);
	// 		}
	// 		disabled[rowNum] = true;
	// 	} else {
	// 		errorAudio.play();
	// 	}
	// 	showExplanation[rowNum] = true;
	// 	this.setState({
	// 		disabled: disabled,
	// 		nCorrect: nCorrect,
	// 		showExplanation: showExplanation,
	// 	});
	};

	// handleReset = () => {
	// 	// console.log("RESET!");

	// 	const radios = document.querySelectorAll('[id^="radio"]');
	// 	for(let i = 0;i < radios.length;i++)
	// 		radios[i].checked = false;

	// 	this.setState({
	// 		disabled: [],
	// 		nCorrect: 0,
	// 		showExplanation: [],
	// 	// 	matched: [],
	// 	// 	startTime: undefined,
	// 	// 	timeReport: '',
	// 	});
	// };
	// handleClick = (e) => {
	// 	console.log("handleClick", e, e.target.id);
	// 	// e.preventDefault();
	// 	e.stopPropagation();
	// };

	render = () => {
		const {
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
		// // const { id = '' } = config;
		// // const nPhrases = phrases.length;
		// let longestRow = 0;
		// // for (let i = 0; i < phrases.length; i++) {
		// // 	if (phrases[i].length > longestRow)longestRow = phrases[i].length;
		// // }
		// // console.log("longestRow", longestRow);
		// const headerCells = new Array;
		// if (header) {
		// 	for(let i = 0; i < header.length; i++) {
		// 		headerCells.push(<th key={`${id}header${i}`}>{header[i]}</th>);
		// 	}
		// }
		// const rows = new Array();
		// for (let i = 0; i < phrases.length; i++){
		// 	const phrase = phrases[i][0];
		// 	const answerIndex = phrases[i][1];
		// 	const explanation = phrases[i][2];
		// 	const radios = [];
		// 	for (let j = 0; j < options.length; j++) {
		// 		radios.push(
		// 			<Headless.Field>
		// 				<Headless.Label key={`label-${id}-${i}-${j}`} forhtml={`${id}-${i}-${j}`}>{options[j]}:
		// 					<Radio
		// 						disabled={disabled[i] === true}
		// 						// id={`${id}-${i}-${j}`}
		// 						key={`input-${id}-${i}-${j}`}
		// 						visible-key={`input-${id}-${i}-${j}`}
		// 						name={`${id}-${i}`}
		// 						type={`radio`}
		// 						onChange={this.handleChange}
		// 					/></Headless.Label>
		// 			</Headless.Field>
		// 		);
		// 	};
		// 	const sound = [];
		// 	if (phrases[i][3] !== '') {
		// 		// console.log("Got a sound file");
		// 		sound.push(
		// 			<AudioClip key={`radio-audio-${id}-${i}`} className={`super-compact`} soundFile={phrases[i][3]}/>
		// 		);
		// 	}
		// 	rows.push(
		// 		<li key={`radio-${id}-${i}`}><span className={`phrase`}>{phrase}</span>&nbsp;
		// 			<Headless.Fieldset>
		// 				<Headless.RadioGroup className={`flex gap-6 sm:gap-8`}>
		// 					{radios}
		// 				</Headless.RadioGroup>
		// 			</Headless.Fieldset>
		// 			{sound}&nbsp;<span className={`explanation ${showExplanation[i] ? 'show' : ''}`}>{explanation}</span></li>
		// 	);
		// }
		const { value } = this.state;

		return (
			<div
				className={`radio-test-container container`}
				id={`${id ? id : ''}`}
				key={`${id}PhraseTable`}
			>
				<RadioGroup
					className={`flex gap-6`}
					value={`greeting`}
					onChange={this.handleChange}
				>
					<RadioField>
						<Label className="inline-flex items-center gap-2 cursor-pointer">Checked:&nbsp;</Label><Radio value="greeting" />
					</RadioField>
					<RadioField>
						<Label className="inline-flex items-center gap-2 cursor-pointer">disabled:&nbsp;</Label><Radio value="goodbye" disabled/>
					</RadioField>
				</RadioGroup>
				{/* <RadioGroup
					className={`flex gap-6`}
					value={value}
					onChange={this.handleChange}
				>
					<RadioField>
						<Label className="inline-flex items-center gap-2 cursor-pointer">Greeting:&nbsp;</Label><Radio value="greeting" />
					</RadioField>
					<RadioField>
						<Label className="inline-flex items-center gap-2 cursor-pointer">Goodbye:&nbsp;</Label><Radio value="goodbye" checked disabled/>
					</RadioField>
				</RadioGroup> */}
				<RadioGroup
					className={`flex gap-6`}
					value={`goodbye`}
					onChange={this.handleChange}
				>
					<RadioField>
						<Label className="inline-flex items-center gap-2 cursor-pointer">Greeting:&nbsp;</Label><Radio value="greeting" />
					</RadioField>
					<RadioField>
						<Label className="inline-flex items-center gap-2 cursor-pointer">Goodbye:&nbsp;</Label><Radio value="goodbye" disabled/>
					</RadioField>
				</RadioGroup>
				<RadioGroup
					className={`flex gap-6`}
					value={value}
					onChange={this.handleChange}
				>
					<RadioField>
						<Label className="inline-flex items-center gap-2 cursor-pointer">Greeting:&nbsp;</Label><Radio value="greeting" />
					</RadioField>
					<RadioField>
						<Label className="inline-flex items-center gap-2 cursor-pointer">Goodbye:&nbsp;</Label><Radio value="goodbye" disabled/>
					</RadioField>
				</RadioGroup>
				<table style={{ width: '400px' }}>
					<tbody>
						<tr>
							<td>
								<label>Greeting:&nbsp;
									<input
										type='radio'
										onChange={this.handleChange}
										value="greeting"
									/>
								</label>
							</td>
							<td>
								<label>Goodbye:&nbsp;
									<input
										type='radio'
										onChange={this.handleChange}
										value="goodbye"
									/>
								</label>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};
}
