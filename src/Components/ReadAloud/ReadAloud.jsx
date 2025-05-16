import './ReadAloud.scss';
// import {AudioClip} from '../';
import React, { useRef } from 'react';
// import {resolveAsset} from '../../utility';

export class ReadAloud extends React.PureComponent {
	constructor(props) {
		super(props);

		const { phrase } = this.props;

		this.recordAndScore = this.recordAndScore.bind(this);
		this.diagnose = this.diagnose.bind(this);
		// this.highlightTextDiff = this.highlightTextDiff.bind(this);

		this.resultRef = React.createRef();

		const SpchRecognition = /* SpeechRecognition ||*/ webkitSpeechRecognition;
		const SpchGrammarList = /* SpeechGrammarList || */window.webkitSpeechGrammarList;
		const SpchRecognitionEvent = /* SpeechRecognitionEvent ||*/ webkitSpeechRecognitionEvent;

		const phrases = [phrase, 'rouge', 'aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
		const recognition = new SpchRecognition();
		if (SpchGrammarList) {
			// SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
			// This code is provided as a demonstration of possible capability. You may choose not to use it.
			const speechRecognitionList = new SpchGrammarList();
			//   const grammar = `#JSGF V1.0; grammar colors; public <color> = ${ colors.join(' | ') } ;`;
			const grammar = `#JSGF V1.0; grammar phrases; public <phrase> = ${ phrases.join(' | ') } ;`;
			speechRecognitionList.addFromString(grammar, 1);
			recognition.grammars = speechRecognitionList;
		}
		recognition.continuous = false;
		recognition.lang = 'fr-FR';
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.onresult = this.diagnose;
		// function(event) {
		// 	// The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
		// 	// The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
		// 	// It has a getter so it can be accessed like an array
		// 	// The first [0] returns the SpeechRecognitionResult at the last position.
		// 	// Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
		// 	// These also have getters so they can be accessed like arrays.
		// 	// The second [0] returns the SpeechRecognitionAlternative at position 0.
		// 	// We then return the transcript property of the SpeechRecognitionAlternative object
		// 	const phrase = event.results[0][0].transcript;
		// 	this.resultRef.current.textContent = `Result received: ${ phrase }.`;
		// 	//   bg.style.backgroundColor = color;
		// 	console.log(`Confidence: ${ event.results[0][0].confidence}`);
		// };

		recognition.onspeechend = function() {
			recognition.stop();
		};

		recognition.onnomatch = function(event) {
			this.resultRef.current.textContent = "I didn't understand your phrase, sorry.";
		};

		recognition.onerror = function(event) {
			this.resultRef.current.textContent = `Error occurred in recognition: ${ event.error}`;
		};

		const {
			config
		} = this.props;
		if (config) {
			this.state = {
				...props.config,
				// phrase: phrase,
				recognition: recognition,
			};
		}
	}

	diagnose = (e) => {
		// The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
		// The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
		// It has a getter so it can be accessed like an array
		// The first [0] returns the SpeechRecognitionResult at the last position.
		// Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
		// These also have getters so they can be accessed like arrays.
		// The second [0] returns the SpeechRecognitionAlternative at position 0.
		// We then return the transcript property of the SpeechRecognitionAlternative object
		const phrase = e.results[0][0].transcript;
		this.resultRef.current.textContent = `Result received: ${ phrase }.`;
		//   bg.style.backgroundColor = color;
		console.log(`Confidence: ${ e.results[0][0].confidence}`);
	};


	recordAndScore = () => {
		console.log("recordAndScore");

		const {
			// phrase,
			recognition,
		} = this.state;

		// const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
		// const SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
		// const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

		// const phrases = [phrase, 'rouge', 'aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

		// const recognition = new SpeechRecognition();
		// if (SpeechGrammarList) {
		// 	// SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
		// 	// This code is provided as a demonstration of possible capability. You may choose not to use it.
		// 	const speechRecognitionList = new SpeechGrammarList();
		// 	//   const grammar = `#JSGF V1.0; grammar colors; public <color> = ${ colors.join(' | ') } ;`;
		// 	const grammar = `#JSGF V1.0; grammar phrases; public <phrase> = ${ phrases.join(' | ') } ;`;
		// 	speechRecognitionList.addFromString(grammar, 1);
		// 	recognition.grammars = speechRecognitionList;
		// }
		// recognition.continuous = false;
		// recognition.lang = 'fr-FR';
		// recognition.interimResults = false;
		// recognition.maxAlternatives = 1;

		const diagnostic = this.resultRef.current; // document.querySelector('.output');
		// const bg = document.querySelector('html');
		// const hints = document.querySelector('.hints');

		// let colorHTML = '';
		// colors.forEach(function(v, i, a){
		//   console.log(v, i);
		//   colorHTML += `<span style="background-color:${ v };"> ${ v } </span>`;
		// });
		// hints.innerHTML = `Tap/click then say a color to change the background color of the app. Try ${ colorHTML }.`;

		// document.body.onclick = function() {
		recognition.start();
		console.log('Ready to receive a color command. SHOW A MICROPHONE animated!');
		// };

		// recognition.onresult = function(event) {
		// 	// The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
		// 	// The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
		// 	// It has a getter so it can be accessed like an array
		// 	// The first [0] returns the SpeechRecognitionResult at the last position.
		// 	// Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
		// 	// These also have getters so they can be accessed like arrays.
		// 	// The second [0] returns the SpeechRecognitionAlternative at position 0.
		// 	// We then return the transcript property of the SpeechRecognitionAlternative object
		// 	const phrase = event.results[0][0].transcript;
		// 	diagnostic.textContent = `Result received: ${ phrase }.`;
		// 	//   bg.style.backgroundColor = color;
		// 	console.log(`Confidence: ${ event.results[0][0].confidence}`);
		// };

		// recognition.onspeechend = function() {
		// 	recognition.stop();
		// };

		// recognition.onnomatch = function(event) {
		// 	diagnostic.textContent = "I didn't understand your phrase, sorry.";
		// };

		// recognition.onerror = function(event) {
		// 	diagnostic.textContent = `Error occurred in recognition: ${ event.error}`;
		// };


	};

	render() {
		const {
			id,
			instructionsText,
			phrase,
		} = this.state;

		return (
			<>
				<div className={`monologue`} id={`monologue${id}`} >
					<p>{instructionsText}</p>
					{/* <AudioClip soundFile={resolveAsset(soundFile)} label={``} /> */}
					<p><b><span className='speak'>{phrase}</span></b></p>
					<button
						className={``}
						onClick={this.recordAndScore}
					>Check</button>
					<p ref={this.resultRef}></p>
				</div>
			</>
		);

	}
}