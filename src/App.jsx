import './App.scss';
import {
	Accordion,
	AccordionArticle,
	AnswerTable,
	AudioClip,
	Blanks,
	Congratulate,
	DropDowns,
	ErrorLog,
	Explanation,
	Figure,
	Flag,
	Footer,
	Header,
	Info,
	Jigsaw,
	LandingPage,
	LearningObjectMenu,
	MainMenu,
	MemoryMatchGame,
	Monologue,
	PhraseTable,
	RadioQuiz,
	RadioTest,
	ReadAloud,
	Section,
	Social,
	WordGrid,
	WordParts,
} from './Components';
import {
	handleResponse,
	handleSpecialLinkClick,
	isTouchChrome,
	playAudioLink,
	// resolveAsset,
	speak,
} from './utility';
import { AllCustomComponentsFR } from './Components/CustomComponents_FR/index.js';
import { AllCustomComponentsSP } from './Components/CustomComponents_SP/index.js';

import React from 'react';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		const queryString = window.location.search;

		const urlParams = new URLSearchParams(queryString);

		const languageCode = urlParams.get('lang');
		// console.log("constructor languageCode", languageCode);

		this.state = ({
			dialogContent: '',
			errors: [],
			languageCode: languageCode,
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

		const urlParams = new URLSearchParams(queryString);

		// const languageCode = urlParams.get('lang');
		const { languageCode } = this.state;
		// console.log("componentDidMount languageCode", languageCode);

		const learningObjectConfigFile = urlParams.get('lo');

		let configPromise;
		if (languageCode) {
			this.loadIndex(learningObjectConfigFile, languageCode);
		}
		if (learningObjectConfigFile && languageCode) {
			configPromise = this.loadConfig(`./src/learningObjectConfigurations/${languageCode}/${learningObjectConfigFile}.json`, learningObjectConfigFile);
			this.initialiseSpecialAnchors();

			configPromise.then(this.initialiseSynth);
		}
	};

	componentDidUpdate = () => {
		// console.log("componentDidUpdate");

		this.initialiseSpecialAnchors();
	};

	expandAllAccordions = () => {

		console.log("expandAllAccordions"); // eslint-disable-line
		// Not good as it does not affect state of accordion, in particular 'expanded' true/false.
		const closedArticles = document.querySelectorAll('article.accordion-article:not(.expanded)');
		const closedArrows = document.querySelectorAll('div.arrow:not(.expanded)');
		// console.log("closedArticles", closedArticles); // eslint-disable-line
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
		// console.log("anchors.length", anchors.length);
		anchors.forEach((anchor) => {
			// console.log("anchor", anchor);
			if (anchor.setup) {
				// Do nowt!
			} else {
				anchor.addEventListener('click', (e) => handleSpecialLinkClick(e));
			}
			anchor.setup = true;
		});
		const targets = document.querySelectorAll('.special-anchor-target');
		targets.forEach((target) => {
			// console.log("anchor", anchor);
			if (target.setup) {
				// Do nowt!
			} else {
				target.addEventListener('click', (e) => e.preventDefault);
			}
			target.setup = true;
		});


	};

	initialiseSpeeches = (synth, targetLanguageCode, voices) => {
		// console.log("initialiseSpeeches", targetLanguageCode, synth, voices);

		// console.log("initialiseSpeeches", voices.length);
		const speeches = document.querySelectorAll('.speak');
		speeches.forEach((speech) => {
			if (targetLanguageCode && synth && voices && voices.length >= 1) {
				console.error("There's a '.speak' that I missed"); // eslint-disable-line
				// console.log("Setting speeches", voices.length);
				if (speech.setup !== true && speech.getAttribute('setup') !== true){
					// Do nowt!
				// } else {
					// speech.setAttribute('title', 'Click to play sound');
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
			// console.log(audioLink.getAttribute('sound-file'));
			if (audioLink.setup !== true && audioLink.getAttribute('setup') !== true) {
				const soundFile = audioLink.getAttribute('sound-file');
				// console.log("soundFile", soundFile);
				if (soundFile !== null){ // i.e. not fully loaded yet
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
			voices.sort((a, b) => a.lang.localeCompare(b.lang, undefined, { sensitivity: 'base' }));

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

	loadConfig = (configFile, learningObjectConfigFile) => {
		// console.log("loadConfig", configFile);

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
					// console.log("config loaded...");
					delete res["settings"];
					const {
						class: configClass,
						targetLanguageCode,
						// title,
					} = settings;
					// document.title = title;
					if (configClass)document.getElementsByTagName('html')[0].classList.add(configClass);

					const currentLearningObject = learningObjectConfigFile;

					// 🔁 Return a Promise that resolves only when setState is done
					this.setState({
						config: { ...res },
						currentLearningObject: currentLearningObject,
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

	loadIndex = (LO, languageCode) => {
		// console.log("loadIndex", LO, languageCode);

		// Read the index file
		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const requestOptions = {
			headers: headers,
			method: 'GET',
			redirect: 'follow',
		};

		let currentLearningObject;// = 0;
		if (LO !== undefined && !isNaN(LO)) {
			currentLearningObject = LO - 1;
		}else{
			if (sessionStorage.getItem("currentLearningObject")) currentLearningObject = parseInt(sessionStorage.getItem("currentLearningObject"));
		}
		fetch(`./src/index-${languageCode}.json`, requestOptions)
			.then(handleResponse)
			.then(res => {
				// console.log("res", res);
				const { learningObjects } = res;
				let title, subTitle;
				if (learningObjects[currentLearningObject]) {
					// console.log("BINGO!");
					({ subTitle, title } = learningObjects[currentLearningObject]);
					document.title = title;
				}

				this.setState({
					currentLearningObject: currentLearningObject,
					learningObjects: learningObjects,
					subTitle: subTitle,
					title: title,
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
			currentLearningObject,
			dialogContent,
			errors,
			languageCode,
			learningObjects = [],
			refreshErrorLog,
			showDialog = false,
			settings,
			showSpeechError = false,
		} = this.state;
		const articles = new Array;
		let intro, introHTML, informationHTML;
		if (settings) {
			({ intro, introHTML, informationHTML } = settings);
		}


		// We have 2 ways to approach this:
		// 1. What you can see here is a solution which relies totally on content from config.json.
		// Each definition corresponds to a component type (as indicated in config.json).
		// This code loads those components into the articles array.
		// 2. The alternative is to uncomment the commented lines in the setting from state block above and
		// uncomment the hard-coded components in the returned render below. This allows for more ad-hoc html inclusions,
		// but does mean that the whole thing has to be hard-coded.
		// console.log("render currentLearningObject", currentLearningObject, "languageCode", languageCode, "learningObjects", learningObjects);
		if (config) {
			for (const [/* key */, value] of Object.entries(config)) {
				// console.log(key, value);
				const { component } = value;
				if (component) {
					this.renderComponent(value, articles);
				}
			}
		}

		// let flag = '';
		let subTitle;
		let title;
		if (learningObjects[currentLearningObject]) {
			// console.log("BINGO!", currentLearningObject, learningObjects[currentLearningObject]);
			({ subTitle, title } = learningObjects[currentLearningObject - 1]);
		}
		// console.log("title", title, "subTitle", subTitle);

		// let subTitle = '';
		let targetLanguageCode = '';
		if (settings) {
			// if (settings.flag) flag = `/images/${settings.flag}`;
			({ targetLanguageCode/* , title, subTitle*/ } = settings);
			this.targetLanguageCode = targetLanguageCode;
		}

		// console.log("render languageCode", languageCode, "learningObjects", learningObjects, learningObjects.length, "currentLearningObject", currentLearningObject);
		return (
			<>

				<div className={`app ${this.targetLanguageCode ? this.targetLanguageCode : ''}`} key={`languageDiv`}>
					<a className={`special-anchor-target`} name={`special-anchor-top`}/>
					<ErrorLog
						dialog={this.dialog}
						errors={errors}
						clearLog={this.clearLog}
						clearError={this.clearError}
						refreshErrorLog={refreshErrorLog}
					/>
					{/* <Header /> */}
					{/* <div className={`top-menu`}>
						<a className={`special-anchor`} href={`#top`}>{subTitle}</a>
						<ul id='topMenu'>{topMenu}</ul>
					</div> */}
					<MainMenu
						config={config}
						subTitle={subTitle}
					/>
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
					{languageCode !== undefined ?
						<>
							<div id="content" key="content">
								<div id='fontSamples'>
									<h1>Heading 1 Feijoa Bold</h1>
									<h2>Heading 2 Feijoa Medium</h2>
									<h3>Heading 3 Feijoa Medium</h3>
									<h4>Heading 4 Feijoa Medium</h4>
									<h5>Heading 5 OpenSans SemiBold</h5>
									<h6>Heading 6 OpenSans SemiBold</h6>
									<p>Bodycopy, Hyperlinks Opensans Regular</p>
									<figure>
										<img
											src={`images/bsc_logo_flat.svg`}
											title={`BSC logo`}
											style={{ width: '60px'}}
										/>
										<figcaption>Captions Opensans Regular</figcaption>
									</figure>
									<Info>
										<p>Children</p>
									</Info>
									<Info informationText={'Information Text'}/>
									<Info informationTextHTML={'<p>Information Text <b>HTML</b></p>'}/>
								</div>
								{/* <div id='hero' key='hero'>
										<Flag flag={resolveAsset(flag)} shadow={false} fix={'left'} />
										<h1>{title}</h1>
										<h2>{subTitle}</h2>
									</div> */}
								<div id="hero">
									<div className="hero bg-base-200  w-full">
										<div className="hero-content text-center">
											<div className="w-full">
												<h1 className="text-5xl font-bold">{title}</h1>
												<h1 className="text-5xl font-bold">{subTitle}</h1>
											</div>
										</div>
									</div>
								</div>
								{/* {this.renderMenu()} */}
								<LearningObjectMenu
									currentLearningObject={currentLearningObject}
									languageCode={languageCode}
									learningObjects={learningObjects}
								/>
								<div className={`intro`} name={`intro`}>
									<a className={`special-anchor-target`} name={`special-anchor-intro`} id={`special-anchor-intro`} >
										<h2>Introduction</h2>
									</a>
									{intro ? <p className={`intro`}>{intro}</p> : null}
									{introHTML ? <p className={`intro`} dangerouslySetInnerHTML={{ __html: introHTML }} /> : null}
									{informationHTML ? <Info id={currentLearningObject} informationTextHTML={informationHTML} /> : null}
								</div>
								{/* <label>Test: <input type='checkbox'/></label> */}
								{currentLearningObject !== -1 ?
									<Accordion id={`accordion1`} key={`accordion1`}>
										{articles}
									</Accordion>
									:
									null
								}
								{(learningObjects.length > 0) && (currentLearningObject === -1) ?
									<LandingPage
										languageCode={languageCode}
										learningObjects={learningObjects}
									/>
									:
									null
								}

							</div>
						</>
						:
						<div className={`no-config`}>
							<h1>No configuration parameter given of the form</h1>
							<h2>{`${window.location.host}${window.location.pathname}?lang=fr&lo=3`}</h2>
							<p>Where '3' in this example is the learning object number or index. If absent, but language is the landing page is shown</p>
						</div>
					}
					<Social />
					<Footer />
				</div>

			</>
		);
	};

	renderComponent = (value, articles) => {
		const {
			id,
			component,
			infoText,
			infoTextHTML,
			titleText = '',
			titleTextHTML = ''
		} = value;
		const { expandable = true } = value;

		const {
			currentLearningObject,
			languageCode
		} = this.state;
		// console.log("renderComponent currentLearningObject", currentLearningObject);
		const compoundID = `LO${currentLearningObject}-${id}`;
		switch (component) {
			case 'AnswerTable': {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => { window.refs.push(AccordionArticle); }}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
					>
						<AnswerTable
							config = {value}
							logError = {this.logError}
							showDialog = {this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'Blanks': {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
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
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
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
				if (expandable) {
					articles.push(
						<AccordionArticle
							config={value}
							id={`${compoundID}-Accordion`}
							key={`${compoundID}-Accordion`}
							ref={AccordionArticle => { window.refs.push(AccordionArticle); }}
							target={id}
							title={titleText}
							titleHTML={titleTextHTML}
						>
							<Explanation
								config={value}
								logError={this.logError}
								showDialog={this.showDialog}
							/>
						</AccordionArticle>
					);
				} else {
					articles.push(
						<Section
							config={value}
							id={`${compoundID}-Section`}
							key={`${compoundID}-Section`}
							target={id}
							title={titleText}
							titleHTML={titleTextHTML}
						>
							<Explanation
								config={value}
								logError={this.logError}
								showDialog={this.showDialog}
							/>
						</Section>
					);
				}
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
					id,
				} = value;
				if (expandable) {
					articles.push(
						<AccordionArticle
							config={value}
							className={`group`}
							id={`${compoundID}-Group-Accordion`}
							key={`${compoundID}-Group-Accordion`}
							ref={AccordionArticle => { window.refs.push(AccordionArticle); }}
							target={id}
							title={titleText}
							titleHTML={titleTextHTML}
						>
							<Info informationText={infoText} informationTextHTML={infoTextHTML}/>
							{renderedGroupContent}
						</AccordionArticle>
					);
				} else {
					articles.push(
						<Section
							config={value}
							className={`group`}
							id={`${compoundID}-Group-Section`}
							key={`${compoundID}-Group-Section`}
							target={id}
							title={titleText}
							titleHTML={titleTextHTML}
						>
							<Info informationText={infoText} informationTextHTML={infoTextHTML}/>
							{renderedGroupContent}
						</Section>
					);

				}
				break;
			}
			case 'Jigsaw': {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
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
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
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
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
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
				if (expandable) {
					articles.push(
						<AccordionArticle
							config={value}
							id={`${compoundID}-Accordion`}
							key={`${compoundID}-Accordion`}
							ref={AccordionArticle => { window.refs.push(AccordionArticle); }}
							target={id}
							title={titleText}
							titleHTML={titleTextHTML}
						>
							<PhraseTable
								config={value}
								logError={this.logError}
								showDialog={this.showDialog}
							/>
						</AccordionArticle>
					);
				} else {
					articles.push(
						<Section
							config={value}
							id={`${compoundID}-Section`}
							key={`${compoundID}-Section`}
							// ref={AccordionArticle => { window.refs.push(AccordionArticle); }}
							target={id}
							title={titleText}
							titleHTML={titleTextHTML}
						>
							<PhraseTable
								config={value}
								logError={this.logError}
								showDialog={this.showDialog}
							/>
						</Section>
					);
				}
				break;
			}
			case 'RadioQuiz': {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
					>
						<RadioQuiz
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case 'RadioTest': {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
					>
						<RadioTest
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
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
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
			case 'Section': {
				const renderedSectionContent = new Array;
				const { content: sectionContent = [] } = value;
				// console.log("sectionContent", sectionContent);

				sectionContent.forEach((child) => {
					for (const [/* key */, v] of Object.entries(child)) {
						// console.log("v", v.id);
						this.renderComponent(v, renderedSectionContent);
					}
				});

				const {
					id,
				} = value;

				articles.push(
					<Section
						config={value}
						className={`section`}
						id={`${compoundID}-Section-Section`}
						key={`${compoundID}-Section-Section`}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
					>
						{renderedSectionContent}
					</Section>
				);
				break;
			}
			case 'WordGrid': {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
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
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={AccordionArticle => {window.refs.push(AccordionArticle);}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
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
				// console.log("Component name:", component);
				// console.log("AllCustomComponentsFR", AllCustomComponentsFR);
				let CustomComponent;
				switch (languageCode) {
					case 'fr': {
						CustomComponent = AllCustomComponentsFR[component];
						break;
					}
					case 'sp': {
						CustomComponent = AllCustomComponentsSP[component];
						break;
					}
					default: {
						CustomComponent = AllCustomComponentsFR[component];
						break;
					}
				}
				// console.log(component.slice(0, 4), component);
				if (CustomComponent) {
					if (expandable) {
						articles.push(
							<AccordionArticle
								config={value}
								id={`${compoundID}-Accordion`}
								key={`${compoundID}-Accordion`}
								ref={AccordionArticle => { window.refs.push(AccordionArticle); }}
								target={id}
								title={titleText}
								titleHTML={titleTextHTML}
							>
								<Info informationText={infoText} informationTextHTML={infoTextHTML}/>
								<CustomComponent
									id={id}
									showDialog={this.showDialog}
								/>
							</AccordionArticle>
						);
					} else {
						articles.push(
							<Section
								config={value}
								id={`${compoundID}-Section`}
								key={`${compoundID}-Section`}
								// ref={AccordionArticle => { window.refs.push(AccordionArticle); }}
								target={id}
								title={titleText}
								titleHTML={titleTextHTML}
							>
								<CustomComponent
									id={id}
									showDialog={this.showDialog}
								/>
							</Section>

						);
					}
				} else if(component.slice(0, 4) === 'HIDE') {
					// articles.push(
					// 	<p>HIDE</p>
					// );
				} else {
					articles.push(
						<p key={`notImplemented${id}`}>Component {component} not implemented</p>
					);
					// console.log(`Component ${component} not implemented`);
				}
			}
		}
		// return articles;
	};

	selectLearningObject = (index) => {
		// console.log("selectLearningObject", index);
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

