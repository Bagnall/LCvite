import './AudioClip.scss';
import React from 'react';

export class AudioClip extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render = () => {
		const {
			className = '',
			listenText = '',
			soundFile,
		} = this.props;

		return (
			<label className='audio-clip'>{listenText}{listenText === '' ? '' : ':'}&nbsp;
				<audio className={`${className ? className : ''}`} controls src={soundFile}></audio>
			</label>
		);
	};
}

