import './AnswerTable.scss';
import {
	AudioClip,
	Monologue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
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
				headerCells.push(<TableHeader>{header[i]}</TableHeader>);
			}
		}
		const rows = new Array();
		for (let i = 0; i < phrases.length; i++){
			const phrase = phrases[i];
			const cells = new Array();
			if (phrase[0] === '' && phrase.length === 1) {
				// blank row
				rows.push(
					<TableRow className={`spacer`} key={`row${i}`}>
						<TableCell colSpan={longestRow} key={`cell-of-row-${i}`}></TableCell>
					</TableRow>
				);
			} else {
				if (phrase[0] !== '') {
					cells.push(
						<TableCell key={`row${i}cell0`}>
							{phrase[0]}
						</TableCell>
					);
				}
				if (phrase[1] !== '') {
					// const openIndex = phrase[1].indexOf('[');
					// const closeIndex = phrase[1].indexOf(']');

					const parts = [];
					const regex = /\[([^\]]+)\]/g;
					let lastIndex = 0;
					let match;
					let monologueIndex = 0;
					while ((match = regex.exec(phrase[1])) !== null) {
						if (match.index > lastIndex) {
							parts.push(phrase[1].slice(lastIndex, match.index));
						}
						parts.push(
							<Monologue
								key={`Monologue${i}-${monologueIndex}`}
								compact={true}
								id={`Monologue${i}-${monologueIndex}`}
								content={match[1]}
								countCorrect={this.countCorrect}
							/>
						);
						monologueIndex++;
						lastIndex = regex.lastIndex;
					}
					if (lastIndex < phrase[1].length) {
						parts.push(phrase[1].slice(lastIndex));
					}
					cells.push(
						<TableCell key={`row${i}cell1`}>
							<span className='inline-monologue'>{parts}</span>
						</TableCell>
					);
				}
				if (longestRow > 2) {
					const soundCellIndex = 2;
					const soundFile = resolveAsset(`${phrase[soundCellIndex]}`);
					cells.push(
						<TableCell key={`row${i}cell${soundCellIndex}`}>
							<AudioClip className={`compact`} label={""} soundFile={soundFile} />
						</TableCell>
					);
				}

				rows.push(
					<TableRow key={`row${i}`}>
						{cells}
					</TableRow>
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
				<Table>
					{header ?
						<TableHead>
							<TableRow>
								{headerCells}
							</TableRow>
						</TableHead> : null}
					<TableBody>
						{rows}
					</TableBody>
				</Table>
				<p>{nCorrect} correct out of {nPhrases}.</p>
			</div>
		);
	};
}
