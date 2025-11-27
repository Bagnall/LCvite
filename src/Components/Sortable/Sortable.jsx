// Sortable.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AudioClip } from "../../Components";

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
			<Card className="w-full">
				<CardHeader>
					<CardTitle className="text-base font-semibold">
						{title}
					</CardTitle>
				</CardHeader>

				<CardContent>
					{prompt && (
						<p className="mb-4 text-sm text-gray-700">
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
									className="grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1.4fr)] gap-3 items-center py-1"
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
											`flex items-center justify-between text-sm font-medium cursor-move px-3 py-1 rounded-md border border-dashed border-slate-300 bg-slate-50 transition ${
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
												≡
											</span>
											<span>
												{englishItem ? englishItem.english : ""}
											</span>
										</div>

										{/* Tick / cross */}
										<div className="ml-3 text-lg leading-none">
											{status === "correct" && (
												<span className="text-green-600">✓</span>
											)}
											{status === "incorrect" && (
												<span className="text-red-600">✗</span>
											)}
										</div>
									</div>
								</div>
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
