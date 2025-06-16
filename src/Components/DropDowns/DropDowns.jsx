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
			// nPlaced: 0,
			// nToSolve: 0,
		});
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.setUpChangeEvents = this.setUpChangeEvents.bind(this);
		this.transformBracketedHTML = this.transformBracketedHTML.bind(this);
		this.nPlaced = 0;
		this.nToSolve = 0;
	}

	componentDidMount = () => {
		this.setUpChangeEvents();
	};
	componentDidUpdate = () => {
		this.setUpChangeEvents();
	};

	setUpChangeEvents = () => {
		const {
			id,
			phrases = [],
			phrasesHTML = '',
		} = this.state;
		// console.log(`setUpChangeEvents #${id} select`);
		const selectors = document.querySelectorAll(`#${id} select`);
		// console.log("selectors", selectors);
		if (phrases.length === 0 && phrasesHTML !== ''){
			selectors.forEach((selector, index) => {
				if (selector.setup) {
					// Do nowt!
				} else {

					// Deduce the winner from the hint class
					// console.log(`#select${id} option`);
					const options = document.querySelectorAll(`#${id}select${index} option`);
					let winner = 0;
					options.forEach((option) => {
						if (option.classList.contains('hint')) {
							winner = parseInt(option.value);
						}
					});
					// console.log("options", options);

					selector.onchange = (e) => this.handleSelectChange(e, winner);
				}

				selector.setup = true;
			});
		}

	};

	handleSelectChange = (event, winner) => {
		// console.log("handleSelectChange", event, winner);
		const {
			congratulationsText,
			id,
		} = this.state;
		// const {
		// 	nPlaced,
		// 	nToSolve = 0,
		// 	solved = [],
		// 	wrong = [],
		// } = this.state;
		const { showDialog } = this.props;
		const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
		const correctAudio = new Audio(resolveAsset('/sounds/ting.mp3'));
		const { value } = event.target;
		const cl = event.target.classList;
		if (parseInt(value) === winner) {
			cl.add("correct");
			cl.remove("incorrect");
			this.nPlaced++;
			replaceSelectWithSpan(event.target);
			if (this.nPlaced === this.nToSolve) {
				const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

				showDialog(congratulationsText);
				tadaAudio.play();
			} else {
				correctAudio.play();
			}
			// solved.push(event.target.id);


			// Doing this results in a re-render (if nPlaced is used in the render function), thus losing selected settings on dropdowns. So don't, other wise we need to store everyting in state (all selects, their value etc.) and render from that.
			// this.setState({
			// 	nPlaced: nPlaced,
			// });
			// So don't do it via state, have this instead :-(
			const counter = document.querySelector(`#${id} span.n-placed`);
			// console.log(`#${id} span.n-placed`, "counter", counter);
			counter.innerText = this.nPlaced;
		} else {
			cl.add("incorrect");
			cl.remove("correct");
			errorAudio.play();
			// wrong.push(event.target.id);
			// this.setState({
			// 	wrong: wrong,
			// });
		}
	};

	parseBracketedOptions = (nSelects = 0, str) => {
		// console.log("parseBracketedOptions");
		const {
			id,
			// nToSolve = 0,
			// solved = [],
			// wrong = [],
		} = this.state;
		// const { nToSolve = 0 } = this.state;
		const regex = /\[([^\]]+)\]/g;
		const segments = [];
		let lastIndex = 0;
		let match;
		// let index = 0;
		nSelects = 0;

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
			// console.log(`${id}select${nSelects}`);
			segments.push(
				<select id={`${id}select${nSelects}`} key={`${id}select${nSelects}`} onChange={(e) => this.handleSelectChange(e, winner)} ><option defaultValue>-</option>
					{cleanOptions.map((opt, i) => (
						<option key={i} value={i} className={`${i === winner ? 'hint' : ''}`}>{opt}</option>
					))}
				</select>
			);
			nSelects++;

			({ lastIndex } = regex);
			// index++;
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

	transformBracketedHTML = (nSelects = 0, htmlString) => {
		// console.log("transformBracketedHTML");
		const regex = /\[([^\]]+)\]/g;
		let result = '';
		let lastIndex = 0;
		const {
			id,
			solved = [],
			wrong = [],
		} = this.state;

		if ((regex.exec(htmlString)) !== null) {
			htmlString.replace(regex, (match, contents, offset) => {
				// Append text before this match
				result += htmlString.slice(lastIndex, offset);

				const options = contents.split('|').map(opt => opt.trim());
				const winner = options.findIndex(opt => opt.startsWith('*'));
				const cleanOptions = options.map(opt => opt.replace(/^\*/, ''));

				const nodeId = `${id}select${nSelects}`;
				let selectHTML = '';
				selectHTML += `<select class="${wrong.includes(nodeId) && !solved.includes(nodeId) ? 'incorrect' : ''}" id="${nodeId}" key="${nodeId}" ><option>-</option>`;
				cleanOptions.forEach((opt, i) => {
					const classAttr = i === winner ? ' class="hint"' : '';
					selectHTML += `<option value="${i}"${classAttr}>${opt}</option>`;
				});
				selectHTML += '</select>';
				nSelects++;

				result += selectHTML;
				lastIndex = offset + match.length;
			});
		}

		// Append remaining HTML
		result += htmlString.slice(lastIndex);

		return {
			"html": result,
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
			instructionsTextHTML,
			// nPlaced = 0,
			phrases = [],
			phrasesHTML = '',
		} = this.state;
		// let {
		// 	nToSolve = 0,
		// } = this.state;
		// console.log("render");
		let content;
		let nSelects = 0;
		this.nToSolve = 0;
		let jsx, html;
		// const _this = this;
		if (phrases.length > 0) {
			// Construct a table
			const phraseList = new Array;

			for (let i = 0; i < phrases.length; i++) {
				({ nSelects, jsx } = this.parseBracketedOptions(nSelects, phrases[i]));
				phraseList.push(jsx);
				this.nToSolve += nSelects;
			}

			const rows = new Array();
			for (let i = 0; i < phrases.length; i++) {
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

			content = (
				<table>
					<tbody>
						{rows}
					</tbody>
				</table>
			);
		} else {
			// We have HTML content
			({ nSelects, html } = this.transformBracketedHTML(nSelects, phrasesHTML));
			this.nToSolve = nSelects;
			content = (
				<div>
					{audio ? <AudioClip className={`dropdown-audio`} soundFile={`${resolveAsset(audio)}`} /> : null}
					<div className={`phrases-html`} dangerouslySetInnerHTML={{ __html: html }}></div>
					{/* <div className={`phrases-html`}>{html}</div> */}
				</div>
			);
		}

		return (
			<div
				className={`drop-downs-container container`}
				id={`${id ? id : ''}`}
				key={`${id}DropDowns]`}
			>

				{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}

				{instructionsText ? <p className={`instructions`}>{instructionsText}</p> : <p className={`instructions`} dangerouslySetInnerHTML={{ __html: instructionsTextHTML }} />}

				<div className='help'>
					{/* <label className={`hidden-help ${failCount >= 2 ? 'show' : ''}`}>{showHintsText}: <input type='checkbox' onChange={this.handleHints} /></label> */}
					<button className={`hidden-help ${failCount >= 2 ? 'show' : ''}`} onClick={this.autoSolve}>{cheatText}</button>&nbsp;
				</div>

				{content}

				{/* // Doing this results in a re-render, thus losing selected settings on dropdowns. So don't, other wise we need to store everyting in state (all selects, their value etc.) and render from that. */}
				<p><span className='n-placed'>0</span> correct out of {`${this.nToSolve}`}</p>
			</div>
		);
	};
}
