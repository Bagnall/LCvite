import './Monologue.scss';
import {AudioClip} from '../';
import React from 'react';
import {resolveAsset} from '../../utility';

export class Monologue extends React.PureComponent {
	constructor(props) {
		super(props);

		const {
			compact = false,
			content,
			soundFile,
			config
		} = this.props;
		if (config) {
			this.state = {
				...props.config,
				compact: compact,
				showResult: false,
			};
		} else {
			this.state = {
				compact: compact,
				content: content,
				showResult: false,
				soundFile: soundFile,
			};
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleValidation = this.handleValidation.bind(this);
		this.highlightTextDiff = this.highlightTextDiff.bind(this);

	}

	handleChange = (e) => {
		// console.log("handleChange");
		this.setState({userInput: e.target.value});
	};

	handleValidation = () => {
		// console.log("handleValidation");
		this.setState({
			showResult: true,
		});
	};

	highlightTextDiff = (a, b) => {
		const m = a.length, n = b.length;
		const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
		const correctAudio = new Audio(resolveAsset('/sounds/ting.mp3'));
		const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
		const {
			countCorrect = () => { },
		} = this.props;

		// Fill LCS table
		for (let i = 1; i <= m; i++) {
			for (let j = 1; j <= n; j++) {
				if (a[i - 1] === b[j - 1]) {
					dp[i][j] = dp[i - 1][j - 1] + 1;
				} else {
					dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
				}
			}
		}

		// Backtrack to build diff
		let i = m, j = n;
		const result = [];
		let correct = true;
		while (i > 0 || j > 0) {
			if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
				result.unshift(`<span>${a[i - 1]}</span>`);
				i--; j--;
			} else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
				result.unshift(`<span class='inserted' title="inserted">${b[j - 1]}</span>`);
				correct = false;
				j--;
			} else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
				result.unshift(`<span class='deleted' title="deleted">${a[i - 1]}</span>`);
				correct = false;
				i--;
			}
		}
		if (correct) {
			correctAudio.play();
			countCorrect();
		} else {
			errorAudio.play();
		}

		return result.join('');
	};


	render() {
		const {
			compact,
			content,
			id,
			instructionsText,
			showResult = false,
			soundFile,
			userInput = ``,
		} = this.state;

		let text = userInput;
		if (showResult) text = this.highlightTextDiff(userInput, content);

		if (compact) {
			const {
				id,
			} = this.props;

			return (
				<>

					<div className={`monologue compact` } id={`monologue${id}`} >
						{showResult ?
							(<div className={`result compact`} dangerouslySetInnerHTML={{ __html: `${text}` }}></div>)
							:
							(
								<>
									{compact ?
										<input type='text' value={userInput} onChange={this.handleChange} />
										:
										<textarea value={userInput} onChange={this.handleChange} ></textarea>
									}
									<button
										className={``}
										onClick={this.handleValidation}
									>Check</button>
								</>
							)
						}
					</div>
				</>
			);
		} else {
			return (
				<>
					<div className={`monologue`} id={`monologue${id}`} >
						<p>{instructionsText}</p>
						<AudioClip soundFile={resolveAsset(soundFile)} label={``} />
						{showResult ?
							(<div className={`result`} dangerouslySetInnerHTML={{ __html: `${text}` }}></div>)
							:
							(
								<>
									<textarea value={userInput} onChange={this.handleChange} ></textarea>
									<button
										className={``}
										onClick={this.handleValidation}
									>Check</button>
								</>
							)
						}
					</div>
				</>
			);

		}
	}
}