import './App.scss';
import {
	Accordion,
	AccordionArticle,
	AnswerTable,
	Blanks,
	Congratulate,
	DropDowns,
	ErrorLog,
	Explanation,
	Flag,
	Footer,
	Header,
	Jigsaw,
	MemoryMatchGame,
	Monologue,
	PhraseTable,
	ReadAloud,
	WordGrid,
	WordParts,
} from './Components';
import {
	handleResponse,
	handleSpecialLinkClick,
	isTouchChrome,
	playAudioLink,
	resolveAsset,
	speak,
} from './utility';
import React from 'react';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = ({
			dialogContent: '',
			errors: [],
			showDialog: false,
		});

		this.loadConfig = this.loadConfig.bind(this);
		this.loadIndex = this.loadIndex.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
		this.hideSpeechError = this.hideSpeechError.bind(this);
		this.initialiseSpeeches = this.initialiseSpeeches.bind(this);
		this.initialiseSynth = this.initialiseSynth.bind(this);
		this.renderComponent = this.renderComponent.bind(this);
		this.selectLearningObject = this.selectLearningObject.bind(this);

		window.refs = new Array();
	}

	clearError = (index) => {
		const { errors } = this.state;
		errors.splice(index, 1);
		this.setState({
			errors: errors,
		});
	};

	clearLog = () => {
		this.setState({
			errors: [],
		});
	};

	componentDidMount = () => {

		// console.log("componentDidMount");
		const queryString = window.location.search;
		// console.log(queryString);
		const urlParams = new URLSearchParams(queryString);
		// console.log(urlParams);
		const configFile = urlParams.get('config');

		let configPromise;
		if (configFile) configPromise = this.loadConfig(`./src/${configFile}`);
		this.loadIndex();
		this.initialiseSpecialAnchors();

		configPromise.then(this.initialiseSynth);

	};

	componentDidUpdate = () => {
		// console.log("componentDidUpdate");

		// const { targetLanguageCode } = this.state;
		this.initialiseSpecialAnchors();
		// this.initialiseSynth(targetLanguageCode);

	};

	expandAllAccordions = () => {

		console.log("expandAllAccordions"); // eslint-disable-line
		// Not good as it does not affect state of accordion, in particular 'expanded' true/false.
		const closedArticles = document.querySelectorAll('article.accordion-article:not(.expanded)');
		const closedArrows = document.querySelectorAll('div.arrow:not(.expanded)');
		console.log("closedArticles", closedArticles); // eslint-disable-line
		closedArticles.forEach((closedArticle) => {
			closedArticle.classList.add('expanded');
		});
		closedArrows.forEach((closedArrow) => {
			closedArrow.classList.add('expanded');
		});
	};

	hideDialog = () => {
		// console.log("hideDialog");
		this.setState({
			dialogContent: '',
			showDialog: false,
		});
	};

	hideSpeechError = () => {
		// console.log("hideSpeechError");
		this.setState({
			dialogContent: '',
			showSpeechError: false,
		});
	};

	initialiseSpecialAnchors = () => {
		// console.log("initialiseSpecialAnchors");
		const anchors = document.querySelectorAll('.special-anchor');
		anchors.forEach((anchor) => {
			// console.log("anchor", anchor);
			if (anchor.setup) {
				// Do nowt!
			} else {
				anchor.addEventListener('click', (e) => handleSpecialLinkClick(e));
			}
			anchor.setup = true;
		});
	};

	initialiseSpeeches = (synth, targetLanguageCode, voices) => {
		// console.log("initialiseSpeeches", targetLanguageCode, synth, voices);

		// console.log("initialiseSpeeches", voices.length);
		const speeches = document.querySelectorAll('.speak');
		speeches.forEach((speech) => {
			if (targetLanguageCode && synth && voices && voices.length >= 1) {
				console.error("There's a '.speak' that I missed");
				// console.log("Setting speeches", voices.length);
				if (speech.setup !== true && speech.getAttribute('setup') !== true){
					// Do nowt!
				// } else {
					speech.setAttribute('title', 'Click to play sound');
					speech.setAttribute('aria-label', 'Non-selectable text');
					speech.setAttribute('setup', 'true');
					speech.addEventListener('click', (e) => speak(e, synth, targetLanguageCode, voices));

					// following doesn't help eliminate contextual search :-(
					// speech.addEventListener('tap', (e) => speak(e, synth, targetLanguageCode, voices));
					// speech.addEventListener('contextmenu', function (e) {
					// 	e.preventDefault();
					// }, { passive: false });
					speech.setup = true;
				}
			}
		});

		const audioLinks = document.querySelectorAll('.audio-link');
		audioLinks.forEach((audioLink) => {
			console.log(audioLink.getAttribute('sound-file'));
			if (audioLink.setup !== true && audioLink.getAttribute('setup') !== true) {
				const soundFile = audioLink.getAttribute('sound-file');
				if (!soundFile) {
					alert("Error: Undefined soundfile!"); // User must never see this!
				} else {
					audioLink.setAttribute('title', 'Click to play sound');
					audioLink.setAttribute('setup', 'true');
					audioLink.addEventListener('click', () => playAudioLink(soundFile));
					audioLink.setup = true;
				}
			}
		});
	};

	initialiseSynth = () => {
		// console.log("initialiseSynth");
		const { targetLanguageCode } = this.state;
		const synth = window.speechSynthesis;

		const mediaContent = window
			.getComputedStyle(document.body, '::before')
			.getPropertyValue('content');

		const isFirefox = /firefox/i.test(navigator.userAgent);

		const sortVoices = (voices) =>
			voices.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

		const filterVoicesByLang = (voices, lang) =>
			voices.filter((voice) => voice.lang === lang);

		const enableSpeech = (voices) => {
			const filteredVoices = filterVoicesByLang(sortVoices(voices), targetLanguageCode);
			this.initialiseSpeeches(synth, targetLanguageCode, filteredVoices);
			document.documentElement.classList.add('can-speak');
			this.setState({ showSpeechError: false });
		};

		// Firefox requires a delay before voices are populated
		if (isFirefox) {
			// console.log("Firefox fallback");
			setTimeout(() => {
				const voices = synth.getVoices();
				enableSpeech(voices);
			}, 1000);
		}

		// Non-Firefox
		synth.onvoiceschanged = () => {
			// console.log("onvoiceschanged");

			if ((mediaContent[1] === 'S' || mediaContent[1] === 'M') && isTouchChrome()) {
			// Context-search issue workaround for Chrome on touch devices
			// Optional: display error to user
			} else {
				const voices = synth.getVoices();
				enableSpeech(voices);
			}
		};
	};

	loadConfig = (configFile) => {
		// console.log("loadConfig");

		// Read the config
		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const requestOptions = {
			headers: headers,
			method: 'GET',
			redirect: 'follow',
		};

		return new Promise((resolve, reject) => {
			fetch(`${configFile}`, requestOptions)
				.then(handleResponse)
				.then(res => {
					const { settings } = res;
					delete res["settings"];
					const {
						class: configClass,
						targetLanguageCode,
						title,
					} = settings;
					document.title = title;
					if (configClass)document.getElementsByTagName('html')[0].classList.add(configClass);

					// 🔁 Return a Promise that resolves only when setState is done

					this.setState({
						config: { ...res },
						settings: { ...settings },
						targetLanguageCode,
					},
					() => resolve({ targetLanguageCode })
					);
				})
				.catch(error => {
					const action = `Loading configuration`;
					this.logError(action, error);
					reject();
				});
		});
	};

	loadIndex = () => {
		// console.log("loadIndex");

		// Read the index file
		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const requestOptions = {
			headers: headers,
			method: 'GET',
			redirect: 'follow',
		};

		let currentLearningObject = 0;
		if (sessionStorage.getItem("currentLearningObject")) currentLearningObject = parseInt(sessionStorage.getItem("currentLearningObject"));

		fetch(`./src/index.json`, requestOptions)
			.then(handleResponse)
			.then(res => {
				// console.log("res", res);
				const { learningObjects } = res;

				this.setState({
					currentLearningObject: currentLearningObject,
					learningObjects: learningObjects,
				});
			})
			.catch(error => {
				const action = `Loading index`;
				this.logError(action, error);
			});
	};

	logError = (action, ...params) => {
		// (action, statusCode, statusText, message) or
		// (action, error)
		const {
			errors,
			refreshErrorLog,
		} = this.state;
		if (params.length === 1) {
			// Is error object
			const [error] = params;
			const {
				detail,
				error_code: errorCode,
				error_message: errorMessage,
				message,
				status,
				statusText = '',
			} = error;
			let Message = '';
			let Status = '';
			if (errorCode && errorMessage) { // Most likely an error from Metabolism Server
				Message += errorMessage;
				Status += errorCode;
			}
			if (status) Status = status;
			if (message) Message += message;
			if (detail) Message += detail;

			errors.push({
				action: action,
				message: Message,
				statusCode: Status,
				statusText: statusText,
			});

		} else {
			const [statusCode = '', statusText = '', message = ''] = params;

			errors.push({
				action: action,
				message: message,
				statusCode: statusCode,
				statusText: statusText,
			});
		}

		this.setState({
			errors: errors,
			refreshErrorLog: !refreshErrorLog,
			showSpinner: false,
		});
	};

	render = () => {
		const {
			config,
			dialogContent,
			// dropdowns1,
			errors,
			// jigsaw1,
			// jigsaw2,
			// jigsaw3,
			// learningObjects,
			// monologues,
			// phrases1,
			// phrases2,
			// phrases3,
			// phraseTable1,
			refreshErrorLog,
			showDialog = false,
			// vocabulary1,
			// vocabulary2,
			// wordparts1,
			// wordsIntoSlots1,
			// wordsIntoSlots2,
			settings,
			showSpeechError = false,
		} = this.state;
		const articles = new Array;

		// We have 2 ways to approach this:
		// 1. What you can see here is a solution which relies totally on content from config.json.
		// Each definition corresponds to a component type (as indicated in config.json).
		// This code loads those components into the articles array.
		// 2. The alternative is to uncomment the commented lines in the setting from state block above and
		// uncomment the hard-coded components in the returned render below. This allows for more ad-hoc html inclusions,
		// but does mean that the whole thing has to be hard-coded.

		if (config) {
			for (const [/* key */, value] of Object.entries(config)) {
				// console.log(key, value);
				// const { id, component, content: groupContent = [], titleText } = value;
				const { component } = value;
				// const renderedGroupContent = new Array;
				// if (groupContent.length > 0) {
				// 	groupContent.forEach((child) => {
				// 		this.renderComponent(child, renderedGroupContent);
				// 	});
				// }

				if (component) {
					// articles =
					this.renderComponent(value, articles);
					// switch (component) {
					// 	case 'Explanation':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				<Explanation
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'Monologue':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				<Monologue
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'DropDowns':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				<DropDowns
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'WordGrid':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={`Word Grid`}
					// 			>
					// 				<WordGrid
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'Group':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`Group${id}Accordion`}
					// 				key={`$Group{id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				{/* {content} */}
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'WordParts':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				<WordParts
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'AnswerTable':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				<AnswerTable
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'PhraseTable':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				<PhraseTable
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'Blanks':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				<Blanks
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'Jigsaw':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				<Jigsaw
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	case 'MemoryMatchGame':
					// 		articles.push(
					// 			<AccordionArticle
					// 				id={`${id}Accordion`}
					// 				key={`${id}Accordion`}
					// 				ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
					// 				title={titleText}
					// 			>
					// 				<MemoryMatchGame
					// 					config={value}
					// 					logError={this.logError}
					// 					showDialog={this.showDialog}
					// 				/>
					// 			</AccordionArticle>
					// 		);
					// 		break;
					// 	default:
					// 		articles.push(
					// 			<p>Component not implemented</p>
					// 		);
					// }
				}
			}
		}

		let flag = '';
		let title = '';
		let subtitle = '';
		let targetLanguageCode = '';
		if (settings) {
			if (settings.flag) flag = `/images/${settings.flag}`;
			({ targetLanguageCode, title, subtitle } = settings);
			this.targetLanguageCode = targetLanguageCode;
		}

		return (
			<>
				<div className={`app ${this.targetLanguageCode ? this.targetLanguageCode : ''}`} key={`languageDiv`}>
					<ErrorLog
						dialog={this.dialog}
						errors={errors}
						clearLog={this.clearLog}
						clearError={this.clearError}
						refreshErrorLog={refreshErrorLog}
					/>
					<Header />
					<Congratulate
						className={`${showDialog ? 'show' : ''}`}
						enabled={settings ? settings.showCongratulations : null}
						hideDialog={this.hideDialog}
						content={dialogContent}
					/>
					<Congratulate
						className={`${showSpeechError ? 'show' : ''}`}
						enabled={true}
						hideDialog={this.hideSpeechError}
						id='SpeechSynthesisError'
						content={`This browser cannot perform speech synthesis. Please use a larger device and a browser such as Chrome`}
					/>
					{/* <div id='SpeechSynthesisError' key='SpeechSynthesisError'>This browser cannot perform speech synthesis. Please use another such as Chrome</div> */}
					{config ?
						<>
							<div id="content" key="content">
								<div id='hero' key='hero'>
									<Flag flag={resolveAsset(flag)} shadow={false} fix={'left'} />
									<h1>{title}</h1>
									<h2>{subtitle}</h2>
								</div>
								{this.renderMenu()}
								<Accordion id={`accordion1`} key={`accordion1`}>
									{/* <AccordionArticle
										id={`wordgrid1Accordion`}
										title={`Memory Match Game`}
									>
										<MemoryMatchGame />
									</AccordionArticle> */}
									{/* <AccordionArticle
										id={`wordgrid1Accordion`}
										title={`Word Grid`}
									>
										<WordGrid words={words} />
									</AccordionArticle> */}
									{/* <AccordionArticle
										id={`parentAccordion`}
										title={`Parent`}
									>
										<p>Parent accordion</p>
										<AccordionArticle
											id={`childAccordion`}
											title={`Child`}
										>
											<p>Child accordion</p>
											<AccordionArticle
												id={`grandchildAccordion`}
												title={`Grand Child`}
											>
												<p>Grand Child accordion</p>
											</AccordionArticle>
										</AccordionArticle>

									</AccordionArticle> */}
									<AccordionArticle
										id={`scratchAccordion1`}
										title={`Scratch 1`}
									>
										<>
											<ol>
												<li>
													More about adjectives: There are some adjectives ending in <b>f</b>, e.g. sport<b>if</b>, act<b>if</b>.
													The feminine form of such words ends in <b>-ve</b>.
													e.g. Mon frère est sport<b>if</b>.  Ma sœur est sporti<b>ve</b>.
												</li>
												<li><br/>
													<ol type="i">
														<li>The verb <b>faire</b>, meaning both 'to make' and 'to do', is a frequently occurring very  irregular verb. Here it is conjugated in the present tense:<br/>
															je <b>fais</b><br/>
															tu <b>fais</b><br/>
															il / elle <b>fait</b><br/>
															nous <b>faisons</b><br/>
															vous <b>faites</b><br/>
															ils / elles <b>font</b><br/>
														</li>
														<li>
															In English you can express what you do or make simply by adding the activity after the verb e.g. 'I do gymnastics' or
															'I do gardening' or 'I make cakes'. In French, you also need something called the partitive article:
															<b>du</b> for masculine nouns, <b>de la</b> for feminine nouns, <b>de l'</b> before a vowel or silent h and <b>des</b>
															for plurals.<br/>
															The partitive is usually translated by "some" or "any," i.e an unspecified amount, or is often left out entirely as in the examples below. <br/>
															<b>Je fais de la gymnastique</b> I do gymnastics    <br/>
															<b>Je fais du jardinage</b> I do gardening<br/>
															<b>Je fais des gâteaux</b> I make cakes<br/>
														</li>
													</ol>
												</li>
												<li>
													<br/>
													<ol type="i">
														<li>
															The regular <b>-er</b>  verb <b>jouer</b> meaning to play is useful when talking about pastimes.
															You use the partitive article after the verb <b>jouer</b> when speaking about playing a musical instrument:<br />
															<b>Je joue du piano</b>  I play the piano <br/>
															<b>Je joue de la clarinette</b> I play the clarinet
														</li>
														<li>
															When you use the verb <b>jouer</b> in the context of a ball game or tabletop game you can't use the partitive article nor can you use the definite article.<br />
															You use <b>jouer à</b>.  If the activity is masculine it's <b>jouer au</b>, if feminine, <b>jouer à la</b>,
															if  starting with a vowel or silent h then <b>jouer à l'</b> and for plurals <b>jouer aux</b>.<br/>
															<br/>
															e.g. Je joue au football I play football<br/>
															Je joue à la pétanque I play pétanque
														</li>
													</ol>
												</li>
												<li>
													The ending of a noun often helps you to know its gender. For example, all nouns ending <b>-tion</b> or  <b>-ie</b> are feminine.<br />
													e.g .l'action, la nation, la natation, la biologie,  la géographie, la sociologie  <br/>
													<br/>
													All nouns ending <b>-isme</b> are masculine.<br/>
													e.g. l'athlétisme, l'existentialisme, le socialisme
												</li>
											</ol>
										</>
									</AccordionArticle>
									<AccordionArticle
										id={`scratchAccordion2`}
										title={`Scratch 2`}
									>
										<>
											<p><b>How to pronounce: -tion</b> in French. In this combination the letter <b>t</b> is pronounced as if it were an <b>s</b>.</p>
											<p>Here are some examples of words containing or ending <b>–tion</b>.</p>
											<p>
												<span class='audio-link' sound-file='/sounds/fr/l&apos;action.mp3'>l'action</span>,&nbsp;
												<span class='audio-link' sound-file='/sounds/fr/l&apos;attention.mp3'>l'attention</span>,&nbsp;
												<span class='audio-link' sound-file='/sounds/fr/l&apos;équitation.mp3'>l'équitation</span>,&nbsp;
												<span class='audio-link' sound-file='/sounds/fr/l&apos;exposition.mp3'>l'exposition</span>,&nbsp;
												<span class='audio-link' sound-file='/sounds/fr/la natation.mp3'>la natation</span>,&nbsp;
												<span class='audio-link' sound-file='/sounds/fr/la nation.mp3'>la nation</span>,&nbsp;
												<span class='audio-link' sound-file='/sounds/fr/la nationalité.mp3'>la nationalité</span>,&nbsp;
												<span class='audio-link' sound-file='/sounds/fr/la situation.mp3'>la situation</span>
											</p>
										</>
									</AccordionArticle>
									{articles}
									{/* {dropdowns1 ? (
										<AccordionArticle
											id={`DropDowns1Accordion`}
											title={`Select the Correct Adjective of Nationality`}
										>
											<DropDowns
												config={dropdowns1}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{wordparts1 ? (
										<AccordionArticle
											id={`AccordionWordParts1Accordion`}
											title={`Select the parts of the words with the described sounds`}
										>
											<WordParts
												config={wordparts1}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{wordsIntoSlots2 ? (
										<AccordionArticle
											id={`AccordionWordsIntoSlots2Accordion`}
											title={`Match the Answers to the Questions`}
										>
											<Blanks
												config={wordsIntoSlots2}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>

									) : null}
									{wordsIntoSlots1 ? (
										<AccordionArticle
											id={`AccordionWordsIntoSlots1Accordion`}
											title={`Put the words in the Order You Hear Them`}
										>
											<Blanks
												config={wordsIntoSlots1}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>

									) : null}
									{phraseTable1 ? (
										<>
											<AccordionArticle
												id={`accordionPhraseTable1Accordion`}
												title={`Dialogues`}
											>
												<PhraseTable
													config={phraseTable1}
													logError={this.logError}
													showDialog={this.showDialog}
												/>
											</AccordionArticle>
										</>
									) : null}
									{vocabulary1 ? (
										<AccordionArticle
											id={`Vocabulary1Accordion`}
											title={`Vocabulary`}
										>
											<PhraseTable
												config={vocabulary1}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{monologues ? (
										<AccordionArticle
											id={`MonologuesAccordion`}
											title={`Monologues`}
										>
											<PhraseTable
												config={monologues}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{vocabulary2 ? (
										<AccordionArticle
											id={`Vocabulary2Accordion`}
											title={`Vocabulary`}
										>
											<PhraseTable
												config={vocabulary2}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{phrases1 ? (
										<AccordionArticle
											id={`Phrases1Accordion`}
											title={`Fill in the Blanks`}
										>
											<Blanks
												config={phrases1}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{phrases2 ? (
										<AccordionArticle
											id={`Phrases2Accordion`}
											title={`Fill in the Blanks`}
										>
											<Blanks
												config={phrases2}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{jigsaw1 ? (
										<AccordionArticle
											id={`Jigsaw1Accordion`}
											title={`Complete the Jigsaw`}
										>
											<Jigsaw
												config={jigsaw1}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{jigsaw2 ? (
										<AccordionArticle
											id={`Jigsaw2Accordion`}
											title={`Complete the Jigsaw`}
										>
											<Jigsaw
												config={jigsaw2}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{jigsaw3 ? (
										<AccordionArticle
											id={`Jigsaw3Accordion`}
											title={`Complete the Jigsaw`}
										>
											<Jigsaw
												config={jigsaw3}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null}
									{phrases3 ? (
										<AccordionArticle
											id={`phrases3Accordion`}
											title={`Fill in the blanks`}
										>
											<Blanks
												config={phrases3}
												logError={this.logError}
												showDialog={this.showDialog}
											/>
										</AccordionArticle>
									) : null} */}
								</Accordion>
							</div>
						</>
						:
						<div className={`no-config`}>
							<h1>No configuration parameter given of the form</h1>
							<h2>{`${window.location.href}/?config=config.json`}</h2>
						</div>
					}
					<Footer />
				</div>

			</>
		);
	};

	renderComponent = (value, articles) => {
		// console.log(`renderComponent`);
		// console.log(value);
		const { id, component, titleText } = value;
		// console.log(`component [${component}]`);
		// console.log("renderComponent id=", id);
		switch (component) {
			case 'AnswerTable': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<AnswerTable
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'Blanks': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<Blanks
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'DropDowns': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<DropDowns
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'Explanation': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<Explanation
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'Group': {
				const renderedGroupContent = new Array;
				const { content: groupContent = [] } = value;
				// console.log("groupContent", groupContent);

				groupContent.forEach((child) => {
					for (const [/* key */, v] of Object.entries(child)) {
						// console.log("v", v.id);
						this.renderComponent(v, renderedGroupContent);
					}
				});

				const {
					htmlContent,
					id,
				} = value;
				// console.log(`Group${id}Accordion`);
				articles.push(
					<AccordionArticle
						className={`group`}
						id={`Group${id}Accordion`}
						key={`Group${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						{htmlContent ? <div className={`html-content`} key={`html-content${id}`} dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
						{renderedGroupContent}
					</AccordionArticle>
				);
				break;
			}
			case 'Jigsaw': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<Jigsaw
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'MemoryMatchGame': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<MemoryMatchGame
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'Monologue': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<Monologue
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'PhraseTable': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<PhraseTable
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'ReadAloud': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<ReadAloud
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'WordGrid': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<WordGrid
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'WordParts': {
				articles.push(
					<AccordionArticle
						id={`${id}Accordion`}
						key={`${id}Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						title={titleText}
					>
						<WordParts
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			default: {
				articles.push(
					<p key={`notImplemented${id}`}>Component {component} not implemented</p>
				);
			}
		}
		// return articles;
	};

	renderMenu = () => {
		// console.log("renderMenu");
		const {
			currentLearningObject,
			learningObjects
		} = this.state;
		const renderedMenu = new Array;
		if (learningObjects !== undefined) {
			const nLearningObjects = learningObjects.length;
			const { href } = window.location;
			const [baseURL] = href.split('?');
			if (nLearningObjects > 6) {
				learningObjects.forEach((learningObject, index) => {
					// console.log("currentLearningObject", currentLearningObject, "nLearningObjects", nLearningObjects, "learningObject", learningObject.title, learningObject.file, window.location.href.split('?')[0]);
					switch (index) {
						case 0: {
							// First
							renderedMenu.push(
								<li
									className={`menu-item ${currentLearningObject === index ? 'highlight' : ''}`}
									key={`menu-item-${index}`}>
									<a
										href={`${baseURL}?config=${learningObject.file}`}
										onClick={() => this.selectLearningObject(index)}
									>{learningObject.title}</a>
								</li>
							);
							if (currentLearningObject >= 2) renderedMenu.push(
								<li className={`ellipses`} key={`ellipses-at-start`}>...</li>
							);
							break;
						}
						case nLearningObjects - 1: {
							// Last
							if (currentLearningObject <= nLearningObjects - 3) renderedMenu.push(
								<li className={`ellipses`} key={`ellipses-at-end`}>...</li>
							);
							renderedMenu.push(
								<li
									className={`menu-item ${currentLearningObject === index ? 'highlight' : ''}`}
									key={`menu-item-${index}`}>
									<a
										href={`${baseURL}?config=${learningObject.file}`}
										onClick={() => this.selectLearningObject(index)}
									>{learningObject.title}</a>
								</li>
							);
							break;
						}
						case currentLearningObject - 1:
						case currentLearningObject:
						case currentLearningObject + 1: {
							renderedMenu.push(
								<li
									className={`menu-item ${currentLearningObject === index ? 'highlight' : ''}`}
									key={`menu-item-${index}`}>
									<a
										href={`${baseURL}?config=${learningObject.file}`}
										onClick={() => this.selectLearningObject(index)}
									>{learningObject.title}</a>
								</li>
							);
							break;
						}
					}
				});
			}else {
				learningObjects.forEach((learningObject, index) => {
					renderedMenu.push(
						<li
							className={`menu-item ${currentLearningObject === index ? 'highlight' : ''}`}
							key={`menu-item-${index}`}
							onClick={() => this.selectLearningObject(index)}
						>
							<a
								href={`${baseURL}?config=${learningObject.file}`}
							>{learningObject.title}</a>
						</li>
					);
				});
			}
		}
		return (
			<ul className={`main-menu`}>{renderedMenu}</ul>
		);
	};

	selectLearningObject = (index) => {
		console.log("selectLearningObject", index);
		this.setState({
			currentLearningObject: index,
		});
		sessionStorage.setItem("currentLearningObject", index);
	};

	showDialog = (content) => {
		this.setState({
			dialogContent: content,
			showDialog: true,
		});
	};
}

