import './Monologue.scss';
import {
	highlightTextDiff,
	resolveAsset,
} from '../../utility';
import {AudioClip} from '../';
import React from 'react';

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
		// this.highlightTextDiff = this.highlightTextDiff.bind(this);

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

	render() {
		const {
			compact,
			content,
			htmlContent,
			id,
			instructionsText,
			showResult = false,
			soundFile,
			userInput = ``,
		} = this.state;
		const {
			countCorrect
		} = this.props;


		let text = userInput;
		if (showResult) text = highlightTextDiff(userInput, content, countCorrect, true);

		if (compact) {
			const {
				id,
			} = this.props;

			return (
				<>

					<div className={`monologue-container compact` } id={`monologue${id}`} >
						{showResult ?
							(<div className={`comparison-result compact`} dangerouslySetInnerHTML={{ __html: `${text}` }}></div>)
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
					<div className={`monologue-container`} id={`${id}`} key={`${id}`} >
						{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
						<p>{instructionsText}</p>
						<AudioClip soundFile={resolveAsset(soundFile)} label={``} />
						{showResult ?
							(<div className={`result comparison-result`} dangerouslySetInnerHTML={{ __html: `${text}` }}></div>)
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