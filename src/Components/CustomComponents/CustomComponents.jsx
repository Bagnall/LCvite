import './CustomComponents.scss';
import {
	Attribution,
	AudioClip,
	Figure,
} from '../../Components';
import { PureComponent } from 'react';
import {
	resolveAsset,
} from '../../utility';

// This was intended as a way to allow custom content to be included in a config.json file.
// However, it's hard to work with a single line of HTML (as used in the Explanation component) and although I've used it elsewhere too, dangerouslySetInnerHTML
// is not a recommended practise. So as an alternative, I created CustomComponents where a custom component can be made as a more
// readable JSX content with images and individual styling, it can still be accessed by using a config.json tag such as:
// "explanation1": {
// 	"component": "LO9Grammar", // There must be a CustomComponet with this name present. "LO9" is the learning object, "Grammar" aludes to the section within the page.
// 	"id": "LO9Grammar", // Good practise to have the ID match the component name
// 	"titleText": "Grammar / Use of Language"
// },

export class LO1Grammar extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo1-grammar-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent1`}
				>
					<p><a className='special-anchor-target' name='madame' />1 In French there is no equivalent to the English Ms.
						To be politically correct a woman is addressed as <AudioClip className={`link`} soundFile={`sounds/fr/Madame.mp3`}><b>Madame</b></AudioClip>&nbsp;
						regardless of her marital status unless she is unmarried and specifies that she wishes to be addressed as&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/Mademoiselle.mp3`}><b>Mademoiselle</b></AudioClip>. <b>Mademoiselle</b> is otherwise reserved
						for a teenage girl.</p>
					<table>
						<tbody>
							<tr>
								<td>Abbreviations:</td>
								<td>Monsieur - <b>M</b>.</td>
							</tr>
							<tr>
								<td></td>
								<td>Madame - <b>Mme</b>.</td>
							</tr>
							<tr>
								<td></td>
								<td>Mademoiselle - <b>Mlle</b>.</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel2` : ''}`}
					key={`${id}CustomComponent2`}
				>
					<p><a className='special-anchor-target' name='tuvous'>2
						<AudioClip className={`link`} soundFile={`sounds/fr/tu.mp3`}><b>Tu</b></AudioClip>* and
						<AudioClip className={`link`} soundFile={`sounds/fr/vous.mp3`}><b>vous</b></AudioClip>*
						both mean 'you'.</a></p>
					<p><b>Tu</b> is used when addressing one person and is familiar. That means you use it when speaking to your partner, a relative, a friend,
						a classmate or a child etc. <a className='special-anchor-target' name='toi' />When returning question i.e. when you ask 'and you?' you use the
						form&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/toi.mp3`}><b>toi</b></AudioClip> instead of&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/tu.mp3`}><b>tu:</b></AudioClip>&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/Je m'appelle Michel et toi.mp3`}><b>Je m'appelle Michel et toi ?</b></AudioClip></p>
					<p>You use <AudioClip className={`link`} soundFile={`sounds/fr/vous.mp3`}><b>vous</b></AudioClip> when addressing an adult that you don't know e.g.
						a shop assistant, bus driver, waiting staff etc or an adult to whom you wish to show a degree of distance or respect e.g. your professor,
						a health professional, a legal advisor, an acquaintance of your parents etc.</p><p><b>Vous</b> is used when addressing more than one person
							whatever your relationship to them.</p>
				</div>
			</div>
		);
	};
}
export class LO8Grammar extends PureComponent {
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo8-grammar-container explanation-container container`}
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
							More about adjectives: There are some adjectives ending in <b>f</b>, e.g. sport<b>if</b>, act<b>if</b>.
							The feminine form of such words ends in <b>-ve</b>.
							e.g. Mon frère est sport<b>if</b>. Ma sœur est sporti<b>ve</b>.
						</li>
						<li><br/>
							<ol type="i">
								<li>The verb <b>faire</b>, meaning both 'to make' and 'to do', is a frequently occurring very  irregular verb. Here it is conjugated in the present tense:<br/>
									je <b>fais</b><br/>
									tu <b>fais</b><br/>
									il / elle <b>fait</b><br/>
									nous <b>faisons</b><br/>
									vous <b>faites</b><br/>
									ils / elles <b>font</b><br/>
								</li>
								<li>
									In English you can express what you do or make simply by adding the activity after the verb e.g. 'I do gymnastics' or
									'I do gardening' or 'I make cakes'. In French, you also need something called the partitive article:
									<b>du</b> for masculine nouns, <b>de la</b> for feminine nouns, <b>de l'</b> before a vowel or silent h and <b>des</b>
									for plurals.<br/>
									The partitive is usually translated by "some" or "any," i.e an unspecified amount, or is often left out entirely as in the examples below. <br/>
									<b>Je fais de la gymnastique</b> I do gymnastics    <br/>
									<b>Je fais du jardinage</b> I do gardening<br/>
									<b>Je fais des gâteaux</b> I make cakes<br/>
								</li>
							</ol>
						</li>
						<li>
							<br/>
							<ol type="i">
								<li>
									The regular <b>-er</b>  verb <b>jouer</b> meaning to play is useful when talking about pastimes.
									You use the partitive article after the verb <b>jouer</b> when speaking about playing a musical instrument:<br />
									<b>Je joue du piano</b>  I play the piano <br/>
									<b>Je joue de la clarinette</b> I play the clarinet
								</li>
								<li>
									When you use the verb <b>jouer</b> in the context of a ball game or tabletop game you can't use the partitive article nor can you use the definite article.<br />
									You use <b>jouer à</b>.  If the activity is masculine it's <b>jouer au</b>, if feminine, <b>jouer à la</b>,
									if  starting with a vowel or silent h then <b>jouer à l'</b> and for plurals <b>jouer aux</b>.<br/>
									<br/>
									e.g. Je joue au football I play football<br/>
									Je joue à la pétanque I play pétanque
								</li>
							</ol>
						</li>
						<li>
							The ending of a noun often helps you to know its gender. For example, all nouns ending <b>-tion</b> or  <b>-ie</b> are feminine.<br />
							e.g .l'action, la nation, la natation, la biologie,  la géographie, la sociologie  <br/>
							<br/>
							All nouns ending <b>-isme</b> are masculine.<br/>
							e.g. l'athlétisme, l'existentialisme, le socialisme
						</li>
					</ol>
				</div>
			</div>
		);
	}
}

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
							<div style={{ "display": "flex", "width": "50%", "float": "right", "flexDirection": "column", "alignItems": "center" }}>
								<Figure
									className={`centre max1000`}
									src={resolveAsset(`/images/Carte_indicatifs_téléphoniques_français.svg`)}
									thumb={resolveAsset(`/images/Carte_indicatifs_téléphoniques_français.svg`)}
									title={`Telephone Regions of France`}
								/>
								<Attribution>By <a href="//commons.wikimedia.org/wiki/User:Babsy" title="User:Babsy">Babsy</a> - <span className="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by/3.0" title="Creative Commons Attribution 3.0">CC BY 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=5173950">Link</a></Attribution>
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
							<p>Telephone numbers are given in two-digit groups: e.g. <AudioClip className={`link`} soundFile={`sounds/fr/07 11 15 22 55.mp3`}>07 11 15 22 55</AudioClip></p>
						</li>
						<li>
							<p>Bien is usually translated as 'well' or 'good'. However, here's an exception: It can sometimes be translated as 'isn't it', 'aren't you' etc or 'indeed' to verify something, as in the following examples:</p>
							<table>
								<tbody>
									<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/C'est bien le 06 22 14 66 33.mp3`} >C'est bien le 06 22 14 66 33 ?</AudioClip></td><td>This is 06 22 14 66 33, isn't it?</td></tr>
									<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/C'est bien ça !.mp3`} >C'est bien ça !</AudioClip></td><td>That's right / It is indeed.</td></tr>
									<tr className='spacer'><td colSpan="2"></td></tr>
									<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/Vous êtes bien Madame Galipot.mp3`} >Vous êtes bien Madame Galipot ?</AudioClip></td><td>You are Mme Galipot aren't you?</td></tr>
									<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/C'est bien ça !.mp3`} >C'est bien ça !</AudioClip></td><td>That's right / I am indeed.</td></tr>
								</tbody>
							</table>
						</li>
					</ol>
				</div>
			</div>
		);
	}
}

export class L10Grammar extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo10-grammar-container explanation-container container`}
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
							<p>Using the verb <AudioClip className={`audio-link`} soundFile={`sounds/fr/vouloir.mp3`} >vouloir</AudioClip> meaning 'to want'</p>
							<table>
								<tbody>
									<tr>
										<td>Je veux</td>
										<td>I want</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/Je veux.mp3`} /></td>
									</tr>
									<tr>
										<td>Tu veux</td>
										<td>you want</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/Tu veux.mp3`} /></td>
									</tr>
									<tr>
										<td>Il / elle veut</td>
										<td>he / she/ it wants</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/Il veut. elle veut.mp3`} /></td>
									</tr>
									<tr>
										<td>Nous voulons</td>
										<td>we want</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/Nous voulons.mp3`} /></td>
									</tr>
									<tr>
										<td>Vous voulez</td>
										<td>you want</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/Vous voulez.mp3`} /></td>
									</tr>
									<tr>
										<td>Ils / elles veulent</td>
										<td>they want</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/Ils veulent. Elles veulent.mp3`} /></td>
									</tr>
								</tbody>
							</table>

							<p>The verb vouloir is very frequently used together with another verb. This second verb is used in its infinitive form. e.g.</p>
							<table><tbody>
								<tr>
									<td>Je veux aller au Canada.</td>
									<td>I want to go to Canada.</td>
									<td><AudioClip className={`compact`} soundFile={`sounds/fr/Je veux aller au Canada.mp3`} /></td>
								</tr>
								<tr>
									<td>Ma copine veut étudier en France.</td>
									<td>My girlfriend wants to study in France.</td>
									<td><AudioClip className={`compact`} soundFile={`sounds/fr/Ma copine veut étudier en France.mp3`} /></td>
								</tr>
								<tr>
									<td>Mes amis veulent passer le week-end à Londres.</td>
									<td>My friends want to spend the weekend in London.</td>
									<td><AudioClip className={`compact`} soundFile={`sounds/fr/Mes amis veulent passer le week-end à Londres.mp3`} /></td>
								</tr>
							</tbody>
							</table>
						</li>
						<li>
							<p>The preposition à has a variety of meanings. It is used to mean <i>to the</i> or <i>in the</i> or <i>at the</i> before a common noun.&nbsp;
							You will see the following forms: <b>au</b> before a masculine noun,&nbsp;
							<b>à la</b> before a feminine noun, <b>à l'</b> before a noun beginning with a vowel or silent h and&nbsp;
							<b>aux</b> before a plural noun. e.g.</p>
							<table>
								<tbody>
									<tr>
										<td>Je travaille au laboratoire.</td>
										<td>I work / I am working at the laboratory.</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/Je travaille au laboratoire.mp3`} /></td>
									</tr>
									<tr>
										<td>Tu veux aller à la piscine ?</td>
										<td>Do you want to go to the swimming pool?</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/Tu veux aller à la piscine.mp3`} /></td>
									</tr>
									<tr>
										<td>Elle veut aller à l'exposition.</td>
										<td>She wants to go to the exhibition.</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/Elle veut aller à l'exposition.mp3`} /></td>
									</tr>
									<tr>
										<td>J'aime aller aux magasins.</td>
										<td>I like going to the shops.</td>
										<td><AudioClip className={`compact`} soundFile={`sounds/fr/J'aime aller aux magasins.mp3`} /></td>
									</tr>
								</tbody>
							</table>
						</li>
					</ol>
				</div>
			</div>
		);
	};
}

export class L10Demystify extends PureComponent {
	render = () => {
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
					<p><b>How to pronounce</b>:  <b>ui</b></p>
					<p><AudioClip className='link' soundFile='sounds/fr/aujourd&apos;hui.mp3'><b>aujourd'hui</b></AudioClip>,&nbsp;
						<AudioClip className='link' soundFile='sounds/fr/bruit.mp3'><b>bruit</b></AudioClip>,&nbsp;
						<AudioClip className='link' soundFile='sounds/fr/ensuite.mp3'><b>ensuite</b></AudioClip>,&nbsp;
						<AudioClip className='link' soundFile='sounds/fr/gratuit.mp3'><b>gratuit</b></AudioClip>,&nbsp;
						<AudioClip className='link' soundFile='sounds/fr/minuit.mp3'><b>minuit</b></AudioClip>,&nbsp;
						<AudioClip className='link' soundFile='sounds/fr/nuit.mp3'><b>nuit</b></AudioClip>,&nbsp;
						<AudioClip className='link' soundFile='sounds/fr/puis.mp3'><b>puis</b></AudioClip>,&nbsp;
						<AudioClip className='link' soundFile='sounds/fr/suis.mp3'><b>suis</b></AudioClip></p>
				</div>
			</div>
		);
	};
}

export class AudioClipSamples extends PureComponent {
	render = () => {
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
					<h2>AudioClip Samples</h2>
					<table>
						<tbody>
							<tr>
								<td>link:</td>
								<td><AudioClip className={`link`} soundFile={resolveAsset(`/sounds/fr/Ah non, je suis désolée,  il y a une erreur ! C'est le 01 23 08 08 16.mp3`)} >Ah non, je suis désolée,  il y a une erreur ! C'est le 01 23 08 08 16</AudioClip></td>
							</tr>
							<tr>
								<td>compact:</td>
								<td><AudioClip className={`compact`} soundFile={resolveAsset(`/sounds/fr/Ah non, je suis désolée,  il y a une erreur ! C'est le 01 23 08 08 16.mp3`)} >Ah non, je suis désolée,  il y a une erreur ! C'est le 01 23 08 08 16</AudioClip></td>
							</tr>
							<tr>
								<td>super-compact: </td>
								<td><AudioClip className={`super-compact`} soundFile={resolveAsset(`/sounds/fr/Ah non, je suis désolée,  il y a une erreur ! C'est le 01 23 08 08 16.mp3`)} >Ah non, je suis désolée,  il y a une erreur ! C'est le 01 23 08 08 16</AudioClip></td>
							</tr>
							<tr>
								<td>default:</td>
								<td><AudioClip className={``} soundFile={resolveAsset(`/sounds/fr/Ah non, je suis désolée,  il y a une erreur ! C'est le 01 23 08 08 16.mp3`)} >Ah non, je suis désolée,  il y a une erreur ! C'est le 01 23 08 08 16</AudioClip></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	};
}