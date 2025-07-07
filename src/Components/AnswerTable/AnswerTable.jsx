import './AnswerTable.scss';
import {
	AudioClip,
	Monologue,
} from '..';
import React from 'react';
import {
	resolveAsset,
} from '../../utility';

export class AnswerTable extends React.PureComponent {

	// Table of phrases with translatiopns column and sound files column.
	// config is passed from the parent so that multiple exercises are possible.

	constructor(props) {
		super(props);
		this.state = ({
			...props.config,
			nCorrect: 0,
		});
		this.countCorrect = this.countCorrect.bind(this);
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

	render = () => {
		const {
			header,
			htmlContent,
			id = [],
			instructionsText,
			instructionsTextHTML,
			nCorrect = 0,
			phrases,
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
				if (phrase[0] !== '') {
					cells.push(
						<td key={`row${i}cell0`}>
							{phrase[0]}
						</td>
					);
				}
				if (phrase[1] !== '') {
					const openIndex = phrase[1].indexOf('[');
					const closeIndex = phrase[1].indexOf(']');

					if (openIndex !== -1 && closeIndex !== -1 || closeIndex < openIndex) {
						const before = phrase[1].slice(0, openIndex);
						const between = phrase[1].slice(openIndex + 1, closeIndex);
						const after = phrase[1].slice(closeIndex + 1);
						cells.push(
							<td key={`row${i}cell1`}>
								<span className='inline-monologue'>{before ? before : null}<Monologue compact={true} id={`Monologue${i}`} content={between} countCorrect={this.countCorrect} />{after ? after : null}</span>
							</td>
						);
					} else {
						cells.push(
							<td key={`row${i}cell1`}>
								<Monologue compact={true} id={`Monologue${i}`} content={phrase[1]} countCorrect={this.countCorrect} />
							</td>
						);
					}
				}
				if (longestRow > 2) {
					const soundCellIndex = 2;
					const soundFile = resolveAsset(`${phrase[soundCellIndex]}`);
					cells.push(
						<td key={`row${i}cell${soundCellIndex}`}>
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

		return (
			<div
				className={`answer-table-container container`}
				id={`${id ? id : ''}`}
				key={`${id}PhraseTable`}
			>
				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
				{instructionsText ? <p className={`instructions`}>{instructionsText}</p> : null}
				{instructionsTextHTML ? <p className={`instructions`} dangerouslySetInnerHTML={{ __html: instructionsTextHTML }} /> : null}
				<table>
					{header ?
						<thead>
							<tr>
								{headerCells}
							</tr>
						</thead> : null}
					<tbody>
						{rows}
					</tbody>
				</table>
				<p>{nCorrect} correct out of {nPhrases}.</p>
			</div>
		);
	};
}
