import './CustomComponents_SP.scss';
import {
	Attribution,
	AudioClip,
	Figure,
} from '..';
import { Component, PureComponent } from 'react';
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

export class LO1Intro extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo1-grammar-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent1`}
				>
					<div className="intro-contents">
						<div className="intro-text-div">
							<h1 className="intro-h1">First Contact</h1>
							<p className="intro-text">Here you can see at a glance the Spanish key language related to
							first contact: greetings, addressing people and introducing
							someone.</p>
						</div>
						<div className="intro-img">
							<img
								src={resolveAsset(`images/First_contact.png`)}
								alt={`image of a friendly woman holding out her hand to greet someone`}
								title={`image of a friendly woman holding out her hand to greet someone`}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	};
}

export class LO1KnowHow1 extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo1-know-how-1 container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent1`}
				>
					<section className="know-how">
						<h2 className="mx-auto font-bold text-2xl">Know-how:</h2>

						<p className="px-5">
							<strong>'Hello' or 'goodbye'</strong> depend on the time of day. In
							Spanish the day is divided into four parts: <AudioClip className={`link`} soundFile={`sounds/sp/la mañana.mp3`} ><b>la mañana</b></AudioClip> (morning),&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/sp/la tarde.mp3`} ><b>la
								tarde</b></AudioClip> (afternoon),&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/sp/la noche.mp3`} ><b>la noche</b></AudioClip> (evening -night).
						</p>
						<p className="px-5">
							<AudioClip className={`link`} soundFile={`sounds/sp/Buenos dias.mp3`} ><b>Buenos dias</b></AudioClip> is the right phrase to use until lunch
        time (normally between 12.00 and 14.00).
						</p>
						<p className="px-5">
        Use <AudioClip className={`link`} soundFile={`sounds/sp/Buenas tardes.mp3`} ><b>Buenas tardes</b></AudioClip> until 17.00/18.00 and&nbsp;
							<AudioClip className={`link`} soundFile={`sounds/sp/Buenas noches.mp3`} ><b>Buenas noches</b></AudioClip> from dinner time (normally between
        19.00 and 21.30) until you go to bed. Use
							<AudioClip className={`link`} soundFile={`sounds/sp/buenas noches, hasta mañana.mp3`} ><b>buenas noches, hasta mañana</b></AudioClip> only to say goodbye to
        someone before going home after dinner or to wish someone a good night
        before they go to bed.
						</p>
					</section>
				</div>
			</div>
		);
	};
}

export class LO1KnowHow2 extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo1-know-how-2 container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent2`}
				>
					<section className="know-how">
						<h2 className="mx-auto font-bold text-2xl">Know-how:</h2>

						<p className="px-5">In Spanish, we have two forms of <b>you</b>: <AudioClip className={`link`} soundFile={`sounds/sp/tú.mp3`} ><b>tú</b></AudioClip> and <AudioClip className={`link`} soundFile={`sounds/sp/usted.mp3`} ><b>usted</b></AudioClip>. Their use depends on the person you are
        talking to.</p>
						<p className="px-5"><AudioClip className={`link`} soundFile={`sounds/sp/tú.mp3`} ><b>Tú</b></AudioClip> is more widley used with friends, family members and children.</p>
						<p className="px-5"><AudioClip className={`link`} soundFile={`sounds/sp/usted.mp3`} ><b>Usted</b></AudioClip> is used in more formal situations like:</p>
						<p className="px-5">— meeting someone for the first time for work.</p>
						<p className="px-5">— speaking to people who are senior to you by age or social situation (bank manager,
        university/school staff, doctors).</p>
						<p className="px-5"> — asking for directions in the street.</p>
						<p className="px-5">— shopping or in a restaurant talking to assistants or waiters.</p>
						<p className="px-5">
        The <AudioClip className={`link`} soundFile={`sounds/sp/usted.mp3`} ><b>Usted</b></AudioClip> form can also be used to show respect (for example to an elderly person) or, conversely, to keep a
        certain distance. When you get to know someone a bit better, you can start using <AudioClip className={`link`} soundFile={`sounds/sp/tú.mp3`} ><b>tú</b></AudioClip>. The best policy is to
        listen to how the Spanish speaking people address you and follow their example.
						</p>
					</section>
				</div>
			</div>
		);
	};
}

export class LO1KnowHow3 extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo1-know-how-3 container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent3`}
				>
					<section className="know-how">
						<h2 className="mx-auto font-bold text-2xl">Know-how:</h2>

						<p className="px-5">
							Este es … Federico: you use <AudioClip className={`link`} soundFile={`sounds/sp/este.mp3`} ><b>este</b></AudioClip> because Federico, the person you are introducing, is male or
							neutral gendre. <AudioClip className={`link`} soundFile={`sounds/sp/Esta es Beatríz.mp3`} ><b>Esta es … Beatríz</b></AudioClip>: you use <AudioClip className={`link`} soundFile={`sounds/sp/esta.mp3`} ><b>esta</b></AudioClip> because Beatríz, the person you are introducing, is female.
						</p>
						<p className="px-5">
        In formal introductions, you usually use the person's name + surname or their title + surname (<AudioClip className={`link`} soundFile={`sounds/sp/señor.mp3`} ><b>señor</b></AudioClip> for a man
        and <AudioClip className={`link`} soundFile={`sounds/sp/señora.mp3`} ><b>señora</b></AudioClip> for a woman and <AudioClip className={`link`} soundFile={`sounds/sp/señorita.mp3`} ><b>señorita</b></AudioClip> for a young lady).
						</p>

					</section>
				</div>
			</div>
		);
	};
}

export class LO1UngenderedSpanish extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo1-ungendered-spanish container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent4`}
				>
					<section
						id="ungendered-spanish"
						className="flex flex-col bg-spanishYellow mx-auto my-10 w-full rounded-lg p-3 shadow-xl">
						<h2 className="mx-auto font-bold text-2xl">Ungendered Spanish (the future in our hands)</h2>

						<p className="px-5">
        In recent years, the gender-neutral movement has changed vocabulary in many languages forced by the everyday use
        of the language. The society changes so the language that they use to communicate.
						</p>
						<p className="px-5">
        Since Spanish is a gendered language, all nouns and pronouns have a gender. What to do then?
						</p>
						<p className="px-5">
        However, the dictionaries in Spanish are not as accepting of gender neutrality. In fact, at the end of October
        2020, the Real Academia Española (the utmost authority of the Spanish language,) suggested on their website the
        use of the pronoun "elle" (pronounced "Eh-jeh"). But a few days later, they retracted the entry, stating that "
        'elle' is a created and promoted by certain groups of people to allude to those that do not identify with either
        of the two traditional genders in use." They also added that due to the confusion that the entry had on the
        readers, they decided to retract its entry in the Observatorio de Palabras, and that if the term becomes more
        commonly used they would consider to add it again.
						</p>
						<p className="px-5">
        Along with the "elle" movement, in Spanish, inclusivity has included the use of the bar: (amigos/amigas), the @:
        (amig@s), x: (amigx), and e: (amigues). The word "les" (instead of los or las) is also used.
						</p>
						<p className="px-5">
        In other words, if the Real Academia Española does not accept it, the reality will cause it to be tomorrow.
        Reality is first, and language follows. As it goes, let's start our change with something simple using 'e' as
        the neutral gender.
						</p>
						<br/>
						<p className="px-5 text-xl">
        Learn how:
						</p>
						<table>
							<tbody>
								<tr><td><AudioClip className={`link`} soundFile={`sounds/sp/una amiga ruidosa.mp3`}><b>una amiga ruidosa</b></AudioClip></td><td>a loud (female) friend</td></tr>
								<tr><td><AudioClip className={`link`} soundFile={`sounds/sp/un amigo ruidoso.mp3`}><b>un amigo ruidoso</b></AudioClip></td><td>a loud (male) friend</td></tr>
								<tr><td><AudioClip className={`link`} soundFile={`sounds/sp/unas amigas ruidosas.mp3`}><b>unas amigas ruidosas</b></AudioClip></td><td>some loud (female) friends</td></tr>
								<tr><td><AudioClip className={`link`} soundFile={`sounds/sp/unos amigos ruidosos.mp3`}><b>unos amigos ruidosos</b></AudioClip></td><td>some loud (not-all-female) friends</td></tr>
							</tbody>
						</table>
						<br/>
						<p className="px-5 text-xl">
        following the development of gender-neutral -e:
						</p>
						<table>
							<tbody>
								<tr><td><AudioClip className={`link`} soundFile={`sounds/sp/una amiga ruidosa.mp3`}><b>unes amigues ruidoses</b></AudioClip></td><td>some loud friends</td></tr>
							</tbody>
						</table>
					</section>
				</div>
			</div>
		);
	};
}