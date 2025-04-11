// React component for bilingual memory matching game
import './MemoryMatchGame.scss';
import {Card} from '../../Components';
import React from 'react';
import {resolveAsset} from '../../utility';
import Variables from '../../styles/_variables.module.scss';

const objects = [
	// { "english": "umbrella", "french": "parapluie", "image": "https://source.unsplash.com/80x80/?umbrella" },
	// { "english": "compass", "french": "boussole", "image": "https://source.unsplash.com/80x80/?compass" },
	// { "english": "tuba", "french": "tuba", "image": "https://source.unsplash.com/80x80/?tuba" },
	// { "english": "stapler", "french": "agrafeuse", "image": "https://source.unsplash.com/80x80/?stapler" },
	// { "english": "snow globe", "french": "boule à neige", "image": "https://source.unsplash.com/80x80/?snow%20globe" },
	// { "english": "hourglass", "french": "sablier", "image": "https://source.unsplash.com/80x80/?hourglass" },
	{ "english": "lava lamp", "french": "lampe à lave", "image": "/images/memory/lava-lamp.jpg" },
	{ "english": "telescope", "french": "télescope", "image": "/images/memory/telescope.webp" },
	{ "english": "paintbrush", "french": "pinceau", "image": "/images/memory/paint-brush.webp" },
	{ "english": "watering can", "french": "arrosoir", "image": "/images/memory/watering-can.webp" },
	{ "english": "zipper", "french": "fermeture éclair", "image": "/images/memory/zip.jpg" },
	{ "english": "chessboard", "french": "échiquier", "image": "/images/memory/chess-board.png" },
	// { "english": "seashell", "french": "coquillage", "image": "https://source.unsplash.com/80x80/?seashell" },
	// { "english": "mug", "french": "tasse", "image": "https://source.unsplash.com/80x80/?mug" },
	// { "english": "backpack", "french": "sac à dos", "image": "https://source.unsplash.com/80x80/?backpack" },
	// { "english": "life preserver", "french": "bouée de sauvetage", "image": "https://source.unsplash.com/80x80/?life%20preserver" },
	// { "english": "key", "french": "clé", "image": "https://source.unsplash.com/80x80/?key" },
	// { "english": "matchbox", "french": "boîte d'allumettes", "image": "https://source.unsplash.com/80x80/?matchbox" },
	// { "english": "skate", "french": "patin", "image": "https://source.unsplash.com/80x80/?skate" },
	// { "english": "typewriter", "french": "machine à écrire", "image": "https://source.unsplash.com/80x80/?typewriter" },
	// { "english": "kite", "french": "cerf-volant", "image": "https://source.unsplash.com/80x80/?kite" },
	// { "english": "stopwatch", "french": "chronomètre", "image": "https://source.unsplash.com/80x80/?stopwatch" },
	// { "english": "safety pin", "french": "épingle de sûreté", "image": "https://source.unsplash.com/80x80/?safety%20pin" },
	// { "english": "candle", "french": "bougie", "image": "https://source.unsplash.com/80x80/?candle" },
	// { "english": "spectacles", "french": "lunettes", "image": "https://source.unsplash.com/80x80/?goggles" },
	// { "english": "feather", "french": "plume", "image": "https://source.unsplash.com/80x80/?feather" },
	// { "english": "magnet", "french": "aimant", "image": "https://source.unsplash.com/80x80/?magnet" },
	// { "english": "cookie cutter", "french": "emporte-pièce", "image": "https://source.unsplash.com/80x80/?cookie%20cutter" },
	// { "english": "flashlight", "french": "lampe de poche", "image": "https://source.unsplash.com/80x80/?flashlight" },
	// { "english": "pillow", "french": "oreiller", "image": "https://source.unsplash.com/80x80/?pillow" },
	// { "english": "hairbrush", "french": "brosse à cheveux", "image": "https://source.unsplash.com/80x80/?hairbrush" },
	// { "english": "postcard", "french": "carte postale", "image": "https://source.unsplash.com/80x80/?postcard" },
	// { "english": "corkscrew", "french": "tire-bouchon", "image": "https://source.unsplash.com/80x80/?corkscrew" },
	// { "english": "notebook", "french": "cahier", "image": "https://source.unsplash.com/80x80/?notebook" },
	// { "english": "lock", "french": "cadenas", "image": "https://source.unsplash.com/80x80/?lock" },
	// { "english": "balloon", "french": "ballon", "image": "https://source.unsplash.com/80x80/?balloon" },
	// { "english": "salt shaker", "french": "salière", "image": "https://source.unsplash.com/80x80/?salt%20shaker" },
	// { "english": "recorder", "french": "flûte à bec", "image": "https://source.unsplash.com/80x80/?recorder%20instrument" },
	// { "english": "coin", "french": "pièce", "image": "https://source.unsplash.com/80x80/?coin" },
	// { "english": "fan", "french": "ventilateur", "image": "https://source.unsplash.com/80x80/?fan" }
];

const getShuffledDeck = () => {
	const imageCards = objects.map((obj, idx) => ({
		content: obj.english,
		id: `${idx}b`,
		image: obj.image,
		match: obj.french,
		type: 'image',
	}));
	const textCards = objects.map((obj, idx) => ({
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
		this.state = {
			beenFlipped:[], // To have shade animations if/when flipping back
			cards: getShuffledDeck(),
			flipped: [],
			matched: []
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(card) {
		const { beenFlipped, cards, flipped, matched } = this.state;
		if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.id)) return;
		const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
		const correctAudio = new Audio(resolveAsset('/sounds/ting.mp3'));
		const tadaAudio = new Audio(resolveAsset('/sounds/tada.mp3'));

		const newFlipped = [...flipped, card.id];
		beenFlipped.push(card.id);
		let { memoryCardTransitionTime } = Variables;
		memoryCardTransitionTime = parseInt(memoryCardTransitionTime.replace('s', '')) * 1000;
		this.setState({ beenFlipped: beenFlipped, flipped: newFlipped }, () => {
			if (newFlipped.length === 2) {
				const [first, second] = newFlipped;
				const firstCard = cards.find(c => c.id === first);
				const secondCard = cards.find(c => c.id === second);

				if (firstCard.match === secondCard.content) {
					correctAudio.play();
					this.setState({ matched: [...matched, firstCard.id, secondCard.id] });
				} // else {
				// 	setTimeout(() => errorAudio.play(), memoryCardTransitionTime);
				// }
				setTimeout(() => this.setState({ flipped: [] }), memoryCardTransitionTime);
			}
		});
	}

	render() {
		const { beenFlipped, cards, flipped, matched } = this.state;
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
			<div className="memory-map-container">
				<h2>Cards</h2>
				<h2>Matched pairs</h2>
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
				<div className="matches">
					{sortedMatches.map(card =>
						matched.includes(card.id) ?
							(
								<Card
									card={card}
									className={`${flipped.includes(card.id) || matched.includes(card.id) ? 'flipped' : ''} ${matched.includes(card.id) ? 'matched' : ''}`}
									handleClick={this.handleClick}
									key={`matchedCard${card.id}`}
								/>
							) : null
					)}
				</div>
			</div>
		);
	}
}
