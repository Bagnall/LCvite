import './Social.scss';
import React from 'react';

export class Social extends React.PureComponent{

	render = () => {
		const today = new Date();
		const strYear = today.getFullYear();

		const ucLogoAlt = "University of Cambridge Language Centre logo";
		const ccLogoAlt = "Creative Commons";
		return (
			<div id={`social`}>
				<h2>Follow us</h2>
				<section className="social-icons-section">
					<ul>
						<li>
							<a href="https://www.facebook.com/uclangcen">
								<img src={`images/facebook_black.svg`} alt={`FaceBook`} />
							</a>
						</li>
						<li>
							<a href="https://www.linkedin.com/company/94076110">
								<img src={`images/linkedin_black.svg`} alt={`LinkedIn`} />
							</a>
						</li>
						<li>
							<a href="https://x.com/uclangcen">
								<img src={`images/twitter-x-black.svg`} alt={`X`} />
							</a>
						</li>
					</ul>
				</section>
			</div>
		);
	};
}
