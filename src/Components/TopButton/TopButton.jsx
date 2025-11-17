import './TopButton.scss';
import React from 'react';
// import { Button } from '..';

export class TopButton extends React.PureComponent {
	render = () => {
		return (
			<div className={`top-button-container`}>
				<button className={`top-button button btn btn-sm btn-primary-outline`} onClick={() => { scrollTo({ behavior: 'smooth', left: 0, top: 0 }); }}>
					<svg viewBox="0 0 24 24" role="img" aria-label="arrowUp" className="h-5 w-5" fill="currentColor" aria-hidden="true">
						<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"></path>
					</svg>
					Back to top</button>
			</div>
		);
	};
}