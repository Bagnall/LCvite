// Sortable.jsx
import './Sortable.scss';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioClip } from "../../Components";
import { Button } from "@/components/ui/button";
import React from "react";

export class Sortable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			englishItems: this.getInitialEnglish(props.config),
			draggingId: null,
			lastResult: null,
			rowStatuses: new Array(
				props.config && props.config.phrases
					? props.config.phrases.length
					: 0
			).fill(null) // "correct" | "incorrect" | null
		};
	}

	componentDidUpdate(prevProps) {
		// If a different config is passed in, reset the state
		if (prevProps.config !== this.props.config) {
			const phrasesLen =
				this.props.config && this.props.config.phrases
					? this.props.config.phrases.length
					: 0;

			this.setState({
				englishItems: this.getInitialEnglish(this.props.config),
				draggingId: null,
				lastResult: null,
				rowStatuses: new Array(phrasesLen).fill(null)
			});
		}
	}

	getInitialEnglish(config) {
		if (!config || !config.phrases) return [];

		// phrases: [ [french, english, audio], ... ]
		const englishItems = config.phrases.map((phrase, index) => {
			if (Array.isArray(phrase)) {
				return {
					id: String(index), // used for correctness
					english: phrase[1]
				};
			}
			// fallback if you move to object form
			return {
				id: String(index),
				english: phrase.english
			};
		});

		// Default: shuffle unless explicitly disabled
		const shouldShuffle =
			config.shuffleOnLoad === undefined ? true : !!config.shuffleOnLoad;

		if (shouldShuffle) {
			this.shuffleArrayInPlace(englishItems);
		}

		return englishItems;
	}

	shuffleArrayInPlace(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
	}

	/* ----------------------------- Drag & drop (English only) ----------------------------- */

	handleDragStart = (id) => (event) => {
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("text/plain", id);

		this.setState({
			draggingId: id,
			lastResult: null,
			rowStatuses: this.state.rowStatuses.map(() => null)
		});
	};

	handleDragEnter = (targetId) => (event) => {
		event.preventDefault();

		const { draggingId, englishItems } = this.state;
		if (!draggingId || draggingId === targetId) return;

		const newItems = englishItems.slice();
		const fromIndex = newItems.findIndex((item) => item.id === draggingId);
		const toIndex = newItems.findIndex((item) => item.id === targetId);

		if (fromIndex === -1 || toIndex === -1) return;

		const [movedItem] = newItems.splice(fromIndex, 1);
		newItems.splice(toIndex, 0, movedItem);

		this.setState({ englishItems: newItems });
	};

	handleDragOver = (event) => {
		// Required so that drop/enter events behave as expected
		event.preventDefault();
	};

	handleDragEnd = () => {
		this.setState({ draggingId: null });
	};

	/* -------------------------------- Controls -------------------------------- */

	reset = () => {
		const { config } = this.props;
		const phrasesLen =
			config && config.phrases ? config.phrases.length : 0;

		this.setState({
			englishItems: this.getInitialEnglish(config),
			draggingId: null,
			lastResult: null,
			rowStatuses: new Array(phrasesLen).fill(null)
		});
	};

	shuffleEnglish = () => {
		const { config } = this.props;
		if (!config || !config.phrases) return;

		const englishItems = config.phrases.map((phrase, index) => {
			if (Array.isArray(phrase)) {
				return {
					id: String(index),
					english: phrase[1]
				};
			}
			return {
				id: String(index),
				english: phrase.english
			};
		});

		this.shuffleArrayInPlace(englishItems);

		this.setState({
			englishItems,
			draggingId: null,
			lastResult: null,
			rowStatuses: new Array(config.phrases.length).fill(null)
		});
	};

	checkAnswer = () => {
		const { config } = this.props;
		if (!config || !config.phrases) return;

		const { englishItems } = this.state;
		const expectedIds = config.phrases.map((_, index) => String(index));

		const rowStatuses = englishItems.map((item, index) =>
			item.id === expectedIds[index] ? "correct" : "incorrect"
		);

		const isAllCorrect = rowStatuses.every(
			(status) => status === "correct"
		);

		this.setState({
			lastResult: isAllCorrect ? "correct" : "incorrect",
			rowStatuses
		});
	};

	/* -------------------------------- Feedback -------------------------------- */

	renderFeedback() {
		const { lastResult } = this.state;

		if (!lastResult) return null;

		const isCorrect = lastResult === "correct";

		return (
			<div
				className={
					`mt-3 text-sm font-medium ${
						isCorrect ? "text-green-700" : "text-red-700"}`
				}
			>
				{isCorrect
					? "✅ Correct! Good job."
					: "❌ Not quite. Check the rows with a cross and try again."}
			</div>
		);
	}

	/* ---------------------------------- Render ---------------------------------- */

	render() {
		const { config } = this.props;
		const { englishItems, draggingId, rowStatuses } = this.state;

		if (!config || !config.phrases) {
			return <div>No configuration provided for Sortable.</div>;
		}

		const title =
			config.titleText ||
			config.title ||
			"Sortable activity";

		const prompt =
			config.proinstructionsTextmpt ||
			config.instructionsText ||
			config.prompt ||
			config.promptText ||
			"";

		const { phrases } = config;

		return (
			<Card className="w-full sortable">
				<CardHeader>
					<CardTitle className="text-base font-semibold">
						{title}
					</CardTitle>
				</CardHeader>

				<CardContent>
					{prompt && (
						<p className="mb-4 text-sm">
							{prompt}
						</p>
					)}

					<div className="space-y-1">
						{phrases.map((phrase, index) => {
							let french = "";
							let audio = null;

							if (Array.isArray(phrase)) {
								// [french, english, audio]
								french = phrase[0];
								audio = phrase[2];
							} else {
								french = phrase.original;
								audio = phrase.audio;
							}

							const englishItem = englishItems[index];
							const isDragging =
								englishItem &&
								englishItem.id === draggingId;

							const status = rowStatuses[index]; // "correct" | "incorrect" | null

							return (
								<div
									key={index}
									className="grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1.4fr)_auto] gap-3 items-center py-1"
								>
									{/* LEFT: Audio */}
									<div className="flex items-center justify-center pr-2">
										{audio && (
											<AudioClip className={`super-compact`} soundFile={audio} />
										)}
									</div>

									{/* MIDDLE: French phrase */}
									<div className="flex items-center text-sm">
										<span>{french}</span>
									</div>

									{/* RIGHT: Sortable English phrase + tick/cross */}
									<div
										className={
											`bg-secondary flex items-center justify-between text-sm font-medium cursor-ns-resize px-3 py-1 rounded-md border border-dashed border-slate-300 transition ${
												isDragging
													? "opacity-70 scale-[0.99]"
													: "hover:bg-slate-100"
											}`
										}
										draggable
										onDragStart={
											englishItem
												? this.handleDragStart(englishItem.id)
												: undefined
										}
										onDragEnter={
											englishItem
												? this.handleDragEnter(englishItem.id)
												: undefined
										}
										onDragOver={this.handleDragOver}
										onDragEnd={this.handleDragEnd}
									>
										{/* Handle + text */}
										<div className="flex items-center gap-2">
											<span className="text-slate-400 text-lg leading-none">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												><path d="M12 2v20" /><path d="m8 18 4 4 4-4" /><path d="m8 6 4-4 4 4" /></svg>
											</span>
											<span className={``}>
												{englishItem ? englishItem.english : ""}
											</span>
										</div>
									</div>
									{/* NEW: far-right narrow column with SVG tick/cross */}
									<div className="flex items-center justify-center w-6">
										{status === "correct" && (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												className="tick w-4 h-4 text-green-600"
											>
												<path
													fill="currentColor"
													d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
												/>
											</svg>
										)}
										{status === "incorrect" && (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 352 512"
												className="cross w-4 h-4 text-red-600"
											>
												<path
													fill="currentColor"
													d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
												/>
											</svg>
										)}
									</div>								</div>
							);
						})}
					</div>

					<div className="mt-4 flex flex-wrap gap-2">
						<Button onClick={this.checkAnswer}>
							Check answer
						</Button>
						<Button variant="outline" onClick={this.reset}>
							Reset
						</Button>
						<Button variant="outline" onClick={this.shuffleEnglish}>
							Shuffle English
						</Button>
					</div>

					{this.renderFeedback()}
				</CardContent>
			</Card>
		);
	}
}
