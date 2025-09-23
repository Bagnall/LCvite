import './Monologue.scss';
import {
	highlightTextDiff,
	resolveAsset,
} from '../../utility';
import {AudioClip} from '../';
import React from 'react';
import { Button, Input, Textarea } from '..';
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
			this.state = ({
				...props.config,
				compact: compact,
				showResult: false,
			});
		} else {
			this.state = ({
				compact: compact,
				content: content,
				showResult: false,
				soundFile: soundFile,
			});
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleValidation = this.handleValidation.bind(this);
		this.handleReset = this.handleReset.bind(this);
		// this.highlightTextDiff = this.highlightTextDiff.bind(this);

	}

	handleChange = (e) => {
		// console.log("handleChange");
		this.setState({userInput: e.target.value});
	};

	handleReset = () => {
		// console.log("handleReset");
		this.setState({
			showResult: false,
			userInput: "",
		});
	};

	handleValidation = () => {
		// console.log("handleValidation");
		this.setState({
			showResult: true,
		});
	};

	handleKeyPress = (e) => {
		// console.log("handleKeyPress");
		if (e.keyCode === 13) {
			e.preventDefault();
			this.handleValidation;
		}
	};

	render = () => {
		const {
			compact,
			content,
			htmlContent,
			id,
			instructionsText,
			instructionsTextHTML,
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
						{!compact ? <Button className={`reset`} onClick={this.handleReset}>Reset</Button> : null}
						{showResult ?
							(<div className={`comparison-result compact`} dangerouslySetInnerHTML={{ __html: `${text}` }}></div>)
							:
							(
								<form onKeyPress={this.handleKeyPress}>
									{compact ?
										<Input
											id={`monologue${id}text`}
											name={`monologue${id}text`}
											onChange={this.handleChange}
											type='text'
											value={userInput}
										/>
										:
										<Textarea value={userInput} onChange={this.handleChange} ></Textarea>
									}
									<Button
										className={``}
										htmlFor={`monologue${id}text`}
										type={`submit`}
										onClick={this.handleValidation}
									>Check</Button>
								</form>
							)
						}
					</div>
				</>
			);
		} else {
			return (
				<>
					<div className={`monologue-container`} id={`${id}`} key={`${id}`} >
						<Button className={`reset btn`} onClick={this.handleReset}>Reset</Button>
						{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
						{instructionsText ? <p className={`instructions`}>{instructionsText}</p> : null}
						{instructionsTextHTML ? <p className={`instructions`} dangerouslySetInnerHTML={{ __html: instructionsTextHTML }} /> : null}
						<AudioClip soundFile={resolveAsset(soundFile)} label={``} />
						{showResult ?
							(<div className={`result comparison-result`} dangerouslySetInnerHTML={{ __html: `${text}` }}></div>)
							:
							(
								<>
									<Textarea value={userInput} onChange={this.handleChange} ></Textarea>
									<Button
										className={``}
										onClick={this.handleValidation}
										type={`submit`}
									>Check</Button>
								</>
							)
						}
					</div>
				</>
			);

		}
	};
}