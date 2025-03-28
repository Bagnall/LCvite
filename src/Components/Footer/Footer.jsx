import './Footer.scss';
import React from 'react';
import { resolveAsset } from '../../utility.js';

export class Footer extends React.PureComponent{

	render = () => {
		const today = new Date();
		const strYear = today.getFullYear();
		return (
			<footer>
				<a href='https://www.bagnall.co.uk' target='blank' className="copyright" >&copy; {strYear}&nbsp;&nbsp;&nbsp;<img src={resolveAsset('/images/bsc_logo_flat.svg')} className="logo" alt="BSC logo" />&nbsp;Bagnall Software Consultants Ltd</a>
			</footer>
		);
	};
}
