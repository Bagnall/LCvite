// React component for bilingual memory matching game
import './MemoryMatchGame.scss';
import React from 'react';
import {
	resolveAsset,
	// shuffleArray
} from '../../utility';

const objects = [
	// { "english": "umbrella", "french": "parapluie", "image": "https://source.unsplash.com/80x80/?umbrella" },
	// { "english": "compass", "french": "boussole", "image": "https://source.unsplash.com/80x80/?compass" },
	// { "english": "tuba", "french": "tuba", "image": "https://source.unsplash.com/80x80/?tuba" },
	// { "english": "stapler", "french": "agrafeuse", "image": "https://source.unsplash.com/80x80/?stapler" },
	// { "english": "snow globe", "french": "boule à neige", "image": "https://source.unsplash.com/80x80/?snow%20globe" },
	// { "english": "hourglass", "french": "sablier", "image": "https://source.unsplash.com/80x80/?hourglass" },
	// { "english": "lava lamp", "french": "lampe à lave", "image": "https://source.unsplash.com/80x80/?lava%20lamp" },
	{ "english": "telescope", "french": "télescope", "image": "https://source.unsplash.com/80x80/?telescope" },
	{ "english": "paintbrush", "french": "pinceau", "image": "https://source.unsplash.com/80x80/?paintbrush" },
	{ "english": "watering can", "french": "arrosoir", "image": "https://source.unsplash.com/80x80/?watering%20can" },
	{ "english": "zipper", "french": "fermeture éclair", "image": "https://source.unsplash.com/80x80/?zipper" },
	{ "english": "chessboard", "french": "échiquier", "image": "/images/memory/chessboard.png" },
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
		id: `img-${idx}`,
		type: 'image',
		content: obj.english,
		match: obj.french,

		image: obj.image
	}));
	const textCards = objects.map((obj, idx) => ({
		id: `txt-${idx}`,
		type: 'text',
		content: obj.french,
		match: obj.english,
		image: `img-${idx}`
	}));
	const combined = [...imageCards, ...textCards];
	return combined.sort(() => Math.random() - 0.5);
};

export class MemoryMatchGame extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			cards: getShuffledDeck(),
			flipped: [],
			matched: []
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(card) {
		const { cards, flipped, matched } = this.state;
		if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.id)) return;

		const newFlipped = [...flipped, card.id];
		this.setState({ flipped: newFlipped }, () => {
			if (newFlipped.length === 2) {
				const [first, second] = newFlipped;
				const firstCard = cards.find(c => c.id === first);
				const secondCard = cards.find(c => c.id === second);

				if (firstCard.match === secondCard.content) {
					this.setState({ matched: [...matched, firstCard.id, secondCard.id] });
				}

				setTimeout(() => this.setState({ flipped: [] }), 1000);
			}
		});
	}

	render() {
		const { cards, flipped, matched } = this.state;
		return (
			<div className="memory-map-container"
			>
				{cards.map(card => (
					<div
						key={card.id}
						className={`card ${flipped.includes(card.id) || matched.includes(card.id) ? 'flipped' : ''}`}
						// style={{ backgroundColor: flipped.includes(card.id) || matched.includes(card.id) ? '#ebf8ff' : '#e2e8f0' }}
						onClick={() => this.handleClick(card)}
					>
						<div className={`card-contents-container`}>

							{card.type === 'text' ? (
								<span className="text-lg font-medium" style={{ fontSize: '1.125rem', fontWeight: 500 }}>{card.content}</span>
							) : (
								<div
									className={`card-image-container`}
									style={{ backgroundImage: `url(${resolveAsset(card.image)})` }}
								>
									{/* <img
											src={`${resolveAsset(card.image)}`}
											alt={card.content}
											className="mx-auto"
											// style={{ display: 'block', margin: '0 auto' }}
										/> */}
								</div>
							)}
						</div>
						<div className={`card-back`}>
							<span className="text-gray-400 text-xl font-bold" style={{ color: '#cbd5e0', fontSize: '1.25rem', fontWeight: 700 }}>?</span>
						</div>
					</div>
				))}
			</div>
		);
	}
}
