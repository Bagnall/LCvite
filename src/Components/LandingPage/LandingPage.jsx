import './LandingPage.scss';
import React from 'react';

export class LandingPage extends React.Component{

	render = () => {
		const {
			languageCode,
			learningObjects = []
		} = this.props;
		// console.log("LandingPage learningObjects", learningObjects.length);
		const { href } = window.location;
		const [baseURL] = href.split('?');
		if (learningObjects.length > 0) {
			const cards = []; // [];
			learningObjects.forEach((learningObject, index) => {
				cards.push(
					<li
						className={`card`}
						key={`card-${index}`}>
						<figure>
							<a
								href={`${baseURL}?lang=${languageCode}&lo=${learningObject.file}`}
								target={`_blank`}
							>
								<img src={`images/themes/LO${index + 1}.svg`} title={learningObject.title} alt={learningObject.title} />
							</a>
							<figcaption>						<a
								href={`${baseURL}?lang=${languageCode}&lo=${learningObject.file}`}
								target={`_blank`}
							>
								{learningObject.title}</a></figcaption>
						</figure>
						{/* <h1>{learningObject.title}</h1> */}
					</li>
				);
			});

			return (
				<>
					<h1>Landing page!</h1>
					<p>Landing page intro.</p>
					<ul className={`landing-page`}>
						{cards}
					</ul>
				</>
			);
		}
	};
}
