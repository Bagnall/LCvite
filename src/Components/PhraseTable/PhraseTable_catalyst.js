import './PhraseTable.scss';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '..';
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
			htmlContent,
			id = [],
			informationText,
			informationTextHTML,
			instructionsText,
			instructionsTextHTML,
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
				headerCells.push(<TableHeader key={`${id}header${i}`}>{header[i]}</TableHeader>);
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
						<TableCell colSpan={longestRow}></TableCell>
					</TableRow>
				);
			} else {
				for (let j = 0; j < phrases[i].length; j++) {
					// console.log("phrase[j].slice(-4)", phrase[j], phrase[j].slice(-4));
					if (phrase[j].slice(-4) === '.mp3') {
						// Spound file!
						const soundFile = resolveAsset(`${phrase[j]}`);
						cells.push(
							<TableCell key={`row${i}cell${j}`}>
								<AudioClip className={`compact`} label={""} soundFile={soundFile} />
							</TableCell>
						);
					} else {
						cells.push(
							<TableCell key={`row${i}cell${j}`} dangerouslySetInnerHTML={{ __html: phrase[j] }}>
							</TableCell>
						);
					}
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
				className={`phrases-table-container container`}
				id={`${id ? id : ''}`}
				key={`${id}PhraseTable`}
			>
				<Info className={`text accordionarticle`} id={`info-${id}`} informationText={informationText} informationTextHTML={informationTextHTML}/>
				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
				{instructionsText ? <p className={`instructions`}>{instructionsText}</p> : null}
				{instructionsTextHTML ? <p className={`instructions`} dangerouslySetInnerHTML={{ __html: instructionsTextHTML }} /> : null}
				<Table>
					{header ?
						<TableHead>
							<tr>
								{headerCells}
							</tr>
						</TableHead> : null}
					<TableBody>
						{rows}
					</TableBody>
				</Table>
				{footnote ? <p className='footnote'>{footnote}</p> : null}
			</div>
		);
	};
}
