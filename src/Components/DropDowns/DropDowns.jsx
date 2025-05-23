import './DropDowns.scss';
import { replaceSelectWithSpan, resolveAsset } from '../../utility';
import {
	AudioClip,
} from '..';
import React from 'react';

export class DropDowns extends React.PureComponent {

	// Table of phrases with dropdowns and sound files column.
	// config is passed from the parent so that multiple exercises are possible.

	constructor(props) {
		super(props);
		this.state = ({
			...props.config,
			failCount: 0,
			nPlaced: 0,
			nToSolve:0,
		});
	}

	handleSelectChange = (event, winner) => {
		const {
			congratulationsText,
		} = this.state;
		let {
			nPlaced,
		} = this.state;
		const { showDialog } = this.props;

		const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
		const correctAudio = new Audio(resolveAsset('/sounds/ting.mp3'));
		const { value } = event.target;
		const cl = event.target.classList;
		if (parseInt(value) === winner) {
			cl.add("correct");
			cl.remove("incorrect");
			replaceSelectWithSpan(event.target);
			nPlaced++;
			if (nPlaced === this.nToSolve) {
				const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

				showDialog(congratulationsText);
				tadaAudio.play();
			} else {
				correctAudio.play();
			}

			this.setState({ nPlaced: nPlaced });
		} else {
			cl.add("incorrect");
			cl.remove("correct");
			errorAudio.play();
		}
	};

	parseBracketedOptions = (str) => {

		const { id } = this.state;
		// const { nToSolve } = this.state;
		const regex = /\[([^\]]+)\]/g;
		const segments = [];
		let lastIndex = 0;
		let match;
		let index = 0;
		let nSelects = 0;

		while ((match = regex.exec(str)) !== null) {
			// Text before the current match
			if (match.index > lastIndex) {
				segments.push(str.slice(lastIndex, match.index));
			}

			// Parse options
			const options = match[1].split('|').map(opt => opt.trim());
			const winner = options.findIndex(opt => opt.startsWith('*'));
			const cleanOptions = options.map(opt => opt.startsWith('*') ? opt.substring(1) : opt);

			// Add a JSX select
			segments.push(
				<select id={`${id}select${index}`} key={`${id}select${index}`} onChange={(e) => this.handleSelectChange(e, winner)} ><option defaultValue>-</option>
					{cleanOptions.map((opt, i) => (
						<option key={i} value={i} className={`${i === winner ? 'hint' : ''}`}>{opt}</option>
					))}
				</select>
			);
			nSelects++;

			({ lastIndex } = regex);
			index++;
		}

		// Push any remaining text after the last match
		if (lastIndex < str.length) {
			segments.push(str.slice(lastIndex));
		}

		return {
			"jsx": (<p>{segments}</p>),
			"nSelects": nSelects,
		};
	};

	render = () => {
		const {
			audio,
			cheatText,
			failCount = 0,
			htmlContent = '',
			id = [],
			instructionsText,
			nPlaced = 0,
			phrases,
		} = this.state;

		const phraseList = new Array;
		let nToSolve = 0;

		for (let i = 0; i < phrases.length; i++) {
			const {nSelects, jsx} = this.parseBracketedOptions(phrases[i]);
			phraseList.push(jsx);
			nToSolve += nSelects;
		}

		const rows = new Array();
		for (let i = 0; i < phrases.length; i++){
			const phrase = phrases[i];
			const cells = new Array();
			if (phrase[0] === '') {
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

				if (audio && audio[i]) {
					const soundFile = resolveAsset(`${audio[i]}`);

					cells.push(
						<td key={`row${i}cell2`}>
							<AudioClip className={`compact`} label={""} soundFile={soundFile} />
						</td>
					);
				}

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
				className={`drop-downs-container container`}
				id={`${id ? id : ''}`}
				key={`${id}DropDowns]`}
			>

				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}

				<p className={`instructions`}>{instructionsText}</p>

				<div className='help'>
					{/* <label className={`hidden-help ${failCount >= 2 ? 'show' : ''}`}>{showHintsText}: <input type='checkbox' onChange={this.handleHints} /></label> */}
					<button className={`hidden-help ${failCount >= 2 ? 'show' : ''}`} onClick={this.autoSolve}>{cheatText}</button>&nbsp;
				</div>

				<table>
					<tbody>
						{rows}
					</tbody>
				</table>

				<p>{`${nPlaced} correct out of ${nToSolve}`}</p>
			</div>
		);
	};
}
