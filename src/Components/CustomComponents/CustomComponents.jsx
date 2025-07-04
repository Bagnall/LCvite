import './CustomComponents.scss';
import {
	Figure,
} from '../../Components';
import {
	resolveAsset,
} from '../../utility';
import React, { PureComponent } from 'react';

export class LO9Grammar extends PureComponent {
	render() {
		return (
			<div className={`lo9-grammar-container`}>
				<ol>
					<li>
						<p>1 Within France telephone numbers have 10 digits. For landlines the first two are the area code. These are:  ( Could a small map of the regions could be included here?)</p>
						<Figure
							className={`centre max1000`}
							src={resolveAsset(`/images/Carte_indicatifs_téléphoniques_français.svg`)}
							thumb={resolveAsset(`/images/Carte_indicatifs_téléphoniques_français.svg`)}
							title={`Telephone Regions of France`}
						/>
						<p>By <a href="//commons.wikimedia.org/wiki/User:Babsy" title="User:Babsy">Babsy</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by/3.0" title="Creative Commons Attribution 3.0">CC BY 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=5173950">Link</a></p>
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
						<p>Telephone numbers are given in two-digit groups: e.g.  07 11 15 22 55 ( sound file)</p>
					</li>
					<li>
						<p>2 Bien is usually translated as 'well' or 'good'. However, here's an exception: It can sometimes be translated as 'isn't it', 'aren't you' etc or 'indeed' to verify something, as in the following examples:</p>
						<table>
							<tbody>
								<tr><td>C'est bien le 06 22 14 66 33 ?</td><td>This is 06 22 14 66 33, isn't it?</td></tr>
								<tr><td>C'est bien ça!</td><td>That's right / It is indeed.</td></tr>
								<tr><td></td></tr>
								<tr><td>Vous êtes bien Madame Galipot ?</td><td>You are Mme Galipot aren't you?</td></tr>
								<tr><td>C'est bien ça!</td><td>That's right / I am indeed.</td></tr>
							</tbody>
						</table>
					</li>
				</ol>
			</div>
		);
	}
}
