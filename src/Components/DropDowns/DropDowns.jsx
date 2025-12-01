import './DropDowns.scss';
import {
	AudioClip,
	IconButton,
} from '..';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React from 'react';
import {
	// replaceSelectWithSpan,
	resolveAsset
} from '../../utility';

export class DropDowns extends React.PureComponent {

	// Table of phrases with dropdowns and sound files column.
	// config is passed from the parent so that multiple exercises are possible.

	constructor(props) {
		super(props);
		this.state = ({
			...props.config,
			failCount: 0,
			nCorrect: 0,
			// nToSolve: 0,
			solved: [],
			values: [],
		});
		this.handleReset = this.handleReset.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		// this.setUpChangeEvents = this.setUpChangeEvents.bind(this);
		// this.transformBracketedHTML = this.transformBracketedHTML.bind(this);
		// this.nCorrect = 0;
		this.nToSolve = 0;
	}

	// componentDidMount = () => {
	// 	// console.log("DropDowns componentDidMount", this.nCorrect);
	// 	// this.setUpChangeEvents();
	// };

	// componentDidUpdate = () => {
	// 	// console.log("DropDowns componentDidUpdate", this.nCorrect);
	// 	// this.setUpChangeEvents();
	// };

	handleReset = () => {
		console.log("handleReset");
		this.setState({
			solved: [],
			values: [],
		});
	};

	handleSelectChange = (value, winner, id) => {
	// handleSelectChange = (...args) => {
		// console.log("handleSelectChange", args);
		console.log("handleSelectChange", value, winner, id);
		const {
			// congratulationsText,
			failCount,
			nCorrect = 0,
			solved = [],
			values = [],
			// id,
		} = this.state;

		const newSolved = [...solved];
		const newValues = [...values];
		// const {
		// 	nToSolve = 0,
		// 	wrong = [],
		// } = this.state;
		// const { showDialog } = this.props;
		// const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
		// const correctAudio = new Audio(resolveAsset('/sounds/ting.mp3'));
		// const { id, value } = event.target;
		const target = document.getElementById(id);
		debugger;
		const cl = target.closest('p').classList;
		const index = parseInt(id.split("select")[1]);
		console.log("index", index);
		// if (parseInt(value) === winner) {
		let newFailCount = failCount;
		newValues[index] = value;
		if (parseInt(value) === winner) {
			cl.add("correct");
			cl.remove("incorrect");
			// replaceSelectWithSpan(event.target);

			// if (this.nCorrect === this.nToSolve) {
			// 	// const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

			// 	// showDialog(congratulationsText);
			// 	// tadaAudio.play();
			// // } else {
			// // 	correctAudio.play();
			// }
			// solved.push(event.target.id);
			if (solved[index] === -1) newFailCount = failCount - 1;
			console.log("correct index", index);
			newSolved[index] = 1;
			// this.nCorrect++;

			// Doing this results in a re-render (if nCorrect is used in the render function), thus losing selected settings on dropdowns. So don't, other wise we need to store everyting in state (all selects, their value etc.) and render from that.
			this.setState({
				failCount: newFailCount,
				nCorrect:nCorrect + 1,
				solved: newSolved,
				values: newValues,
			});
			// So don't do it via state, have this instead :-(
			// const counter = document.querySelector(`#${id} span.n-placed`);
			// console.log(`#${id} span.n-placed`, "counter", counter);
			// counter.innerText = this.nCorrect;
		} else {
			cl.add("incorrect");
			cl.remove("correct");
			console.log("incorrect index", index);
			newSolved[index] = -1;
			// errorAudio.play();
			// wrong.push(event.target.id);
			newFailCount = failCount + 1;
			this.setState({
				failCount: newFailCount,
				solved: newSolved,
				values: newValues,
			});
		}
	};

	parseBracketedOptions = (nSelects, str) => {
		// console.log("parseBracketedOptions");
		const {
			id,
			// nToSolve = 0,
			// solved = [],
			// wrong = [],
			values,
		} = this.state;
		// const { nToSolve = 0 } = this.state;
		const regex = /\[([^\]]+)\]/g;
		const segments = [];
		let lastIndex = 0;
		let match;
		// let index = 0;
		// let nSelects = 0;

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
			const selectId = `${id}select${nSelects}`;
			console.log("values[nSelects]", values[nSelects]);
			segments.push(
				<span
					className="inline-block"
					// key={`${id}selectWrapper${nSelects}`}
					id={selectId}
					key={selectId}
				>
					<Select
						// Shadcn Select DOES NOT HONOUR id, key, inline-flex so I have to get hacky and apply them to the span wrapper! DREADFULL!
						// className="inline-flex"
						// id={selectId}
						// key={selectId}
						value={values[nSelects]}
						onValueChange={(value) => this.handleSelectChange(value, winner, selectId)} >
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select answer" />
						</SelectTrigger>
						<SelectContent>
							{cleanOptions.map((opt, i) => (
								<SelectItem key={i} value={i} className={`${i === winner ? 'hint' : ''}`}>{opt}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</span>
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
			"jsx": (<p key={`p-${nSelects}`} visualkey={`p-${nSelects}`}>{segments}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="tick"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"	className="cross"><path fill="currentColor"	d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
			</svg></p>),
			"nSelects": nSelects,
		};
	};

	// setUpChangeEvents = () => {
	// 	const {
	// 		id,
	// 		phrases = [],
	// 		phrasesHTML = '',
	// 	} = this.state;
	// 	// console.log(`setUpChangeEvents #${id} select`);
	// 	const selectors = document.querySelectorAll(`#${id} select`);
	// 	// console.log("selectors", selectors);
	// 	if (phrases.length === 0 && phrasesHTML !== ''){
	// 		selectors.forEach((selector, index) => {
	// 			if (selector.setup) {
	// 				// Do nowt!
	// 			} else {

	// 				// Deduce the winner from the hint class
	// 				// console.log(`#select${id} option`);
	// 				const options = document.querySelectorAll(`#${id}select${index} option`);
	// 				let winner = 0;
	// 				options.forEach((option) => {
	// 					if (option.classList.contains('hint')) {
	// 						winner = parseInt(option.value);
	// 					}
	// 				});
	// 				// console.log("options", options);

	// 				selector.onchange = (e) => this.handleSelectChange(e, winner);
	// 			}

	// 			selector.setup = true;
	// 		});
	// 	}

	// };

	// transformBracketedHTML = (htmlString) => {
	// 	// console.log("transformBracketedHTML", nSelects);
	// 	const regex = /\[([^\]]+)\]/g;
	// 	let result = '';
	// 	let lastIndex = 0;
	// 	const {
	// 		id,
	// 		solved = [],
	// 		wrong = [],
	// 	} = this.state;
	// 	let nSelects = 0;

	// 	if ((regex.exec(htmlString)) !== null) {
	// 		htmlString.replace(regex, (match, contents, offset) => {
	// 			// Append text before this match
	// 			result += htmlString.slice(lastIndex, offset);

	// 			const options = contents.split('|').map(opt => opt.trim());
	// 			const winner = options.findIndex(opt => opt.startsWith('*'));
	// 			const cleanOptions = options.map(opt => opt.replace(/^\*/, ''));

	// 			const nodeId = `${id}select${nSelects}`;
	// 			let selectHTML = '';
	// 			selectHTML += `<select class="select-wrapper ${wrong.includes(nodeId) && !solved.includes(nodeId) ? 'incorrect' : '' }" id="${nodeId}" key="${nodeId}><option defaultValue>Select answer</option>`;
	// 			cleanOptions.forEach((opt, i) => {
	// 				const classAttr = i === winner ? ' class="hint"' : '';
	// 				selectHTML += `<option value="${i}"${classAttr}>${opt}</option>`;
	// 			});
	// 			selectHTML += '</select>';
	// 			nSelects++;

	// 			result += selectHTML;
	// 			lastIndex = offset + match.length;
	// 		});
	// 	}

	// 	// Append remaining HTML
	// 	result += htmlString.slice(lastIndex);

	// 	return {
	// 		"html": result,
	// 		"nSelects": nSelects,
	// 	};

	// };

	render = () => {
		const {
			audio,
			cheatText,
			complete = false,
			failCount = 0,
			footnote,
			footnoteHTML,
			htmlContent = '',
			id = [],
			// instructionsText,
			// instructionsTextHTML,
			listenDescriptionText,
			nCorrect = 0,
			phrases = [],
			phrasesHTML = '',
			soundFile,
		} = this.state;
		// let {
		// 	nToSolve = 0,
		// } = this.state;
		// console.log("render");
		let content;
		let nSelects = 0;
		this.nToSolve = 0;
		let jsx;// , html;
		// const _this = this;
		if (phrases.length > 0) {
			// Construct a table
			const phraseList = [];

			for (let i = 0; i < phrases.length; i++) {
				({ nSelects, jsx } = this.parseBracketedOptions(nSelects, phrases[i]));
				// console.log("nSelects", nSelects);
				phraseList.push(jsx);
			}
			this.nToSolve = nSelects;

			const rows = [];
			for (let i = 0; i < phrases.length; i++) {
				const phrase = phrases[i];
				const cells = [];
				if ((phrase[0] === undefined || phrase[0] === '') && phrase.length === 0) {
					// blank row
					rows.push(
						<TableRow className={`spacer`} key={`row${i}`}>
							<TableCell colSpan={3}></TableCell>
						</TableRow>
					);
				} else {
					cells.push(
						<TableCell key={`row${i}cell1`}>
							{phraseList[i]}
						</TableCell>
					);

					if (audio && audio[i]) {
						const soundFile = resolveAsset(`${audio[i]}`);

						cells.push(
							<TableCell key={`row${i}cell2`}>
								<AudioClip className={`compact`} id={`row${i}cell2AudioClip`} soundFile={soundFile} />
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

			content = (
				<Table>
					<TableBody>
						{rows}
					</TableBody>
				</Table>
			);
		} else {
			// We have HTML content
			alert("HTML CONTENT");
			// ({ nSelects, html } = this.transformBracketedHTML(phrasesHTML));
			// this.nToSolve = nSelects;
			// content = (
			// 	<div>
			// 		{audio ? <AudioClip className={`dropdown-audio`} id={`${id ? id : ''}AudioClip`} soundFile={`${resolveAsset(audio)}`} /> : null}
			// 		<div className={`phrases-html`} dangerouslySetInnerHTML={{ __html: html }}></div>
			// 		{/* <div className={`phrases-html`}>{html}</div> */}
			// 	</div>
			// );
		}

		return (
			<div
				className={`drop-downs-container container`}
				id={`${id ? id : ''}`}
				key={`${id}DropDowns]`}
			>
				{htmlContent && htmlContent !== '' ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}

				{listenDescriptionText && soundFile ?
					<AudioClip
						id={`bollox`}
						listenText={listenDescriptionText}
						soundFile={soundFile}
					/>
					:
					null
				}

				{/* <div className='help'> */}
				{/* <label className={`hidden-help ${failCount >= 2 ? 'show' : ''}`}>{showHintsText}: <input type='checkbox' onChange={this.handleHints} /></label> */}
				{/* </div> */}

				{content}
				<div className='help'>
					<IconButton className={`hidden-help ${failCount >= 1 ? 'show' : ''}`} onClick={this.autoSolve} theme={`eye`}>{cheatText}</IconButton>&nbsp;
					<IconButton className={`hidden-help w-full ${nCorrect >= 1 || failCount >= 1 ? 'show' : ''}`} onClick={this.handleReset} theme={`reset`}>Reset</IconButton>
				</div>

				{/* // Doing this results in a re-render, thus losing selected settings on dropdowns. So don't, other wise we need to store everyting in state (all selects, their value etc.) and render from that. */}
				<p key={`p-n-of-m`}><span className='n-placed'>{nCorrect}</span> correct out of {`${this.nToSolve}`}</p>
				{footnote ? <p key={`p-footnote`} className={`footnote`}>{footnote}</p> : null}
				{footnoteHTML ? <p key={`p-footnaote-html`} className={`footNote`} dangerouslySetInnerHTML={{ __html: footnoteHTML }} /> : null}
			</div>
		);
	};
}
