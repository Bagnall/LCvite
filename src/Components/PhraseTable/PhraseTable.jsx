import './PhraseTable.scss';
import {
	AudioClip,
} from '../../Components';
import React from 'react';
import {
	resolveAsset,
} from '../../utility';

export class PhraseTable extends React.PureComponent {

	// Table of phrases with translatiopns column and sound files column.
	// config is passed from the parent so that multiple exercises are possible.

	constructor(props) {
		super(props);
		this.state = ({
			...props.config
		});
	}

	render = () => {
		const {
			footnote = '',
			header,
			id = [],
			instructionsText,
			phrases,
		} = this.state;
		// const { id = '' } = config;
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
			if (phrase[0] === '') {
				// blank row
				rows.push(
					<tr className={`spacer`} key={`row${i}`}>
						<td colSpan={3}></td>
					</tr>
				);
			} else {
				for (let j = 0; j < phrases[i].length - 1; j++) {
					cells.push(
						<td key={`row${i}cell${j}`}>
							{phrase[j]}
						</td>
					);
				}
				const lastCellIndex = phrases[i].length - 1;
				if (phrase[lastCellIndex]) {
					const soundFile = resolveAsset(`${phrase[lastCellIndex]}`);
					cells.push(
						<td key={`row${i}cell${lastCellIndex}`}>
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
				className={`phrases-table-container container`}
				id={`${id ? id : ''}`}
				key={`${id}PhraseTable`}
			>
				<p className={`instructions`}>{instructionsText}</p>
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
				{footnote}
			</div>
		);
	};
}
