// React component for bilingual memory matching game
import './MemoryMatchGame.scss';
import {Card, Congratulate} from '../../Components';
import React from 'react';
import {resolveAsset} from '../../utility';
import Variables from '../../styles/_variables.module.scss';

const getShuffledDeck = (cards, nCards) => {
	cards = cards.sort(() => Math.random() - 0.5);
	cards = cards.slice(0, nCards);
	const imageCards = cards.map((obj, idx) => ({
		content: obj.english,
		id: `${idx}b`,
		image: obj.image,
		match: obj.french,
		type: 'image',
	}));
	const textCards = cards.map((obj, idx) => ({
		audio: obj.audio,
		content: obj.french,
		id: `${idx}a`,
		image: `img-${idx}`,
		match: obj.english,
		type: 'text',
	}));
	const combined = [...imageCards, ...textCards];
	return combined.sort(() => Math.random() - 0.5);
};

export class MemoryMatchGame extends React.PureComponent {
	constructor(props) {
		super(props);
		const {
			cards,
			nPairsToPlay,
		} = this.props.config;

		this.state = {
			...this.props.config,
			beenFlipped:[], // To have shade animations if/when flipping back
			cards: getShuffledDeck(cards, nPairsToPlay),
			flipped: [],
			matched: [],
			nPairs: 0,
			nTries:0,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(card) {
		const {
			beenFlipped,
			cards,
			congratulationsText,
			flipped,
			matched,
		} = this.state;
		let{
			nPairs,
			nTries,
		} = this.state;
		const { showDialog } = this.props;
		if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.id)) return;
		// const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
		// const correctAudio = new Audio(resolveAsset('/sounds/ting.mp3'));
		const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

		const newFlipped = [...flipped, card.id];
		beenFlipped.push(card.id);
		let { memoryCardTransitionTime } = Variables;
		memoryCardTransitionTime = parseInt(memoryCardTransitionTime.replace('s', '')) * 1000;
		this.setState({ beenFlipped: beenFlipped, flipped: newFlipped }, () => {
			if (newFlipped.length === 2) {
				nTries++;
				const [first, second] = newFlipped;
				const firstCard = cards.find(c => c.id === first);
				const secondCard = cards.find(c => c.id === second);

				if (firstCard.match === secondCard.content) {
					const { audio: soundFile } = { ...firstCard, ...secondCard };
					const sound = new Audio(resolveAsset(`${soundFile}`));
					nPairs++;
					sound.onended = () => {
						if (nPairs === cards.length / 2) {
							tadaAudio.play();
							showDialog(congratulationsText);
						}
					};
					// console.log("soundFile", soundFile);
					sound.play();
					matched.push(firstCard.id, secondCard.id);
					this.setState({
						matched: matched,
						nPairs,
						nTries,
					});
				} // else {
				// 	setTimeout(() => errorAudio.play(), memoryCardTransitionTime);
				// }
				setTimeout(() => this.setState({
					flipped: [],
					nTries: nTries,
				}), memoryCardTransitionTime);
			}
		});
	}

	render() {
		const {
			beenFlipped,
			cards,
			descriptionText,
			flipped,
			instructionsText,
			matched,
			nPairs,
			nTries,
		} = this.state;
		const sortedMatches = cards.filter(card =>
			matched.includes(card.id)
		);
		sortedMatches.sort((a, b) => {
			if (a.id < b.id) {
				return -1;
			}
			if (a.id > b.id) {
				return 1;
			}
			return 0;
		});
		return (
			<>
				<p className={`instructions`}>{instructionsText}</p>
				<div className={`memory-match-game`}>
					<p className='clue'>{descriptionText}&nbsp;</p>

					<div
						className={`memory-map-container num${cards.length}cards`}
						// style={{ maxHeight: `${cards.length / 2 * 90}px` }}
					>
						{/* dirty max-height, but the container won't shrink down for the scaled down content :-( */}
						<h2>Cards</h2>
						<h2>Matched&nbsp;pairs</h2>
						<div className="cards">
							{cards.map(card => (
								<Card
									card={card}
									className={`${beenFlipped.includes(card.id) || matched.includes(card.id) ? 'been-flipped' : ''} ${flipped.includes(card.id) || matched.includes(card.id) ? 'flipped' : ''} ${matched.includes(card.id) ? 'matched' : ''}`}
									handleClick={this.handleClick}
									key={`card${card.id}`}
								/>
							))}
						</div>
						<div className={`matches-container`}>{/* To force align top */}
							<div className="matches">
								{sortedMatches.map(card =>
									matched.includes(card.id) ?
										(
											<div key={`enclosingDivMatchedCard${card.id}`}>
												<Card
													card={card}
													className={`${card.type} ${flipped.includes(card.id) || matched.includes(card.id) ? 'flipped' : ''} ${matched.includes(card.id) ? 'matched' : ''}`}
													handleClick={this.handleClick}
													key={`matchedCard${card.id}`}
												/>
											</div>
										) : null
								)}
							</div>
						</div>
					</div>
					<p>{`${nTries} tries. ${nPairs} matched.`}</p>

				</div>
			</>
		);
	}
}
