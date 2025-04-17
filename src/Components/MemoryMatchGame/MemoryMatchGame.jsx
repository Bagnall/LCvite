// React component for bilingual memory matching game
import './MemoryMatchGame.scss';
import {Card, Congratulate} from '../../Components';
import React from 'react';
import {resolveAsset} from '../../utility';
import Variables from '../../styles/_variables.module.scss';
// const objects = [
// 	{ "english": "umbrella", "french": "le parapluie", "image": "/images/memory/umbrella.png" },
// // 	{ "english": "compass", "french": "la boussole", "image": "/images/memory/compass" },
// // 	{ "english": "tuba", "french": "le tuba", "image": "/images/memory/tuba" },
// // 	{ "english": "skateboard", "french": "la planche à roulettes", "image": "/images/memory/skateboard" },
// 	{ "english": "stapler", "french": "l’agrafeuse", "image": "/images/memory/stapler.jpg" },
// // 	{ "english": "hourglass", "french": "le sablier", "image": "/images/memory/hourglass" },
// // 	{ "english": "lava lamp", "french": "la lampe à lave", "image": "/images/memory/lava%20lamp" },
// // 	{ "english": "telescope", "french": "le télescope", "image": "/images/memory/telescope" },
// // 	{ "english": "paintbrush", "french": "le pinceau", "image": "/images/memory/paintbrush" },
// // 	{ "english": "watering can", "french": "l’arrosoir", "image": "/images/memory/watering%20can" },
// // 	{ "english": "lantern", "french": "la lanterne", "image": "/images/memory/lantern" },
// // 	{ "english": "yo-yo", "french": "le yo-yo", "image": "/images/memory/yo-yo" },
// 	{ "english": "spectacles", "french": "les lunettes", "image": "/images/memory/goggles" },
// // 	{ "english": "feather", "french": "la plume", "image": "/images/memory/feather" },
// // 	{ "english": "magnet", "french": "l’aimant", "image": "/images/memory/magnet" },
// // 	{ "english": "flashlight", "french": "la lampe de poche", "image": "/images/memory/flashlight" },
// // 	{ "english": "pillow", "french": "l’oreiller", "image": "/images/memory/pillow" },
// 	{ "english": "hairbrush", "french": "la brosse à cheveux", "image": "/images/memory/hairbrush" },
// 	{ "english": "postcard", "french": "la carte postale", "image": "/images/memory/postcard" },
// // 	{ "english": "radio", "french": "la radio", "image": "/images/memory/radio" },
// // 	{ "english": "pogo stick", "french": "le bâton sauteur", "image": "/images/memory/pogo%20stick" },
// 	{ "english": "corkscrew", "french": "le tire-bouchon", "image": "/images/memory/corkscrew" },
// 	{ "english": "notebook", "french": "le cahier", "image": "/images/memory/notebook" },
// // 	{ "english": "lock", "french": "le cadenas", "image": "/images/memory/lock" },
// // 	{ "english": "crayon", "french": "le crayon", "image": "/images/memory/crayon" },
// // 	{ "english": "balloon", "french": "le ballon", "image": "/images/memory/balloon" },
// // 	{ "english": "salt shaker", "french": "la salière", "image": "/images/memory/salt%20shaker" },
// // 	{ "english": "coin", "french": "la pièce", "image": "/images/memory/coin" },
// // 	{ "english": "fan", "french": "le ventilateur", "image": "/images/memory/fan" }
// ];


// const objects = [
// { "english": "umbrella", "french": "parapluie", "image": "/images/memory/umbrella" },
// { "english": "compass", "french": "boussole", "image": "/images/memory/compass" },
// { "english": "tuba", "french": "tuba", "image": "/images/memory/tuba" },
// { "english": "stapler", "french": "agrafeuse", "image": "/images/memory/stapler" },
// { "english": "snow globe", "french": "boule à neige", "image": "/images/memory/snow%20globe" },
// { "english": "hourglass", "french": "sablier", "image": "/images/memory/hourglass" },
// 	{ "english": "lava lamp", "french": "lampe à lave", "image": "/images/memory/lava-lamp.jpg" },
// 	{ "english": "telescope", "french": "télescope", "image": "/images/memory/telescope.webp" },
// 	{ "english": "paintbrush", "french": "pinceau", "image": "/images/memory/paint-brush.webp" },
// 	{ "english": "watering can", "french": "arrosoir", "image": "/images/memory/watering-can.webp" },
// 	{ "english": "zipper", "french": "fermeture éclair", "image": "/images/memory/zip.jpg" },
// 	{ "english": "chessboard", "french": "échiquier", "image": "/images/memory/chess-board.png" },
// 	{ "english": "seashell", "french": "coquillage", "image": "/images/memory/seashell.webp" },
// 	{ "english": "mug", "french": "tasse", "image": "/images/memory/mug.webp" },
// 	{ "english": "backpack", "french": "sac à dos", "image": "/images/memory/backpack.webp" },
// { "english": "life preserver", "french": "bouée de sauvetage", "image": "/images/memory/life%20preserver" },
// { "english": "key", "french": "clé", "image": "/images/memory/key" },
// { "english": "matchbox", "french": "boîte d'allumettes", "image": "/images/memory/matchbox" },
// { "english": "skate", "french": "patin", "image": "/images/memory/skate" },
// { "english": "typewriter", "french": "machine à écrire", "image": "/images/memory/typewriter" },
// { "english": "kite", "french": "cerf-volant", "image": "/images/memory/kite" },
// { "english": "stopwatch", "french": "chronomètre", "image": "/images/memory/stopwatch" },
// { "english": "safety pin", "french": "épingle de sûreté", "image": "/images/memory/safety%20pin" },
// { "english": "candle", "french": "bougie", "image": "/images/memory/candle" },
// { "english": "spectacles", "french": "lunettes", "image": "/images/memory/goggles" },
// { "english": "feather", "french": "plume", "image": "/images/memory/feather" },
// { "english": "magnet", "french": "aimant", "image": "/images/memory/magnet" },
// { "english": "cookie cutter", "french": "emporte-pièce", "image": "/images/memory/cookie%20cutter" },
// { "english": "flashlight", "french": "lampe de poche", "image": "/images/memory/flashlight" },
// { "english": "pillow", "french": "oreiller", "image": "/images/memory/pillow" },
// { "english": "hairbrush", "french": "brosse à cheveux", "image": "/images/memory/hairbrush" },
// { "english": "postcard", "french": "carte postale", "image": "/images/memory/postcard" },
// { "english": "corkscrew", "french": "tire-bouchon", "image": "/images/memory/corkscrew" },
// { "english": "notebook", "french": "cahier", "image": "/images/memory/notebook" },
// { "english": "lock", "french": "cadenas", "image": "/images/memory/lock" },
// { "english": "balloon", "french": "ballon", "image": "/images/memory/balloon" },
// { "english": "salt shaker", "french": "salière", "image": "/images/memory/salt%20shaker" },
// { "english": "recorder", "french": "flûte à bec", "image": "/images/memory/recorder%20instrument" },
// { "english": "coin", "french": "pièce", "image": "/images/memory/coin" },
// { "english": "fan", "french": "ventilateur", "image": "/images/memory/fan" }
// ];

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
		const correctAudio = new Audio(resolveAsset('/sounds/ting.mp3'));
		// const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

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
					correctAudio.play();
					nPairs++;
					if (nPairs === cards.length / 2)showDialog(congratulationsText);
					matched.push(firstCard.id, secondCard.id);
					this.setState({
						matched: matched, // [...matched, firstCard.id, secondCard.id],
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
