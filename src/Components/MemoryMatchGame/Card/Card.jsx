import './Card.scss';
import { AudioClip } from '../..';
import React from 'react';
import {
	resolveAsset,
} from '../../../utility';

export class Card extends React.PureComponent {

	render = () => {

		const {
			card,
			className,
			handleClick,
			id,
		} = this.props;

		return (
			<div
				key={id}
				className={`card ${className}`}
				onClick={() => handleClick(card)}
			>
				<div className={`card-contents-container`}>

					{card.type === 'text' ? (
						<div className="text-lg font-medium" style={{ fontSize: '1.125rem', fontWeight: 500 }}>{card.content}</div>
					) : (
						<div
							className={`card-image-container`}
							style={{ backgroundImage: `url(${resolveAsset(card.image)})` }}
						/>
					)}
					{card.type === 'text' && card.audio ? <AudioClip className={`super-compact`} soundFile={`${resolveAsset(card.audio)}`} /> : null}
				</div>
				<div className={`card-back`}>
					<span className="text-gray-400 text-xl font-bold" style={{ color: '#cbd5e0', fontSize: '1.25rem', fontWeight: 700 }}>?</span>
				</div>
			</div>
		);
	};
}
