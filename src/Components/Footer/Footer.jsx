import './Footer.scss';
import React from 'react';

export class Footer extends React.PureComponent{

	render = () => {
		const today = new Date();
		const strYear = today.getFullYear();

		const ucLogoAlt = "University of Cambridge Language Centre logo";
		const ccLogoAlt = "Creative Commons";
		return (
			<footer>
				{/* Flex Container */}

				<div className="footer-container">
					{/* Logo and social links container */}
					{/* <div className="footer-links"> */}
					{/* Copyright Info */}
					<div className={`copyright`}>
						<p className=" text-sm">2026 © University of Cambridge. Developed by <a className="hover:text-blue-700" href="https://www.langcen.cam.ac.uk/">The Language Centre.</a>
						</p>
						<p className="text-footerText text-xs">
This work is licensed under the Creative Commons.
Attribution-NonCommercial-NoDerivs 4.0 International Licence. To
							view a copy of this licence, visit: <a className="hover:text-blue-700"
								href="https://creativecommons.org/"
								target="_blank">creativecommons.org</a>
						</p>
					</div>

					<div className={`lclogo`}>
						<img src="images/ucam_language_centre_h_white.png" className={`logo horizontal white`} alt={ucLogoAlt}/>
						<img src="images/ucam_language_centre_h_black.png" className={`logo horizontal black`} alt={ucLogoAlt}/>
						<img src="images/ucam_language_centre_v_white.png" className={`logo vertical white`} alt={ucLogoAlt}/>
						<img src="images/ucam_language_centre_v_black.png" className={`logo vertical black`} alt={ucLogoAlt}/>
					</div>

					{/* Logo CC */}
					<div className={`cclogo`}>
						<img src="images/cc_logo_white.svg" className={`cc-logo logo white`} alt={ccLogoAlt}/>
						<img src="images/cc_logo_black.svg" className={`cc-logo logo black`} alt={ccLogoAlt}/>
					</div>
				</div>
				{/* </div> */}
			</footer>
		);
	};
}
