// import { useState } from 'react'
import './App.scss';
import {
	Accordion,
	AccordionArticle,
	AnswerTable,
	AudioClip,
	Blanks,
	Congratulate,
	CrossWord,
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
	WordGrid,
	WordParts,
} from './Components';
import {
	handleResponse,
	resolveAsset,
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

		// this.handleLoadConfig = this.handleLoadConfig.bind(this);
		// this.loadConfig = this.loadConfig.bind(this);
	}

	componentDidMount = () => {

		const queryString = window.location.search;
		// console.log(queryString);
		const urlParams = new URLSearchParams(queryString);
		// console.log(urlParams);
		const configFile = urlParams.get('config');

		if (configFile)this.loadConfig(`./src/${configFile}`);
	};

	// handleLoadConfig = (e) => {
	// 	console.log("loadConfig", e.target.value);
	// 	this.loadConfig(e.target.value);
	// };

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

		fetch(`${configFile}`, requestOptions)
			.then(handleResponse)
			.then(res => {
				const { settings } = res;
				delete res["settings"];
				const { title } = settings;
				document.title = title;

				this.setState({
					config: { ...res },
					settings: { ...settings }
				});
			})
			.catch(error => {
				const action = `Loading configuration`;
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

	hideDialog = () => {
		// console.log("hideDialog");
		this.setState({
			dialogContent:'',
			showDialog: false,
		});
	};

	showDialog = (content) => {
		this.setState({
			dialogContent: content,
			showDialog: true,
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
				const { id, component, titleText } = value;



				if (component) {
					switch (component) {
						case 'Explanation':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
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
						case 'Monologue':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
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
						case 'DropDowns':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
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
						case 'WordGrid':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
									title={`Word Grid`}
								>
									<WordGrid
										config={value}
										logError={this.logError}
										showDialog={this.showDialog}
									/>
								</AccordionArticle>
							);
							break;
						case 'CrossWord':
							// articles.push(
							// 	<AccordionArticle
							// 		id={`${id}Accordion`}
							// 		key={`${id}Accordion`}
							// 		title={titleText}
							// 	>
							// 		<CrossWord
							// 			config={value}
							// 			logError={this.logError}
							// 			showDialog={this.showDialog}
							// 		/>
							// 	</AccordionArticle>
							// );
							break;
						case 'WordParts':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
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
						case 'AnswerTable':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
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
						case 'PhraseTable':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
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
						case 'Blanks':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
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
						case 'Jigsaw':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
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
						case 'MemoryMatchGame':
							articles.push(
								<AccordionArticle
									id={`${id}Accordion`}
									key={`${id}Accordion`}
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
						default:
							articles.push(
								<p>Component not implemented</p>
							);
					}
				}
			}
		}

		let flag = '';
		let title = '';
		let subtitle = '';
		let targetLanguage = '';
		if (settings) {
			if (settings.flag) flag = `/images/${settings.flag}`;
			({ targetLanguage, title, subtitle } = settings);
		}
		// const words = ["ELEPHANT", "GIRAFFE", "TIGER", "WOMBAT", "LEMMING"];

		return (
			<>
				<div className={`app ${targetLanguage ? targetLanguage : ''}`}>
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
					{config ?
						<>
							<div id="content">
								<div id='hero'>
									{/* <Flag flag={resolveAsset(flag)} shadow={false} fix={'left'} /> */}
									<Flag flag={resolveAsset(flag)} shadow={false} fix={'left'} />
									<h1>{title}</h1>
									<h2>{subtitle}</h2>
								</div>
								{/* <div className={`yorkshire-rose`}></div> */}
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
						<>

							<h1>No configuration parameter given of the form</h1>
							<h2>{`${window.location.href}/?config=config.json`}</h2>
						</>
					}
					<Footer />
				</div>

			</>
		);
	};
}

