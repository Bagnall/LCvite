import './CustomComponents.scss';
import {
	Attribution,
	AudioClip,
	Figure,
} from '../../Components';
import {
	resolveAsset,
} from '../../utility';
import { PureComponent } from 'react';

// This was intended as a way to allow custom content to be included in a config.json file.
// However, it's hard to work with a single line of HTML (as used in the Explanation component) and although I've used it elsewhere too, dangerouslySetInnerHTML
// is not a recommended practise. So as an alternative, I created CustomComponents where a custom component can be made as a more
// readable JSX content with images and individual styling, it can still be accessed by using a config.json tag such as:
// "explanation1": {
// 	"component": "LO9Grammar", // There must be a CustomComponet with this name present. "LO9" is the learning object, "Grammar" aludes to the section within the page.
// 	"id": "LO9Grammar", // Good practise to have the ID match the component name
// 	"titleText": "Grammar / Use of Language"
// },
export class LO9Grammar extends PureComponent {
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo9-grammar-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent`}
				>
					<ol>
						<li>
							<p>Within France telephone numbers have 10 digits. For landlines the first two are the area code. These are:</p>
							<div style={{ "display": "flex", "width": "50%", "float": "right", "flex-direction": "column", "align-items": "center" }}>
								<Figure
									className={`centre max1000`}
									src={resolveAsset(`/images/Carte_indicatifs_téléphoniques_français.svg`)}
									thumb={resolveAsset(`/images/Carte_indicatifs_téléphoniques_français.svg`)}
									title={`Telephone Regions of France`}
								/>
								<Attribution>By <a href="//commons.wikimedia.org/wiki/User:Babsy" title="User:Babsy">Babsy</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by/3.0" title="Creative Commons Attribution 3.0">CC BY 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=5173950">Link</a></Attribution>
							</div>
							<table>
								<tbody>
									<tr>
										<td>Île-de-France</td><td>01</td>
									</tr>
									<tr><td>Northwest France</td><td>02</td></tr>
									<tr><td>Northeast France</td><td>03</td></tr>
									<tr><td>Southeast France</td><td>04</td></tr>
									<tr><td>Southwest France</td><td>05</td></tr>
								</tbody>
							</table>

							<p>Mobile numbers have the prefix 06 or 07.</p>
							<p>Telephone numbers are given in two-digit groups: e.g.  <AudioClip className={`link`} soundFile={resolveAsset(`/sounds/fr/07 11 15 22 55.mp3`)}>07 11 15 22 55</AudioClip> ( sound file)</p>
						</li>
						<li>
							<p>Bien is usually translated as 'well' or 'good'. However, here's an exception: It can sometimes be translated as 'isn't it', 'aren't you' etc or 'indeed' to verify something, as in the following examples:</p>
							<table>
								<tbody>
									<tr><td>C'est bien le 06 22 14 66 33 ?</td><td>This is 06 22 14 66 33, isn't it?</td></tr>
									<tr><td>C'est bien ça!</td><td>That's right / It is indeed.</td></tr>
									<tr class='spacer'><td colspan="2"></td></tr>
									<tr><td>Vous êtes bien Madame Galipot ?</td><td>You are Mme Galipot aren't you?</td></tr>
									<tr><td>C'est bien ça!</td><td>That's right / I am indeed.</td></tr>
								</tbody>
							</table>
						</li>
					</ol>
				</div>
			</div>
		);
	}
}
