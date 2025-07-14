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
					<p><a className='special-anchor-target' name='tuvous'>2&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/tu.mp3`}><b>Tu</b></AudioClip>* and&nbsp;
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
						a health professional, a legal advisor, an acquaintance of your parents etc.</p>
					<p><b>Vous</b> is used when addressing more than one person
							whatever your relationship to them.</p>
				</div>
			</div>
		);
	};
}

export class LO1Demystify extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo1-demystify-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<h1 style={{ textAlign: 'left' }}>How to pronounce:</h1>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel1` : ''}`}
					key={`${id}Panel1`}
				>
					<p>1 <b>-on</b> / <b>om</b> <AudioClip soundFile={`sounds/fr/non-existant.mp3`} /> WE NEED A SOUND FILE FOR THIS</p>
					<p>In French there are some sounds known as nasal vowels: o followed by n or m is one of these. (sound file -on)  In this first topic you will have encountered this sound in the words <AudioClip className={`link`} soundFile={`sounds/fr/Bonjour.mp3`} >bonjour</AudioClip> and <AudioClip className={`link`} soundFile={`sounds/fr/Bonsoir.mp3`} >bonsoir</AudioClip>.  The sound is created as air comes through both nose and mouth. If you have a slight cold or pinch your nose (pic?) you will be able to produce the sound without difficulty!</p>
				</div>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel2` : ''}`}
					key={`${id}Panel2`}
				>
					<p>2 The letter <b>r</b>  <AudioClip soundFile={`sounds/fr/non-existant.mp3`} /> WE NEED A SOUND FILE FOR THIS</p>
					<p>The letter <b>r</b> in French can prove tricky to begin with, so it's worth practising it right way.
						It isn't the same sound as in English formed at the front of the mouth nor is it the rolled r of Spanish.
						It is formed in the throat.  If you clear your throat first thing in the morning or when you are about to make an announcement,
						the French <b>r</b> is made in that very place. If you place your fingers on your neck, you should feel a very slight vibration.
						You will have encountered this sound in the words <AudioClip className={`link`} soundFile={`sounds/fr/Bonjour.mp3`} >bonjou<b>r</b></AudioClip>,
					<AudioClip className={`link`} soundFile={`sounds/fr/Bonsoir.mp3`} >bonsoi<b>r</b></AudioClip>,
					<AudioClip className={`link`} soundFile={`sounds/fr/Au revoir.mp3`} >au <b>r</b>evoi<b>r</b></AudioClip>.</p>
				</div>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel3` : ''}`}
					key={`${id}Panel3`}
				>
					<p>3 The diphthong (vowel combination) oi in French. <AudioClip soundFile={`sounds/fr/non-existant.mp3`}/> WE NEED A SOUND FILE FOR THIS</p>
					<p>It is worth being aware of this sound as these vowels occur together in many French words e.g.   <AudioClip className={`link`} soundFile={`sounds/fr/moi.mp3`} >m<b>oi</b></AudioClip>,
						<AudioClip className={`link`} soundFile={`sounds/fr/toi.mp3`} >t<b>oi</b></AudioClip>,
						<AudioClip className={`link`} soundFile={`sounds/fr/Au revoir.mp3`} >au rev<b>oi</b>r</AudioClip>
					</p>
				</div>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel4` : ''}`}
					key={`${id}Panel4`}
				>
					<p>4 <b>The letter h</b> <img src={resolveAsset('images/shh.jpg')} style={{ verticalAlign: 'middle' }} alt="lady with finger to lips. Shh" title="lady with finger to lips. Shh"/>
					</p>
					<p>The letter <b>h</b> occurs in French words, but is never aspirated e.g. <AudioClip className={`link`} soundFile={`sounds/fr/homme.mp3`} >
						<b>h</b>omme</AudioClip>, <AudioClip className={`link`} soundFile={`sounds/fr/horrible.mp3`} >
						<b>h</b>orrible</AudioClip>, <AudioClip className={`link`} soundFile={`sounds/fr/horizon.mp3`} >
						<b>h</b>orizon</AudioClip>.</p>
				</div>
			</div>
		);
	};
}

export class LO2Grammar extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo2-grammar-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel1` : ''}`}
					key={`${id}Panel1`}
				>
					<p><b>1. Verbs in French</b></p>
					<p>There are many irregular verbs in French. The verb <b>être</b> meaning <b>to be</b> is one of these. In fact, it has been described as the most irregular of all the irregulars! It is worth studying this verb now, not only for this reason, but because it occurs so frequently, and it will also enable you to learn the persons* of the verb.</p>
					<p><b>Être</b> to be</p>
					<table>
						<tbody>
							<tr>
								<td>je suis</td>
								<td>I am</td>
								<td><AudioClip className={`compact`} soundFile={`sounds/fr/je suis.mp3`} /></td>
							</tr>
							<tr>
								<td>tu* es</td>
								<td>you are</td>
								<td><AudioClip className='compact' soundFile={`sounds/fr/tu es.mp3`} /></td>
							</tr>
							<tr>
								<td><a href='./?config=config-fr-2.json#subject-pronouns'>il</a> est</td>
								<td>he is, it is </td>
								<td><AudioClip className={`compact`} soundFile={`sounds/fr/il est.mp3`} /></td>
							</tr>
							<tr>
								<td><a href='./?config=config-fr-2.json#subject-pronouns'>elle</a> est</td>
								<td>she is, it is</td>
								<td><AudioClip className={`compact`} soundFile={`sounds/fr/elle est.mp3`} /></td>
							</tr>
							<tr>
								<td>nous sommes</td>
								<td>we are</td>
								<td><AudioClip className={`compact`} soundFile={`sounds/fr/nous sommes.mp3`} /></td>
							</tr>
							<tr>
								<td>vous* êtes</td>
								<td>you are</td>
								<td><AudioClip className={`compact`} soundFile={`sounds/fr/vous êtes.mp3`} /></td>
							</tr>
							<tr>
								<td><a href='./?config=config-fr-2.json#subject-pronouns'>ils</a> sont</td>
								<td>they are</td>
								<td><AudioClip className={`compact`} soundFile={`sounds/fr/ils sont.mp3`} /></td>
							</tr>
							<tr>
								<td><a href='./?config=config-fr-2.json#subject-pronouns'>elles</a> sont</td>
								<td>they are</td>
								<td><AudioClip className={`compact`} soundFile={`sounds/fr/elles sont.mp3`} /></td>
							</tr>
						</tbody>
					</table>
					<hr />
				</div>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel2` : ''}`}
					key={`${id}Panel2`}
				>
					<p><b>2. Linguistic genders</b> ( I think this lends itself to illustration/pic ?)</p>
					<p>All French nouns have gender, not just people or animals but inanimate objects too.
						There are just two genders in French called masculine and feminine.
						This simply means that all nouns belong in one category or the other.
						Males e.g. father, uncle etc are masculine nouns and females e.g. mother, aunt etc are feminine nouns.
						Other nouns have intrinsic gender. This is not related to their owner, characteristics, manufacturer etc.
						It is possible to identify the gender of some nouns by their endings. (A list of these endings to be added/ linked)</p>
					<p>The gender of the noun has implications for some grammatical features. e.g.</p>
					<p>a. The indefinite article:</p>
					<p>There are two ways of saying 'a' in French:&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/un.mp3`}><b>un</b></AudioClip> for masculine nouns e.g.&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/un.mp3`}><b>un</b></AudioClip> homme (a man),&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/un.mp3`}><b>un</b></AudioClip> métier (a profession/occupation) and&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/une.mp3`}><b>une</b></AudioClip> for a feminine noun e.g.&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/une.mp3`}><b>une</b></AudioClip> femme (a woman),&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/une.mp3`}><b>une</b></AudioClip> profession (a profession).</p>
					<p>b. The definite article:</p>
					<p>For singular nouns, to say 'the' you use&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le.mp3`}><b>le</b></AudioClip> for masculine nouns e.g.&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le.mp3`}><b>le</b></AudioClip> professeur (the [male] teacher),&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le.mp3`}><b>le</b></AudioClip> jour (the day). For feminine nouns you say&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/la.mp3`}><b>la</b></AudioClip> e.g.&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/la.mp3`}><b>la</b></AudioClip> professeure (the [female] teacher),&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/la.mp3`}><b>la</b></AudioClip> nuit (the night).
						When the singular noun begins with a vowel or mute h, then you use <b>l'</b> regardless of gender e.g.&nbsp;
						<b>l'</b>appartement (m) (the flat),  <b>l'</b>école (f) (the school), <b>l'</b>homme (the man).</p>
				</div>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel3` : ''}`}
					key={`${id}Panel3`}
				>
					<p><a name='subject-pronouns' /><b>3. Subject pronouns</b></p>
					<ul>
						<li><b>Il</b> is used to replace a masculine noun.</li>
						<li><b>Elle</b> is used to replace a feminine noun.</li>
						<li><b>Ils</b> is used to replace more than one masculine noun or a mixture of masculine and feminine nouns.</li>
						<li><b>Elles</b> is used to replace more than one feminine noun.</li>
					</ul>
				</div>
			</div>
		);
	};
}

export class LO2Demystify extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo2-demystify-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel1` : ''}`}
					key={`${id}Panel1`}
				>
					<p>1 Silent letters at the end of a word&nbsp;
						<img src={resolveAsset(`images/shh.jpg`)} className={`lo2-demystify-shh`} alt='lady with finger to lips. Shh' title='lady with finger to lips. Shh' /></p>
					<p>The consonants <b>d</b>, <b>g</b>, <b>p</b>, <b>s</b>, <b>t</b>, <b>x</b>, <b>z</b> are silent when they are the last letter of the word.
						Listen to the following examples.</p>
					<p>
						<AudioClip className={`link`} soundFile={`sounds/fr/grand.mp3`} alt={`grand`}>gran<b>d</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/rond.mp3`} alt={`rond`}>ron<b>d</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/long.mp3`} alt={`long`}>lon<b>g</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/trop.mp3`} alt={`trop`}>tro<b>p</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/depuis.mp3`} alt={`depuis`}>depui<b>s</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/pas.mp3`} alt={`pas`}>pa<b>s</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/petit.mp3`} alt={`petit`}>peti<b>t</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/Salut.mp3`} alt={`salut`}>salu<b>t</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/gâteaux.mp3`} alt={`gâteaux`}>gâteau<b>x</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/appelez.mp3`} alt={`appelez`}>appele<b>z</b></AudioClip></p>
					<p>The letter <b>e</b> is not pronounced at the end of a word:</p>
					<p>
						<AudioClip className={`link`} soundFile={`sounds/fr/Je m'appelle.mp3`} alt={`Je m'appelle`}>Je m'appell<b>e</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/bibliothécaire.mp3`} alt={`bibliothécaire`}>bibliothécair<b>e</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/célibataire.mp3`} alt={`célibataire`}>célibatair<b>e</b></AudioClip></p>
					<p><b>NB</b> 2-letter words ending in <b>e</b> are exceptions:</p>
					<p>
						<AudioClip className={`link`} soundFile={`sounds/fr/ce.mp3`}>ce</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/de.mp3`}>de</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/je.mp3`}>je</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le.mp3`}>le</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/me.mp3`}>me</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/ne.mp3`}>ne</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/se.mp3`}>se</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/te.mp3`}>te</AudioClip></p><hr /><p>2 <b>Th</b></p>&nbsp;
					<p>In French the letters <b>th</b> are pronounced <b>t</b>. e.g.
						<AudioClip className={`link`} soundFile={`sounds/fr/Thomas.mp3`} alt={`Thomas`}><b>Thomas</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/thé.mp3`} alt={`thé`}><b>thé</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/théologie.mp3`} alt={`théologie`}><b>théologie</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/maths.mp3`} alt={`maths`}><b>maths</b></AudioClip></p>
				</div>
			</div>
		);
	};
};

export class LO3Grammar extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo3-grammar-container container explanation-container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel1` : ''}`}
					key={`${id}Panel1`}
				>
					<p><b>1. A bit about verbs in French:</b></p>
					<p>There are three groups of regular verbs in French. The biggest of these is called the -er group, simply because the infinitive ends with the letters -er. Parler (to speak), habiter (to live), chanter (to sing), danser (to dance) are examples of - er verbs.</p>
					<p><b>NB</b> There is only <b>ONE present tense</b> in French, so you translate je parle either as 'I speak' or 'I am speaking'
						depending on the context.</p>
					<table>
						<thead>
							<tr>
								<th>
									<AudioClip className={`link`} soundFile={`sounds/fr/parler.mp3`}>parler</AudioClip></th>
								<th>to speak</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/je parle.mp3`}>je parle</AudioClip></td>
								<td>I speak / am speaking</td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/tu parles.mp3`}>tu parles</AudioClip></td>
								<td>you speak / are speaking</td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/il parle.mp3`}>il parle</AudioClip></td>
								<td>he / it speaks / is speaking</td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/elle parle.mp3`}>elle parle</AudioClip></td>
								<td>she / it speaks / is speaking</td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/nous parlons.mp3`}>nous parlons</AudioClip></td>
								<td>we speak / are speaking</td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/vous parlez.mp3`}>vous parlez</AudioClip></td>
								<td>you speak / are speaking</td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/ils parlent.mp3`}>ils parlent</AudioClip></td>
								<td>they speak / are speaking</td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/elles parlent.mp3`}>elles parlent</AudioClip></td>
								<td>they speak / are speaking</td>
							</tr>
						</tbody>
					</table><p>venir is a common irregular verb.</p>
					<p>
						<AudioClip className={`link`} soundFile={`sounds/fr/venir de.mp3`}>venir de</AudioClip> to come from</p>
					<table>
						<tbody>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/je viens.mp3`}>je viens</AudioClip> (de Marseille)</td>
								<td>I come (from Marseille)...</td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/tu viens.mp3`}>tu viens</AudioClip></td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/il vient.mp3`}>il vient</AudioClip></td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/elle vient.mp3`}>elle vient</AudioClip></td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/nous venons.mp3`}>nous venons</AudioClip></td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/vous venez.mp3`}>vous venez</AudioClip></td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/ils viennent.mp3`}>ils viennent</AudioClip></td>
							</tr>
							<tr>
								<td>
									<AudioClip className={`link`} soundFile={`sounds/fr/elles viennent.mp3`}>elles viennent</AudioClip></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel2` : ''}`}
					key={`${id}Panel2`}
				>
					<p><b>2 De</b></p>
					<p><b>NB</b> The word de occurs in French with a variety of meanings. Here it means from, and it's followed by a place name. Look at the following examples illustrating the forms:</p>
					<p>Je viens <span style={{color: "red"}}><b>de</b></span> Paris (for towns, cities, villages)</p>
					<p>Je viens <span style={{color: "green"}}><b>de</b></span> Belgique (for feminine countries and regions beginning with a consonant)</p>
					<p>Je viens <span style={{color: "black"}}><b>d'</b></span>Angleterre (for all singular place names beginning with a vowel or mute h)</p>
					<p>Je viens <span style={{color: "cyan"}}><b>du</b></span> Canada (for masculine countries and regions beginning with a consonant)</p>
					<p>Je viens <span style={{color: "purple"}}><b>des</b></span> Seychelles (for plural countries)</p>
				</div>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel3` : ''}`}
					key={`${id}Panel3`}
				>
					<p><b>3 Feminine forms of professions and adjectives</b></p>
					<p>When describing a female or any feminine noun, you will often see the addition of a letter or letters to the original masculine
						noun or adjective.</p>
					<ul>
						<li>If the ending is <b>e</b> there is no addition: both masculine and feminine are the the same e.g.&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/célibataire.mp3`}>célibataire</AudioClip>,&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/journaliste.mp3`}>journaliste</AudioClip>,&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/serbe.mp3`}>serbe</AudioClip> etc.
						</li>
						<li>If the last letter is a consonant, then generally <b>e</b> is added to form the feminine e.g.&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/étudiant.mp3`}>étudiant</AudioClip> (m)&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/étudiante.mp3`}>étudiante</AudioClip> (f),&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/chinois.mp3`}>chinois</AudioClip> (m),&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/chinoise.mp3`}>chinoise</AudioClip> (f) <b>NB</b>&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/médecin.mp3`}>médecin</AudioClip> is an exception -&nbsp;
							this is for both a male and female doctor.
						</li>
						<li>If the final letter is <b>é</b>, then an <b>e</b> is added for the feminine e.g.&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/marié.mp3`}>marié</AudioClip> (m),&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/mariée.mp3`}>mariée</AudioClip> (f)
						</li>
						<li>If the ending is <b>en</b>, <b>ne</b> is added for the feminine e.g.&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/informaticien.mp3`}>informaticien</AudioClip> (m) /&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/informaticienne.mp3`}>informaticienne</AudioClip> (f),&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/australien.mp3`}>australien</AudioClip> (m),&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/australienne.mp3`}>australienne</AudioClip> (f)
						</li>
					</ul>
				</div>
			</div>
		);
	};
}

export class LO3Demystify extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo3-demystify-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel1` : ''}`}
					key={`${id}Panel1`}
				>
					<p><b>To sound or not to sound?</b></p>
					<ol>
						<li><p>The third person verb ending <b>ent</b> is never pronounced. <img src={resolveAsset('/images/shh.jpg')} style={{ verticalAlign: 'middle' }} alt='lady with finger to lips. Shh' title='lady with finger to lips. Shh' />
							e.g.
							<AudioClip className={`link`} soundFile={`sounds/fr/ils parlent.mp3`}>Ils parl<b>ent</b></AudioClip>,&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/elles chantent.mp3`}>elles chant<b>ent</b></AudioClip>,&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/ils dansent.mp3`}>ils dans<b>ent</b></AudioClip></p>
						</li>
						<li>
							<p>Usually, the consonants <b>d</b>, <b>g</b>, <b>p</b>, <b>s</b>, <b>t</b>, <b>x</b>, <b>z</b> are silent when they are the last letter of the word.
								However, these are sounded when the next word begins with a vowel or mute h. This is known as making a liaison. </p>
							<p>Compare these:&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/les professeurs.mp3`}>les professeurs</AudioClip> /&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/les étudiants.mp3`}>le<b>s é</b>tudiants</AudioClip> –&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/il est français.mp3`}>il est français</AudioClip> /&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/il est anglais.mp3`}>il es<b>t a</b>nglais</AudioClip> -&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/un grand poète.mp3`}>un grand poète</AudioClip> /&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/un grand homme.mp3`}>un gran<b>d ho</b>mme</AudioClip></p>
						</li>
						<li>
							<p>The sound : <b>'eh'</b></p>
							<p>Listen to the following:
								<AudioClip className={`link`} soundFile={`sounds/fr/vous parlez.mp3`}>vous parl<b>ez</b></AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/il est américain.mp3`}>il <b>est</b> am<b>é</b>ricain</AudioClip> <b>et</b>&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/je suis ghanéenne.mp3`}>je suis ghan<b>é</b>enne</AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/elle est mariée.mp3`}>elle <b>est</b> mari<b>ée</b></AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/nous sommes fiancés.mp3`}>nous sommes fianc<b>és</b></AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/elles sont fatiguées.mp3`}>elles sont fatigu<b>ées</b></AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/écouter.mp3`}><b>é</b>cout<b>er</b></AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/regarder.mp3`}>regard<b>er</b></AudioClip></p>
							<p>You will notice that&nbsp;
								<b>-et</b>, <b>-ez</b>, <b>é</b>, <b>-ée</b>, <b>-és</b>, <b>-ées</b> and  also <b>-er</b> as an infinitive ending are
							all pronounced the same, as are  the words <b>est</b> and <b>es</b>.
							</p>
						</li>
					</ol>
				</div>
			</div>
		);
	};
}

export class LO4Demystify extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo4-demystify-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel1` : ''}`}
					key={`${id}Panel1`}
				>
					<p><b>How to pronounce:</b></p>
					<p>another nasal vowel. This is the sound <AudioClip className={`link`} soundFile={`sounds/fr/non-existant.mp3`}>WE NEED A SOUND FILE FOR THIS</AudioClip>&nbsp;
						which is how the letters <b>-in-</b> are pronounced <b>when they end a word or occur before a consonant</b> as in these examples:&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/Singapour.mp3`}>S<b>in</b>gapour</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/Inde.mp3`}><b>In</b>de</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/indien.mp3`}><b>in</b>dien</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/Finlande.mp3`}>F<b>in</b>lande</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/jardin.mp3`}>jard<b>in</b></AudioClip>. The tongue and the mouth all have work to do in its production whilst air passes through nose and mouth.</p>
					<p><b>NB</b> This is a useful sound to practise as the following are also pronounced in the same way <b>when they end a word or occur before a consonant:</b></p>
					<p><b>ain</b>, <b>aim</b>, <b>ein</b>, <b>im</b>, <b>ym</b>, <b>yn</b>, <b>eim</b>.</p>
					<p>Here are some examples of words containing the sound to practise:</p>
					<p><AudioClip className={`link`} soundFile={`sounds/fr/marocain.mp3`}>maroc<b>ain</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/faim.mp3`}>f<b>aim</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/peinture.mp3`}>p<b>ein</b>ture</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/impossible.mp3`}><b>im</b>possible</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/symbole.mp3`}>s<b>ym</b>bole</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/lynx.mp3`}>l<b>yn</b>x</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/Reims.mp3`}>R<b>eim</b>s</AudioClip>.</p>
					<p>When the letters <b>en</b> or <b>ens</b> end a word this also pronounced (ain) </p>
					<p><AudioClip className={`link`} soundFile={`sounds/fr/australien.mp3`}>australi<b>en</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/européen.mp3`}>europé<b>en</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/ghanéens.mp3`}>ghané<b>ens</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/indiens.mp3`}>indi<b>ens</b></AudioClip>.</p>
				</div>
			</div>
		);
	};
}

export class LO5Grammar extends PureComponent{
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo5-grammar-container explanation-container container`}
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
							<p>In French there are some verbs which are <b>only ever used in the third person singular: il</b>.</p>
							<p><b>Il y a</b> meaning 'there is' or 'there are' is one of these. <br/>e.g. </p>
							<p><AudioClip className={`link`} soundFile={`sounds/fr/Il y a un petit jardin devant la maison.mp3`} alt="centre">Il y a un petit jardin devant la maison</AudioClip>.
								There is a small garden in front of the house.<br />
							<AudioClip className={`link`} soundFile={`sounds/fr/Il y a trois chambres au premier étage.mp3`} alt="centre">Il y a trois chambres au premier étage</AudioClip>.
								There are three bedrooms on the first floor.</p>
							<p>Here are a few more examples of verbs which work in the same way:</p>
							<p>From the verb <AudioClip className={`link`} soundFile={`sounds/fr/pleuvoir.mp3`}><b>pleuvoir</b></AudioClip>:
								<AudioClip className={`link`} soundFile={`sounds/fr/Il pleut.mp3`}><b>Il pleut</b></AudioClip> - e.g.
								<AudioClip className={`link`} soundFile={`sounds/fr/Il pleut.mp3`}><b>Il pleut</b></AudioClip> aujourd'hui   It's raining today. <br />
								From the verb <AudioClip className={`link`} soundFile={`sounds/fr/neiger.mp3`}><b>neiger</b></AudioClip>:
								<AudioClip className={`link`} soundFile={`sounds/fr/Il neige.mp3`}><b>Il neige</b></AudioClip> - e.g.
								<AudioClip className={`link`} soundFile={`sounds/fr/Il neige.mp3`}><b>Il neige</b></AudioClip> en hiver It snows in the winter.<br />
								From the verb <AudioClip className={`link`} soundFile={`sounds/fr/falloir.mp3`}><b>falloir</b></AudioClip>:
								<AudioClip className={`link`} soundFile={`sounds/fr/Il faut.mp3`}><b>Il faut</b></AudioClip> - e.g.
								<AudioClip className={`link`} soundFile={`sounds/fr/Il faut.mp3`}><b>Il faut</b></AudioClip> écouter It's necessary / you need to listen. </p>
						</li><li>
							<p><b>More about adjectival agreement</b>. Some adjectives end -eux e.g. <AudioClip className={`link`} soundFile={`sounds/fr/spacieux.mp3`}><b>spacieux</b></AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/lumineux.mp3`}><b>lumineux</b></AudioClip>.</p>
							<p>There is no change for the masculine plural.<br />The feminine form of the adjective is formed by removing the x and replacing with -se i.e.
								<AudioClip className={`link`} soundFile={`sounds/fr/spacieuse.mp3`}><b>spacieuse</b></AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/lumineuse.mp3`}><b>lumineuse</b></AudioClip>.<br />
								To form the feminine plural an s is added to this. Look at these examples:</p>
							<p><AudioClip className={`link`} soundFile={`sounds/fr/Le salon est spacieux.mp3`}>Le salon est spaci<b>eux</b></AudioClip>.<br />
								<AudioClip className={`link`} soundFile={`sounds/fr/La cuisine est spacieuse.mp3`}>La cuisine est spaci<b>euse</b></AudioClip>.<br />
								<AudioClip className={`link`} soundFile={`sounds/fr/Les appartements sont spacieux.mp3`}>Les appartements sont spaci<b>eux</b></AudioClip>.<br />
								<AudioClip className={`link`} soundFile={`sounds/fr/Les chambres sont spacieuses.mp3`}>Les chambres sont spaci<b>euses</b></AudioClip>.</p>
						</li></ol>
				</div>
			</div>
		);
	}
}

export class LO5Demystify extends PureComponent{
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo5-demystify-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent`}
				>
					<p><b>How to pronounce:</b><p>
					</p>the third of the nasal vowels, <b>[an]</b> which is how the letters an, am, en and em are pronounced.
						Listen to the following examples:</p>
					<p><AudioClip className={`link`} soundFile={`sounds/fr/blanc.mp3`}>blanc</AudioClip>&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/chambre.mp3`}>chambre</AudioClip>&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/dans.mp3`}>dans</AudioClip>&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/enfant.mp3`}>enfant</AudioClip>&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/ensemble.mp3`}>ensemble</AudioClip>&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/centre.mp3`}>centre</AudioClip></p>
				</div>
			</div>
		);
	}
}

export class LO6Grammar extends PureComponent {
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo6-grammar-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent`}
				>
					<p>In French, the gender of the noun has implications for the <b>possessive adjectives</b>. There are two ways of saying 'my' for singular nouns in French: <b>mon</b> for masculine nouns e.g. <b>mon</b> frère (my brother), <b>mon</b> jardin (my garden) and <b>ma</b> for feminine nouns e.g. <b>ma</b> femme (my wife), <b>ma</b> maison (my house). It is important to remember that the gender of the noun itself is what matters here, and not the gender of the 'owner'.  There is only one way of saying 'my' for plural nouns: e.g. <b>mes</b> oncles (my uncles), <b>mes</b> tantes (my aunts).<br />Here is a complete list of the possessive adjectives.</p><table><tbody><tr><td>mon, ma, mes</td>
						<td>my</td>
					</tr>
					<tr><td>ton, ta, tes</td>
						<td>your (sing)</td>
					</tr>
					<tr><td>son, sa, ses *</td>
						<td>his  / her</td>
					</tr>
					<tr><td>notre (sing), nos (pl)</td>
						<td>our</td>
					</tr>
					<tr><td>votre (sing), vos (pl)</td>
						<td>your (formal, pl)</td>
					</tr>
					<tr><td>leur (sing), leurs (pl)</td>
						<td>their</td>
					</tr></tbody></table><p className='footnote'>(*NB all of these can mean his or her as the gender of the noun and not the owner is the factor to consider.)</p>
					<p><b>2 Verbs in French continued</b></p>
					<p><b>Avoir</b> is one of the many irregular verbs in French. It means <b>to have</b>.
						e.g. J'ai une soeur.</p>
					<p>It occurs very frequently and so is worth memorising if possible.</p>
					<table>
						<thead>
							<tr>
								<th>Avoir</th>
								<th>to have</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><AudioClip className={`link`} soundFile={`sounds/fr/j'ai.mp3`}>j'ai</AudioClip></td>
								<td>I have</td>
							</tr>
							<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/tu as.mp3`}>tu as</AudioClip></td>
								<td>you have</td>
							</tr>
							<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/il a.mp3`}>il a</AudioClip></td>
								<td>he has, it has</td>
							</tr>
							<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/elle a.mp3`}>elle a</AudioClip></td>
								<td>she has, it has</td>
							</tr>
							<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/nous avons.mp3`}>nous avons</AudioClip></td>
								<td>we have</td>
							</tr>
							<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/vous avez.mp3`}>vous avez</AudioClip></td>
								<td>you have</td>
							</tr>
							<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/ils ont.mp3`}>ils ont</AudioClip></td>
								<td>they have</td>
							</tr>
							<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/elles ont.mp3`}>elles ont</AudioClip></td>
								<td>they have</td>
							</tr>
						</tbody>
					</table>
					<p>The verb <b>avoir</b> occurs in some expressions when in English the
						verb <b>to be</b> or sometimes <b>to feel</b> would be used. Here are some of these expressions:</p>
					<table>
						<tbody>
							<tr>
								<td><b>avoir … ans</b></td>
								<td>to be … years old</td>
								<td>e.g. <AudioClip className={`link`} soundFile={`sounds/fr/J'ai 25 ans.mp3`}><b>J'ai 25 ans.</b></AudioClip></td>
								<td>I'm 25 years old.</td>
							</tr>
							<tr><td><b>avoir soif </b></td>
								<td>to be thirsty</td>
								<td>e.g. <AudioClip className={`link`} soundFile={`sounds/fr/J'ai soif.mp3`}><b>J'ai soif. </b></AudioClip></td>
								<td>I'm thirsty.</td>
							</tr>
							<tr><td><b>avoir faim </b></td>
								<td>to be hungry</td>
								<td>e.g. <AudioClip className={`link`} soundFile={`sounds/fr/Elle a faim.mp3`}><b>Elle a faim.</b></AudioClip></td>
								<td>She's hungry.</td>
							</tr>
							<tr><td><b>avoir peur </b></td>
								<td>to be frightened</td>
								<td>e.g. <AudioClip className={`link`} soundFile={`sounds/fr/Il a peur.mp3`}><b>Il a peur.</b></AudioClip></td>
								<td>He's frightened.</td>
							</tr>
							<tr><td><b>avoir froid</b></td>
								<td>to be / feel cold</td>
								<td>e.g. <AudioClip className={`link`} soundFile={`sounds/fr/Tu as froid.mp3`}><b>Tu as froid ?</b></AudioClip></td>
								<td>Are you / do you feel cold?</td>
							</tr>
							<tr><td><b>avoir chaud</b></td>
								<td>to be / feel hot</td>
								<td>e.g. <AudioClip className={`link`} soundFile={`sounds/fr/Vous avez chaud.mp3`}><b>Vous avez chaud ?</b></AudioClip></td>
								<td>Are you hot / do you feel hot?</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}


export class LO6Demystify extends PureComponent {
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo6-demystify-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent`}
				>
					<p><b>How to pronounce double l in French:</b><p>
					</p><b>Double l</b> is sometimes mispronounced by learners of French, but the following rules should help to avoid this problem.<p>
					</p>1 after the vowels <b>a, e, o</b> and <b>u</b>, <b>double l</b> is pronounced <b>l</b>. e.g.&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/une balle.mp3`}><b>une balle</b></AudioClip> (a ball),&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/Elle est belle.mp3`}><b>Elle est belle</b></AudioClip>. (She is beautiful.)&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/Elle est folle.mp3`}><b>Elle est folle</b></AudioClip>. (She is crazy.)&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/une bulle.mp3`}><b>une bulle</b></AudioClip> (a bubble).&nbsp;
							There are no exceptions here!<p>
					</p>2i  after the vowel <b>I</b>, <b>double ll</b> is pronounced as though it were a letter 'y' in English. e.g.&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/une fille.mp3`}><b>une fille</b></AudioClip>,&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/une famille.mp3`}><b>une famille</b></AudioClip>,&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/un billet.mp3`}><b>un billet</b></AudioClip> (a ticket)<p>
					</p>2ii if the vowel i is preceded by another vowel, the same rule applies and <b>double ll</b> is pronounced as though it were
						a letter 'y' in English. e.g. <AudioClip className={`link`} soundFile={`sounds/fr/une bouteille.mp3`}><b>une bouteille</b></AudioClip> (a bottle),&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/une feuille.mp3`}><b>une feuille</b></AudioClip> (a leaf).<p>
					</p>3 <b style={{ 'color': 'red' }}>NB</b> There are a few exceptions when <b>double ll</b> follows <i><b>i</b></i>.
						The most common are :  <AudioClip className={`link`} soundFile={`sounds/fr/la ville.mp3`}><b>la ville</b></AudioClip>,&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/le village.mp3`}><b>le village</b></AudioClip>,&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/la villa.mp3`}><b>la villa</b></AudioClip>,&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/mille.mp3`}><b>mille</b></AudioClip> (a thousand),&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/un million.mp3`}><b>un million</b></AudioClip> (a million),&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/un milliard.mp3`}><b>un milliard</b></AudioClip> (a billion),&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/tranquille.mp3`}><b>tranquille</b></AudioClip> (quiet),&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/Lille.mp3`}><b>Lille</b></AudioClip>,&nbsp;
					<AudioClip className={`link`} soundFile={`sounds/fr/Gilles.mp3`}><b>Gilles</b></AudioClip>.
						The best thing to do is to learn these off by heart.</p>
				</div>
			</div>
		);
	}
}

export class LO7Grammar extends PureComponent {
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo7-grammar-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent`}
				>
					<ol>
						<li><p>French like all languages borrows words from other languages. In the greater majority of cases, borrowed nouns are masculine. e.g.&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/le cricket.mp3`}><b>le cricket</b></AudioClip>,&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/le judo.mp3`}><b>le judo</b></AudioClip>,&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/le shopping.mp3`}><b>le shopping</b></AudioClip>.
							Almost all ball sports are borrowed words, and these are all masculine.</p></li>
						<li><p>Word for word translation often works very well, but sometimes being aware of some seemingly small differences is essential. e.g.
								In English, we say, 'I like football' or 'I don't like swimming'.  In French, we say '
						<AudioClip className={`link`} soundFile={`sounds/fr/J'aime le football.mp3`}>J'aime <i>le</i> football</AudioClip>' or '
						<AudioClip className={`link`} soundFile={`sounds/fr/Je n'aime pas la natation.mp3`}>Je n'aime pas <i>la</i> natation</AudioClip>'.
								i.e. in French, a definite article (le, la, l', les) is required.</p></li><li><p>To say what you like/ dislike doing you use&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/J*apos;aime.mp3`}>J'aime</AudioClip> plus an infinitive. e.g.&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/J&apos;aime danser.mp3`}>J'aime danser</AudioClip>: I like to dance / I like dancing.&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/fr/Je n'aime pas regarder la television.mp3`}>Je n'aime pas regarder la television</AudioClip>:
								I don't like to watch the television / I don't like watching the television.</p></li>
						<li>
							<p><AudioClip className={`link`} soundFile={`sounds/fr/Quel.mp3`}>Quel</AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/quelle.mp3`}>quelle</AudioClip>,&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/quels.mp3`}>quels</AudioClip> and&nbsp;
								<AudioClip className={`link`} soundFile={`sounds/fr/quelles.mp3`}>quelles</AudioClip> are known as interrogative adjectives and they mean
								'which' or 'what'. They work like adjectives, and agree with the noun that follows, hence the four forms.</p>
							<ul>
								<li><AudioClip className={`link`} soundFile={`sounds/fr/Quel.mp3`}>Quel</AudioClip> is used for a masculine singular noun e.g.
									<AudioClip className={`link`} soundFile={`sounds/fr/Quel est ton pays préféré.mp3`}>Quel est ton pays préféré ?</AudioClip> Which is your
									favourite country?</li><li><AudioClip className={`link`} soundFile={`sounds/fr/quelle.mp3`}>Quelle</AudioClip> is used for a feminine singular
									noun e.g. <AudioClip className={`link`} soundFile={`sounds/fr/Quelle est ta couleur préférée.mp3`}>Quelle est ta couleur préférée ?</AudioClip>
									Which is your favourite colour?</li><li><AudioClip className={`link`} soundFile={`sounds/fr/quels.mp3`}>Quels</AudioClip> is used for
									masculine plural noun e.g.
								<AudioClip className={`link`} soundFile={`sounds/fr/Quels sont tes passe-temps préférés.mp3`}>Quels sont tes passe-temps préférés ?</AudioClip>
									Which are your favourite pastimes?</li><li><AudioClip className={`link`} soundFile={`sounds/fr/quelles.mp3`}>Quelles</AudioClip> is used for
									feminine plural nouns e.g. <AudioClip className={`link`} soundFile={`sounds/fr/Quelles langues parlez-vous.mp3`}>Quelles langues
									parlez-vous ?</AudioClip>   Which languages do you speak?
								</li>
							</ul>
						</li>
					</ol >
				</div>
			</div>
		);
	}
}

export class LO7Demystify extends PureComponent {
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo7-demystify-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent`}
				>
					<p>Words that are borrowed from another language tend to retain much of the pronunciation of their language of origin. Here are some examples:</p>
					<p>
						<AudioClip className={`link`} soundFile={`sounds/fr/le cricket.mp3`}>le cricket</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le tennis.mp3`}>le tennis</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le foot.mp3`}>le foot</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le shopping.mp3`}>le shopping</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le bowling.mp3`}>le bowling</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le week-end.mp3`}>le week-end</AudioClip></p>
					<p>(despite what you will have learnt previously, the final consonant is sounded here)</p>
				</div>
			</div>
		);
	}
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
export class LO8Demystify extends PureComponent {
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo8-demystify-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent`}
				>
					<p>Words that are borrowed from another language tend to retain much of the pronunciation of their language of origin. Here are some examples:</p>
					<p>
						<AudioClip className={`link`} soundFile={`sounds/fr/le cricket.mp3`}>le cricket</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le tennis.mp3`}>le tennis</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le foot.mp3`}>le foot</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le shopping.mp3`}>le shopping</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le bowling.mp3`}>le bowling</AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/le week-end.mp3`}>le week-end</AudioClip></p>
					<p>(despite what you will have learnt previously, the final consonant is sounded here)</p>
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
										<td>Île-de-France</td>
										<td>01</td>
									</tr>
									<tr><td>Northwest France</td>
										<td>02</td>
									</tr>
									<tr><td>Northeast France</td>
										<td>03</td>
									</tr>
									<tr><td>Southeast France</td>
										<td>04</td>
									</tr>
									<tr><td>Southwest France</td>
										<td>05</td>
									</tr>
								</tbody>
							</table>

							<p>Mobile numbers have the prefix 06 or 07.</p>
							<p>Telephone numbers are given in two-digit groups: e.g. <AudioClip className={`link`} soundFile={`sounds/fr/07 11 15 22 55.mp3`}>07 11 15 22 55</AudioClip></p>
						</li>
						<li>
							<p>Bien is usually translated as 'well' or 'good'. However, here's an exception: It can sometimes be translated as 'isn't it', 'aren't you' etc or 'indeed' to verify something, as in the following examples:</p>
							<table>
								<tbody>
									<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/C'est bien le 06 22 14 66 33.mp3`} >C'est bien le 06 22 14 66 33 ?</AudioClip></td>
										<td>This is 06 22 14 66 33, isn't it?</td>
									</tr>
									<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/C'est bien ça !.mp3`} >C'est bien ça !</AudioClip></td>
										<td>That's right / It is indeed.</td>
									</tr>
									<tr className='spacer'><td colSpan="2"></td>
									</tr>
									<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/Vous êtes bien Madame Galipot.mp3`} >Vous êtes bien Madame Galipot ?</AudioClip></td>
										<td>You are Mme Galipot aren't you?</td>
									</tr>
									<tr><td><AudioClip className={`link`} soundFile={`sounds/fr/C'est bien ça !.mp3`} >C'est bien ça !</AudioClip></td>
										<td>That's right / I am indeed.</td>
									</tr>
								</tbody>
							</table>
						</li>
					</ol>
				</div>
			</div>
		);
	}
}

export class LO9Demystify extends PureComponent {
	render() {
		const { id } = this.props;
		return (
			<div
				className={`lo9-demystify-container explanation-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent`}
				>
					<p><b>How to pronounce:  5, 6, 7, 8, 9, 10</b></p>
					<p>You would not expect to pronounce the final consonant of these words, but they are exceptions and are pronounced as followed: cinq, six, sept, huit, neuf, dix.</p>
					<p>However, <b>NB</b>, when&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/six.mp3`}><b>six</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/huit.mp3`}><b>huit</b></AudioClip> or&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/dix.mp3`}><b>dix</b></AudioClip> are followed by a word starting with a consonant,
						the final consonant of the number is <b>not</b> pronounced.</p>
					<p>e.g.&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/six villages.mp3`}><b>six villages</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/huit villes.mp3`}><b>huit villes</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/dix pays.mp3`}><b>dix pays</b></AudioClip></p>
					<p>The last consonant of the number is pronounced as might be anticipated if the word following the number begins with a vowel.</p>
					<p>e.g.&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/six enfants.mp3`}><b>six enfants</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/huit étudiants.mp3`}><b>huit étudiants</b></AudioClip>,&nbsp;
						<AudioClip className={`link`} soundFile={`sounds/fr/dix élèves.mp3`}><b>dix élèves</b></AudioClip>
					</p>
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


