import './Congratulate.scss';
import React from 'react';

export class Congratulate extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render = () => {
		const {
			className,
			content,
			enabled,
			hideDialog,
		} = this.props;

		if (enabled) {
			return (

				<dialog id='congratulate' className={`${className}`}>
					<button className={`close`} onClick={hideDialog} >X</button>
					{content}
				</dialog>
			);
		};
	};
}

