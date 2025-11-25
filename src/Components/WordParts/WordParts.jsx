import './WordParts.scss';
import {
	AudioClip,
	// Button,
	// Table,
	// TableBody,
	// td,
	// TableHead,
	// TableHeader,
	// TableRow
} from '..';
import { Button } from "@/components/ui/button";
import React from 'react';
import {resolveAsset} from '../../utility';

export class WordParts extends React.PureComponent {

	// Table of phrases with translatiopns column and sound files column.
	// config is passed from the parent so that multiple exercises are possible.

	constructor(props) {
		super(props);
		this.state = ({
			...props.config,
			failCount: 0,
		});

		this.autoSolve = this.autoSolve.bind(this);
		this.handlePartWordClick = this.handlePartWordClick.bind(this);
		this.handlePartWordError = this.handlePartWordError.bind(this);
		this.handleReset = this.handleReset.bind(this);

	}

	autoSolve = () => {
		// console.log("autoSolve");
		const {
			id = [],
			nPlaced = 0,
		} = this.state;

		if (nPlaced < this.nToSolve) {
			const targets = document.querySelectorAll(`#${id} span.target`);
			// const wofAudio = new Audio(resolveAsset('/sounds/wheel-of-fortune.mp3'));

			// wofAudio.play();

			for (let i = 0; i < targets.length; i++) {
				targets[i].classList.add('animate');
			}
			this.setState({
				complete: true,
				nPlaced: this.nToSolve
			});

		}
	};

	handlePartWordClick = (e) => {
		// const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

		// const wofAudio = new Audio(resolveAsset('/sounds/wheel-of-fortune.mp3'));
		// console.log("handlePartWordClick");
		// wofAudio.play();
		// const {
		// 	congratulationsText,
		// } = this.state;
		let {
			nPlaced = 0,
		} = this.state;
		if (e.target.classList.contains("animate") || e.target.classList.contains("error")) return;
		e.target.classList.add("animate");
		nPlaced++;
		if (nPlaced === this.nToSolve){

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
	};

	handlePartWordError = (e) => {
		// console.log("handlePartWordError");
		// const errorAudio = new Audio(resolveAsset('/sounds/error.mp3')); // error);
		let { failCount } = this.state;
		// errorAudio.play();
		e.target.classList.add("error");

		failCount++;
		this.setState({
			failCount: failCount
		});
	};

	handleReset = () => {
		// console.log("handleReset");
		const spans = document.querySelectorAll(".word-parts-container table span");
		spans.forEach((span) => {
			span.classList.remove('animate');
			span.classList.remove('error');
		});
		this.setState({
			complete: false,
			failCount: 0,
			nPlaced: 0,
		});
	};

	render = () => {
		const {
			audio,
			cheatText,
			complete = false,
			failCount = 0,
			htmlContent,
			id = [],
			// instructionsText,
			// instructionsTextHTML,
			nPlaced = 0,
			phrases,
			// showHintsText,
		} = this.state;

		const phraseList = new Array;
		let nToSolve = 0;

		const reg = /(\[.*?\])/;
		for (let i = 0; i < phrases.length; i++) {

			const phraseSplit = phrases[i].replace(/ /g, '\u00a0\u00a0').split(reg);
			const phrase = new Array;
			for (let j = 0; j < phraseSplit.length; j++) {

				if (phraseSplit[j][0] === '[') {
					// span it as a target!
					const cleanedPhraseSplit = phraseSplit[j].replace('[', '').replace(']', '');
					nToSolve++;
					phrase.push(<span className={`target`} onClick={this.handlePartWordClick} key={`${id}-phraseSpan${i}-${j}`}>{cleanedPhraseSplit}</span>);
				}
				else if(phraseSplit[j].length){
					phrase.push(<span onClick={this.handlePartWordError} key={`${id}-phraseSpan${i}-${j}`}>{phraseSplit[j]}</span>);
				}
			}

			phraseList.push(
				<p>{ phrase }</p>
			);
		}

		const rows = new Array();
		for (let i = 0; i < phrases.length; i++){
			const phrase = phrases[i];
			const cells = new Array();
			if (phrase[0] === '' && phrase.length === 1) {
				// blank row
				rows.push(
					<tr className={`spacer`} key={`row${i}`}>
						<td colSpan={3}></td>
					</tr>
				);
			} else {
				cells.push(
					<td key={`row${i}cell1`}>
						{phraseList[i]}
					</td>
				);
				const soundFile = resolveAsset(`${audio[i]}`);

				cells.push(
					<td key={`row${i}cell2`}>
						<AudioClip className={`compact`} soundFile={soundFile} />
					</td>
				);

				rows.push(
					<tr key={`row${i}`}>
						{cells}
					</tr>
				);
			}
		}
		this.nToSolve = nToSolve;
		return (
			<div
				className={`word-parts-container container`}
				id={`${id ? id : ''}`}
				key={`${id}WordParts`}
			>
				{/* <Button className={`reset`} onClick={this.handleReset}>Reset</Button> */}
				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
				{/* {instructionsText ? <p className={`instructions`}>{instructionsText}</p> : null}
				{instructionsTextHTML ? <p className={`instructions`} dangerouslySetInnerHTML={{ __html: instructionsTextHTML }} /> : null} */}


				<table>
					<tbody>
						{rows}
					</tbody>
				</table>

				<div className='help'>
					{/* <label className={`hidden-help ${failCount >= 2 ? 'show' : ''}`}>{showHintsText}: <input type='checkbox' onChange={this.handleHints} /></label> */}
					<Button className={`hidden-help w-full ${failCount >= 2 ? 'show' : ''}`} disabled={nPlaced === this.nToSolve} onClick={this.autoSolve}>{cheatText}</Button>
					<Button className={`hidden-help w-full ${nPlaced >= 1 || failCount >= 1 || complete ? 'show' : ''}`} onClick={this.handleReset}>Reset</Button>
				</div>

				<p>{`${nPlaced} correct out of ${nToSolve}`}</p>
			</div>
		);
	};
}
