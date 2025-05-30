import './ReadAloud.scss';
// import {AudioClip} from '../';
import {
	highlightTextDiff,
	resolveAsset,
} from '../../utility';
import React from 'react';

export class ReadAloud extends React.PureComponent {
	constructor(props) {
		super(props);

		const { phrase } = this.props;

		this.recordAndScore = this.recordAndScore.bind(this);
		this.diagnose = this.diagnose.bind(this);
		this.handleNoMatch = this.handleNoMatch.bind(this);
		this.handleError = this.handleError.bind(this);
		this.handleSpeechEnd = this.handleSpeechEnd.bind(this);

		this.comparisonRef = React.createRef();
		this.resultRef = React.createRef();

		const { SpchRecognition, SpchGrammarList } = this.initialiseSpeechRecognition();
		const _this = this;
		let cannotRun = '';
		let recognition = null;
		if (SpchRecognition && SpchGrammarList) {
			// const phrases = [phrase];
			recognition = new SpchRecognition();
			if (recognition) {
				if (SpchGrammarList) {
					// 	// SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
					// 	// This code is provided as a demonstration of possible capability. You may choose not to use it.
					const speechRecognitionList = new SpchGrammarList();
					//   const grammar = `#JSGF V1.0; grammar colors; public <color> = ${ colors.join(' | ') } ;`;
					// const grammar = `#JSGF V1.0; grammar phrases; public <phrase> = ${ phrases.join(' | ') } ;`;
					const grammar = `#JSGF V1.0; grammar phrases; public <phrase> = ${phrase};`;
					speechRecognitionList.addFromString(grammar, 1);
					recognition.grammars = speechRecognitionList;
				}
				recognition.continuous = false;
				recognition.lang = 'fr-FR';
				recognition.interimResults = false;
				recognition.maxAlternatives = 1;

				recognition.onresult = _this.diagnose;

				recognition.onspeechend = _this.handleSpeechEnd;

				recognition.onnomatch = _this.handleNoMatch;

				recognition.onerror = _this.handleError;

				navigator.getUserMedia({ audio: true }, () => { }, (error) => {
					cannotRun = error;
					if (error === 'NO_DEVICES_FOUND') {
						cannotRun = 'You need an enabled microphone to complete this exercise';// NO_DEVICES_FOUND (no microphone or microphone disabled)
					}
				});
			}
		}
		const {
			config
		} = _this.props;

		if (config) {
			_this.state = {
				...props.config,
				// phrase: phrase, // From the config
				cannotRun: cannotRun,
				firstTry: true,
				recognition: recognition,
				recording: false,
			};
		}	}

	handleNoMatch = (e) => {
		this.resultRef.current.textContent = "I didn't understand your phrase, sorry.";
		this.setState({
			firstTry: false,
			recording: false,
		});
	};

	handleError = (e) => {
		this.resultRef.current.textContent = `Error occurred in recognition: ${e.error}`;
		this.setState({
			firstTry: false,
			recording: false,
		});
	};

	handleSpeechEnd = (e) => {
		const { recognition } = this.state;
		recognition.stop();
		this.diagnose(e);
		this.setState({
			firstTry: false,
			recording: false,
		});
	};

	initialiseSpeechRecognition = () => {
		let SpchRecognition;
		try {
			SpchRecognition = SpeechRecognition;
		} catch (err) {
			try {
				SpchRecognition = webkitSpeechRecognition;
			}
			catch (err) {
				// console.log(err);
				return true;
			}
		}
		let SpchGrammarList;
		try {
			SpchGrammarList = SpeechGrammarList;
		} catch (err) {
			try {
				SpchGrammarList = window.webkitSpeechGrammarList;
			}
			catch (err) {
				// console.log(err);
				return true;
			}
		}
		return {"SpchRecognition": SpchRecognition, "SpchGrammarList":SpchGrammarList};
	};

	diagnose = (e) => {
		// console.log("diagnose");
		const { phrase } = this.state;
		const { countCorrect } = this.props;
		// The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
		// The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
		// It has a getter so it can be accessed like an array
		// The first [0] returns the SpeechRecognitionResult at the last position.
		// Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
		// These also have getters so they can be accessed like arrays.
		// The second [0] returns the SpeechRecognitionAlternative at position 0.
		// We then return the transcript property of the SpeechRecognitionAlternative object
		let understood;
		try {
			understood = e.results[0][0].transcript;
		}
		catch (error) {
			understood = '';
		}
		// this.resultRef.current.textContent = `I heard: <italic>${ understood }</italic> .`;

		let confidence;
		try {
			({ confidence } = e.results[0][0]);
		}
		catch (error) {
			confidence = '';
		}
		const comparison = highlightTextDiff(understood, phrase, countCorrect);
		this.setState({
			comparison: comparison,
			confidence: confidence,
			understood: understood,
		});
	};

	recordAndScore = () => {
		// console.log("recordAndScore");

		const {
			recognition,
		} = this.state;

		recognition.start();
		// console.log('Ready to receive a color command. SHOW A MICROPHONE animated!');
		this.setState({
			recording: true,
		});
	};

	render() {
		const {
			cannotRun = '',
			comparison = '',
			// confidence,
			firstTry = true,
			htmlContent,
			id,
			instructionsText,
			phrase,
			recording,
			understood = '',
		} = this.state;

		if (cannotRun !== '') {
			return (
				<div className={`read-aloud-container`} ref={this.resultRef}>{cannotRun}</div>
			);
		} else {
			return (
				<div className={`read-aloud-container ${recording ? 'recording' : ''}`} id={`monologue${id}`} >
					<div className={`instructions`}>
						{htmlContent ? <div className={`html-content`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
						<p>{instructionsText}</p>
						{/* <AudioClip soundFile={resolveAsset(soundFile)} label={``} /> */}
						<p><b><span className='speak phrase'>{phrase}</span></b></p>
					</div>
					<div className='recording-container'>
						<img src={resolveAsset('/images/microphone-on.png')} alt='microphone on air' style={{ "display": "none" }} />
						<button
							className={``}
							onClick={this.recordAndScore}
						>{firstTry ? 'Record' : 'Try again?'}</button>
					</div>
					{/* <p>Recording: {recording ? 'true' : 'false'}</p> */}
					<div className={`form`}>
						<p ref={this.resultRef}>{`${understood !== '' ? 'I heard: ' : ''}`}<span className='understood'>{`${ understood !== '' ? understood : ''}`}</span></p>
						{/* <label>Confidence: {confidence ? parseInt(parseFloat(confidence) * 100) : 0}%</label> */}
						<div className='comparison-result' ref={this.comparisonRef} dangerouslySetInnerHTML={{ __html: `${comparison}` }} />
					</div>
				</div>
			);
		}
	}
}