import './TopButton.scss';
import React from 'react';
import { Button } from '..';

export class TopButton extends React.PureComponent {
	render = () => {
		return (
			<div className={`top-button-container`}>
				<Button className={`top-button button`} onClick={() => { scrollTo({ behavior: 'smooth', left: 0, top: 0 }); }}>Top</Button>
			</div>
		);
	};
}