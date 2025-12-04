import "./App.scss";
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
	IconButton,
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
	Sortable,
	WordGrid,
	WordParts,
} from "./Components";
import {
	handleResponse,
	handleSpecialLinkClick,
	isTouchChrome,
	playAudioLink,
	scrollBack,
	speak,
} from "./utility";
import{
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";

import { AllCustomComponentsFR } from "./Components/CustomComponents_FR/index.js";
import { AllCustomComponentsSP } from "./Components/CustomComponents_SP/index.js";
import DOMPurify from "dompurify";

import React from "react";


export default class App extends React.Component {
	constructor(props) {
		super(props);

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const languageCode = urlParams.get("lang");

		this.state = {
			dark: false,
			dialogContent: "",
			errors: [],
			languageCode: languageCode,
			showDialog: false,
		};

		this.loadConfig = this.loadConfig.bind(this);
		this.loadIndex = this.loadIndex.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
		this.hideSpeechError = this.hideSpeechError.bind(this);
		this.initialiseSpeeches = this.initialiseSpeeches.bind(this);
		this.initialiseSynth = this.initialiseSynth.bind(this);
		this.renderComponent = this.renderComponent.bind(this);
		this.selectLearningObject = this.selectLearningObject.bind(this);
		this.toggleDark = this.toggleDark.bind(this);

		window.refs = [];
		this.backLink = 0;
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
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		const { languageCode } = this.state;
		const learningObjectConfigFile = urlParams.get("lo");

		let configPromise;
		if (languageCode) {
			this.loadIndex(learningObjectConfigFile, languageCode);
		}
		if (learningObjectConfigFile && languageCode) {
			configPromise = this.loadConfig(
				`./src/learningObjectConfigurations/${languageCode}/${learningObjectConfigFile}.json`,
				learningObjectConfigFile
			);
			this.initialiseSpecialAnchors();

			configPromise.then(this.initialiseSynth);
		}
		if (sessionStorage.getItem(`dark`)) {
			const dark = JSON.parse(sessionStorage.getItem(`dark`));
			if (dark) this.setDark(true);
		}

	};

	componentDidUpdate = () => {
		this.initialiseSpecialAnchors();
	};

	expandAllAccordions = () => {
    console.log("expandAllAccordions"); // eslint-disable-line
		const closedArticles = document.querySelectorAll(
			"article.accordion-article:not(.expanded)"
		);
		const closedArrows = document.querySelectorAll(
			"div.arrow:not(.expanded)"
		);
		closedArticles.forEach((closedArticle) => {
			closedArticle.classList.add("expanded");
		});
		closedArrows.forEach((closedArrow) => {
			closedArrow.classList.add("expanded");
		});
	};

	hideDialog = () => {
		this.setState({
			dialogContent: "",
			showDialog: false,
		});
	};

	hideSpeechError = () => {
		this.setState({
			dialogContent: "",
			showSpeechError: false,
		});
	};

	initialiseSpecialAnchors = () => {
		const anchors = document.querySelectorAll(".special-anchor");
		anchors.forEach((anchor) => {
			if (anchor.setup) {
				// do nothing
			} else {
				if (!anchor.classList.contains('nav')) anchor.addEventListener("click", (e) => handleSpecialLinkClick(e));
			}
			anchor.setup = true;
		});
		const targets = document.querySelectorAll(".special-anchor-target");
		targets.forEach((target) => {
			if (target.setup) {
				// do nothing
			} else {
				target.addEventListener("click", (e) => e.preventDefault());
			}
			target.setup = true;
		});
	};

	initialiseSpeeches = (synth, targetLanguageCode, voices) => {
		const speeches = document.querySelectorAll(".speak");
		speeches.forEach((speech) => {
			if (targetLanguageCode && synth && voices && voices.length >= 1) {
        console.error("There's a '.speak' that I missed"); // eslint-disable-line
				if (
					speech.setup !== true &&
          speech.getAttribute("setup") !== true
				) {
					speech.setAttribute("aria-label", "Non-selectable text");
					speech.setAttribute("setup", "true");
					speech.addEventListener("click", (e) =>
						speak(e, synth, targetLanguageCode, voices)
					);
					speech.setup = true;
				}
			}
		});

		const audioLinks = document.querySelectorAll(".audio-link");
		audioLinks.forEach((audioLink) => {
			if (audioLink.setup !== true && audioLink.getAttribute("setup") !== true) {
				const soundFile = audioLink.getAttribute("sound-file");
				if (soundFile !== null) {
					audioLink.setAttribute("setup", "true");
					audioLink.addEventListener("click", () =>
						playAudioLink(soundFile)
					);
					audioLink.setup = true;
				}
			}
		});
	};

	initialiseSynth = () => {
		const { targetLanguageCode } = this.state;
		const synth = window.speechSynthesis;

		const mediaContent = window
			.getComputedStyle(document.body, "::before")
			.getPropertyValue("content");

		const isFirefox = /firefox/i.test(navigator.userAgent);

		const sortVoices = (voices) =>
			voices.sort((a, b) =>
				a.lang.localeCompare(b.lang, undefined, { sensitivity: "base" })
			);

		const filterVoicesByLang = (voices, lang) =>
			voices.filter((voice) => voice.lang === lang);

		const enableSpeech = (voices) => {
			const filteredVoices = filterVoicesByLang(
				sortVoices(voices),
				targetLanguageCode
			);
			this.initialiseSpeeches(synth, targetLanguageCode, filteredVoices);
			document.documentElement.classList.add("can-speak");
			this.setState({ showSpeechError: false });
		};

		if (isFirefox) {
			setTimeout(() => {
				const voices = synth.getVoices();
				enableSpeech(voices);
			}, 1000);
		}

		synth.onvoiceschanged = () => {
			if (
				(mediaContent[1] === "S" || mediaContent[1] === "M") &&
        isTouchChrome()
			) {
				// Chrome touch workaround, do nothing
			} else {
				const voices = synth.getVoices();
				enableSpeech(voices);
			}
		};
	};

	loadConfig = (configFile, learningObjectConfigFile) => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const requestOptions = {
			headers: headers,
			method: "GET",
			redirect: "follow",
		};

		return new Promise((resolve, reject) => {
			fetch(`${configFile}`, requestOptions)
				.then(handleResponse)
				.then((res) => {
					const { settings } = res;
					delete res["settings"];
					const {
						class: configClass,
						targetLanguageCode,
					} = settings;
					if (configClass)
						document
							.getElementsByTagName("html")[0]
							.classList.add(configClass);

					const currentLearningObject = learningObjectConfigFile;

					this.setState(
						{
							config: { ...res },
							currentLearningObject: currentLearningObject,
							settings: { ...settings },
							targetLanguageCode,
						},
						() => resolve({ targetLanguageCode })
					);
				})
				.catch((error) => {
					const action = `Loading configuration`;
					this.logError(action, error);
					reject();
				});
		});
	};

	loadIndex = (LO, languageCode) => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const requestOptions = {
			headers: headers,
			method: "GET",
			redirect: "follow",
		};

		let currentLearningObject;
		if (LO !== undefined && !isNaN(LO)) {
			currentLearningObject = LO - 1;
		} else {
			if (sessionStorage.getItem("currentLearningObject"))
				currentLearningObject = parseInt(
					sessionStorage.getItem("currentLearningObject")
				);
		}
		fetch(`./src/index-${languageCode}.json`, requestOptions)
			.then(handleResponse)
			.then((res) => {
				const { learningObjects } = res;
				let title, subTitle;
				if (learningObjects[currentLearningObject]) {
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
			.catch((error) => {
				const action = `Loading index`;
				this.logError(action, error);
			});
	};

	logError = (action, ...params) => {
		const { errors, refreshErrorLog } = this.state;
		if (params.length === 1) {
			const [error] = params;
			const {
				detail,
				error_code: errorCode,
				error_message: errorMessage,
				message,
				status,
				statusText = "",
			} = error;
			let Message = "";
			let Status = "";
			if (errorCode && errorMessage) {
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
			const [statusCode = "", statusText = "", message = ""] = params;

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

	setDark = (dark) => {
		if (typeof document === "undefined") return;
		document.documentElement.classList.toggle("dark", dark);
	};

	toggleDark = () => {

		let dark = false;

		if (sessionStorage.getItem(`dark`)) dark = JSON.parse(sessionStorage.getItem(`dark`));

		this.setDark(!dark);
		// const html = document.getElementsByName('html');
		// const cl = html.classList;

		// console.log("html", html, cl);
		this.setState({ dark: !dark },
			sessionStorage.setItem('dark', !dark)
		);
	};

	/**
   * NEW: renderComponentForTab
   * Returns "bare" content for a component (no AccordionArticle / Section wrapper)
   * so that we can render it as a tab panel inside a Group.
   */
	renderComponentForTab = (value) => {
		const {
			component,
			id,
			infoText,
			infoTextHTML,
			titleText = "",
			titleTextHTML = "",
		} = value;

		const { languageCode } = this.state;

		switch (component) {
			case "AnswerTable":
				return (
					<AnswerTable
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "Blanks":
				return (
					<Blanks
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "DropDowns":
				return (
					<DropDowns
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "Explanation":
				return (
					<>
						<Info informationText={infoText} informationTextHTML={infoTextHTML} />
						<Explanation
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</>
				);
			case "Jigsaw":
				return (
					<Jigsaw
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "MemoryMatchGame":
				return (
					<MemoryMatchGame
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "Monologue":
				return (
					<Monologue
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "PhraseTable":
				return (
					<PhraseTable
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
						languageCode={languageCode}
					/>
				);
			case "RadioQuiz":
				return (
					<RadioQuiz
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "RadioTest":
				return (
					<RadioTest
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "ReadAloud":
				return (
					<ReadAloud
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "Sortable":
				return (
					<Sortable
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "WordGrid":
				return (
					<WordGrid
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			case "WordParts":
				return (
					<WordParts
						config={value}
						logError={this.logError}
						showDialog={this.showDialog}
					/>
				);
			default: {
				let CustomComponent;
				switch (languageCode) {
					case "fr":
						CustomComponent = AllCustomComponentsFR[component];
						break;
					case "sp":
						CustomComponent = AllCustomComponentsSP[component];
						break;
					default:
						CustomComponent = AllCustomComponentsFR[component];
						break;
				}
				if (CustomComponent) {
					return (
						<>
							<Info
								informationText={infoText}
								informationTextHTML={infoTextHTML}
							/>
							<CustomComponent id={id} showDialog={this.showDialog} />
						</>
					);
				}
				return (
					<p>Component {component} not implemented</p>
				);
			}
		}
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
		const articles = [];
		let intro, introHTML, informationHTML;
		if (settings) {
			({ intro, introHTML, informationHTML } = settings);
		}

		if (config) {
			for (const [/* key */, value] of Object.entries(config)) {
				const { component } = value;
				if (component) {
					this.renderComponent(value, articles);
				}
			}
		}

		let subTitle;
		let title;
		if (learningObjects[currentLearningObject]) {
			({ subTitle = "", title } =
        learningObjects[currentLearningObject - 1] || {});
		}

		let targetLanguageCode = "";
		if (settings) {
			({ targetLanguageCode } = settings);
			this.targetLanguageCode = targetLanguageCode;
		}

		return (
			<>
				<div
					className={`app ${this.targetLanguageCode ? this.targetLanguageCode : ""}`}
					key={`languageDiv`}
				>
					<a
						className={`special-anchor-target`}
						id={`special-anchor-top`}
						name={`special-anchor-top`}
					/>
					<IconButton
						id={`backToLinkButton`}
						size={`sm`}
						theme={`back`}
						className={`back-to-link-button cursor-pointer`}
						onClick={scrollBack}>Back to link</IconButton>
					<ErrorLog
						dialog={this.dialog}
						errors={errors}
						clearLog={this.clearLog}
						clearError={this.clearError}
						refreshErrorLog={refreshErrorLog}
					/>

					<MainMenu
						config={config}
						subTitle={subTitle}
						toggleDark={this.toggleDark}
					/>

					<Congratulate
						className={`${showDialog ? "show" : ""}`}
						enabled={settings ? settings.showCongratulations : null}
						hideDialog={this.hideDialog}
						content={dialogContent}
					/>
					<Congratulate
						className={`${showSpeechError ? "show" : ""}`}
						enabled={true}
						hideDialog={this.hideSpeechError}
						id="SpeechSynthesisError"
						content={`This browser cannot perform speech synthesis. Please use a larger device and a browser such as Chrome`}
					/>

					{languageCode !== undefined ? (
						<>
							<div id="content" key="content">
								<div id="fontSamples">
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
											style={{ width: "60px" }}
										/>
										<figcaption>Captions Opensans Regular</figcaption>
									</figure>
									<Info>
										<p>Children</p>
									</Info>
									<Info informationText={"Information Text"} />
									<Info
										informationTextHTML={
											"<p>Information Text <b>HTML</b></p>"
										}
									/>
								</div>

								<div id="hero">
									<div className="hero bg-base-200  w-full">
										<div className="hero-content text-center">
											<div className="w-full">
												<h1 className="text-5xl font-bold">{title}</h1>
												<h1 className="text-5xl font-bold">
													{subTitle}
												</h1>
											</div>
										</div>
									</div>
								</div>

								<LearningObjectMenu
									currentLearningObject={currentLearningObject}
									languageCode={languageCode}
									learningObjects={learningObjects}
								/>

								<div className={`intro`} name={`intro`}>
									<a
										className={`special-anchor-target`}
										name={`special-anchor-intro`}
										id={`special-anchor-intro`}
									>
										<h2>Introduction</h2>
									</a>
									{intro ? (
										<p className={`intro`}>{intro}</p>
									) : null}
									{introHTML ? (
										<p
											className={`intro`}
											dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(introHTML) }}
										/>
									) : null}
									{informationHTML ? (
										<Info
											id={currentLearningObject}
											informationTextHTML={informationHTML}
										/>
									) : null}
								</div>

								{currentLearningObject !== -1 ? (
									<Accordion id={`accordion1`} key={`accordion1`}>
										{articles}
									</Accordion>
								) : null}
								{learningObjects.length > 0 &&
                currentLearningObject === -1 ? (
										<LandingPage
											languageCode={languageCode}
											learningObjects={learningObjects}
										/>
									) : null}
							</div>
						</>
					) : (
						<div className={`no-config`}>
							<h1>No configuration parameter given of the form</h1>
							<h2>{`${window.location.host}${window.location.pathname}?lang=fr&lo=3`}</h2>
							<p>
                Where &apos;3&apos; in this example is the learning object
                number or index. If absent, but language is the landing
                page is shown
							</p>
						</div>
					)}
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
			titleText = "",
			titleTextHTML = "",
		} = value;
		const { expandable = true } = value;

		const { currentLearningObject, languageCode } = this.state;
		const compoundID = `LO${currentLearningObject}-${id}`;

		switch (component) {
			case "AnswerTable": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
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
			case "Blanks": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
			case "DropDowns": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
			case "Explanation": {
				if (expandable) {
					articles.push(
						<AccordionArticle
							config={value}
							id={`${compoundID}-Accordion`}
							key={`${compoundID}-Accordion`}
							ref={(AccordionArticle) => {
								window.refs.push(AccordionArticle);
							}}
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
			case "Group": {
				const renderedGroupContent = [];
				const { content: groupContent = [] } = value;
				const { id: groupId, displayAsTabs = false } = value;

				if (!displayAsTabs) {
					// ORIGINAL BEHAVIOUR: children as sub-accordions/sections
					groupContent.forEach((child) => {
						for (const [/* key */, v] of Object.entries(child)) {
							this.renderComponent(v, renderedGroupContent);
						}
					});

					if (expandable) {
						articles.push(
							<AccordionArticle
								config={value}
								className={`group`}
								id={`${compoundID}-Group-Accordion`}
								key={`${compoundID}-Group-Accordion`}
								ref={(AccordionArticle) => {
									window.refs.push(AccordionArticle);
								}}
								target={groupId}
								title={titleText}
								titleHTML={titleTextHTML}
							>
								<Info
									informationText={infoText}
									informationTextHTML={infoTextHTML}
								/>
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
								target={groupId}
								title={titleText}
								titleHTML={titleTextHTML}
							>
								<Info
									informationText={infoText}
									informationTextHTML={infoTextHTML}
								/>
								{renderedGroupContent}
							</Section>
						);
					}
				} else {
					// NEW BEHAVIOUR: children rendered as tabs
					const tabItems = [];
					let defaultTabValue = null;

					groupContent.forEach((child, index) => {
						for (const [/* key */, v] of Object.entries(child)) {
							const childId = v.id || `child-${index}`;
							const tabValue = childId;
							if (defaultTabValue === null) defaultTabValue = tabValue;

							const tabLabel =
                v.menuText ||
                v.titleText ||
                (typeof v.titleTextHTML === "string"
                	? v.titleTextHTML.replace(/<[^>]+>/g, "")
                	: "") ||
                childId;

							const contentNode = this.renderComponentForTab(v);

							tabItems.push({
								value: tabValue,
								label: tabLabel,
								content: contentNode,
							});
						}
					});

					const outerWrapper = (inner) =>
						expandable ? (
							<AccordionArticle
								config={value}
								className={`group`}
								id={`${compoundID}-Group-Accordion`}
								key={`${compoundID}-Group-Accordion`}
								ref={(AccordionArticle) => {
									window.refs.push(AccordionArticle);
								}}
								target={groupId}
								title={titleText}
								titleHTML={titleTextHTML}
							>
								<Info
									informationText={infoText}
									informationTextHTML={infoTextHTML}
								/>
								{inner}
							</AccordionArticle>
						) : (
							<Section
								config={value}
								className={`group`}
								id={`${compoundID}-Group-Section`}
								key={`${compoundID}-Group-Section`}
								target={groupId}
								title={titleText}
								titleHTML={titleTextHTML}
							>
								<Info
									informationText={infoText}
									informationTextHTML={infoTextHTML}
								/>
								{inner}
							</Section>
						);

					articles.push(
						outerWrapper(
							<Tabs
								className="group-tabs"
								defaultValue={defaultTabValue || (tabItems[0] && tabItems[0].value)}
							>
								<TabsList className="group-tabs-list">
									{tabItems.map((item) => (
										<TabsTrigger
											className="cursor-pointer"
											key={item.value}
											value={item.value}>
											{item.label}
										</TabsTrigger>
									))}
								</TabsList>
								{tabItems.map((item) => (
									<TabsContent
										key={item.value}
										value={item.value}
										forceMount
									>
										{item.content}
									</TabsContent>
								))}
							</Tabs>
						)
					);
				}

				break;
			}
			case "Jigsaw": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
			case "MemoryMatchGame": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
			case "Monologue": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
			case "PhraseTable": {
				if (expandable) {
					articles.push(
						<AccordionArticle
							config={value}
							id={`${compoundID}-Accordion`}
							key={`${compoundID}-Accordion`}
							ref={(AccordionArticle) => {
								window.refs.push(AccordionArticle);
							}}
							target={id}
							title={titleText}
							titleHTML={titleTextHTML}
						>
							<PhraseTable
								config={value}
								logError={this.logError}
								showDialog={this.showDialog}
								languageCode={languageCode}
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
							<PhraseTable
								config={value}
								logError={this.logError}
								showDialog={this.showDialog}
								languageCode={languageCode}
							/>
						</Section>
					);
				}
				break;
			}
			case "RadioQuiz": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
			case "RadioTest": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
			case "ReadAloud": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
			case "Section": {
				const renderedSectionContent = [];
				const { content: sectionContent = [] } = value;

				sectionContent.forEach((child) => {
					for (const [/* key */, v] of Object.entries(child)) {
						this.renderComponent(v, renderedSectionContent);
					}
				});

				articles.push(
					<Section
						config={value}
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
			case "Sortable": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
						target={id}
						title={titleText}
						titleHTML={titleTextHTML}
					>
						<Sortable
							config={value}
							logError={this.logError}
							showDialog={this.showDialog}
						/>
					</AccordionArticle>
				);
				break;
			}
			case "WordGrid": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
			case "WordParts": {
				articles.push(
					<AccordionArticle
						config={value}
						id={`${compoundID}-Accordion`}
						key={`${compoundID}-Accordion`}
						ref={(AccordionArticle) => {
							window.refs.push(AccordionArticle);
						}}
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
				let CustomComponent;
				switch (languageCode) {
					case "fr":
						CustomComponent = AllCustomComponentsFR[component];
						break;
					case "sp":
						CustomComponent = AllCustomComponentsSP[component];
						break;
					default:
						CustomComponent = AllCustomComponentsFR[component];
						break;
				}
				if (CustomComponent) {
					if (expandable) {
						articles.push(
							<AccordionArticle
								config={value}
								id={`${compoundID}-Accordion`}
								key={`${compoundID}-Accordion`}
								ref={(AccordionArticle) => {
									window.refs.push(AccordionArticle);
								}}
								target={id}
								title={titleText}
								titleHTML={titleTextHTML}
							>
								<Info
									informationText={infoText}
									informationTextHTML={infoTextHTML}
								/>
								<CustomComponent id={id} showDialog={this.showDialog} />
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
								<CustomComponent id={id} showDialog={this.showDialog} />
							</Section>
						);
					}
				} else if (component.slice(0, 4) === "HIDE") {
					// do nothing
				} else {
					articles.push(
						<p key={`notImplemented${id}`}>
              Component {component} not implemented
						</p>
					);
				}
			}
		}
	};

	selectLearningObject = (index) => {
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
