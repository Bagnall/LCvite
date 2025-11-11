import './Info.scss';
import React from 'react';

export class Info extends React.PureComponent {
	// constructor(props) {
	// 	super(props);

	// 	this.state = ({
	// 		showInfo: false,
	// 	});

	// }

	render = () => {

		const {
			children,
			id,
			informationText,
			informationTextHTML,
		} = this.props;
		// console.log("informationText", informationText);
		// console.log("informationTextHTML", informationTextHTML);
		// console.log("children", children);

		// return (
		// 	<>
		{/* <button
					alt='i'
					className={`button-info`}
					onClick={() => this.setState({ showInfo: true })}
					title={'More information'}
				>i</button> */}
		if (informationTextHTML) {
			return (
				<div
					className={`information`}
					id={`${id}-Info`}
				>
					<svg
						fill={`#1e40af`}
						className='info-icon'
					// stroke={`blue`}
					>
						<use
							// fill={`blue`}
							href={`#info-icon`}
						// stroke={`blue`}
						/>
					</svg>
					<div dangerouslySetInnerHTML={{ __html: informationTextHTML }}/>
				</div>
			);
		} else if (informationText) {
			return (
				<div
					className={`information`}
					id={`${id}-Info`}
				>
					<svg
						fill={`#1e40af`}
						className='info-icon'
					// stroke={`blue`}
					>
						<use
							// fill={`blue`}
							href={`#info-icon`}
						// stroke={`blue`}
						/>
					</svg>
					{informationText ? informationText : null}
					{/* <header>
						< button
							title="Close"
							onClick={() => { this.setState({ showInfo: false }); }}
							className='window-close' >
						</button >
					</header>
					<div className='background' /> */}
					{/* <div className={`for-scrolling`}>
						<h1>{infoTitle}</h1>
						{infoMessage}
					</div> */}

				</div>
			);
		} else if (children) {
			return (
				<div
					className={`information`}
					id={`${id}-Info`}
				>
					<svg
						fill={`#1e40af`}
						className='info-icon'
					>
						<use
							href={`#info-icon`}
						/>
					</svg>
					{children}
				</div>
			);

		} else {
			// return (
			// 	<h1>INFO ERROR!</h1>
			// );
		}
	};
}