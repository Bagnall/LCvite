import './CustomComponents_SP.scss';
import {
	Attribution,
	AudioClip,
	Figure,
	// Table,
	// TableBody,
	// TableCell,
	// TableHead,
	// TableHeader,
	// TableRow,
} from '..';
import {
	Table,
	TableBody,
	TableCell,
	// TableHead,
	// TableHeader,
	TableRow,
} from "@/Components/ui/table";
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
// 	"titleText": "Grammar and Usage"
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
        19.00 and 21.30) until you go to bed. Use&nbsp;
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
						<Table>
							<TableBody>
								<TableRow>
									<TableCell><AudioClip className={`link`} soundFile={`sounds/sp/una amiga ruidosa.mp3`}><b>una amiga ruidosa</b></AudioClip></TableCell><TableCell>a loud (female) friend</TableCell></TableRow>
								<TableRow>
									<TableCell><AudioClip className={`link`} soundFile={`sounds/sp/un amigo ruidoso.mp3`}><b>un amigo ruidoso</b></AudioClip></TableCell><TableCell>a loud (male) friend</TableCell></TableRow>
								<TableRow>
									<TableCell><AudioClip className={`link`} soundFile={`sounds/sp/unas amigas ruidosas.mp3`}><b>unas amigas ruidosas</b></AudioClip></TableCell><TableCell>some loud (female) friends</TableCell></TableRow>
								<TableRow>
									<TableCell><AudioClip className={`link`} soundFile={`sounds/sp/unos amigos ruidosos.mp3`}><b>unos amigos ruidosos</b></AudioClip></TableCell><TableCell>some loud (not-all-female) friends</TableCell></TableRow>
							</TableBody>
						</Table>
						<br/>
						<p className="px-5 text-xl">
        following the development of gender-neutral -e:
						</p>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell><b>unes amigues ruidoses</b></TableCell><TableCell>some loud friends</TableCell></TableRow>
							</TableBody>
						</Table>
					</section>
				</div>
			</div>
		);
	};
}

export class LO3Intro extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo3-intro-container container`}
				id={`${id ? id : ''}`}
				key={`${id}LO3Intro`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}LO3Intro`}
				>
					<div className="intro-contents">
						<div className="intro-text-div">

							<h1 className="intro-h1">Numbers</h1>

							<p>Here you can see at a glance the Spanish key language related to Numbers: 0-1,000,000, millions and more,
								including the ordinals and some basic maths expressions.</p>
						</div>
						<div className="intro-img">
							<img
								src={resolveAsset(`images/Numbers.png`)}
								alt={`image of 3d digits`}
								title={`image of 3d digits`}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	};
}

export class LO3KnowHow1 extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo3-know-how-1 container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}CustomComponent`}
				>
					<p>KNOW - HOW: Additional Information</p>
					<p>Additional Information (adapted into English)</p>
					<p>Numbers with more than one element are joined together with a dot (point). For example: 4.560 (cuatro mil
		quinientos sesenta).</p>
					<p>As a curiosity, we point out that the European numbering system (including Spanish) is different from the
		Anglo-Saxon one. In the Spanish speaking world, un billón means one million million, while in the Anglo-Saxon
		system a billion means one thousand million:</p>
					<p>Spain: Un billón = 1.000.000.000.000</p>
					<p>Anglo-Saxon countries: Un billón = 1.000.000.000</p>
					<p>The way of separating thousands and decimals is also different. In Spanish-speaking countries we use the dot (.)
		to separate thousands and the comma (,) to separate decimals:</p>
					<p>3.537,52 = tres mil quinientos treinta y siete con cincuenta y dos.</p>
					<p></p>
					<p>Know-how (adapted into English)</p>
					<p>Spanish numbers are very easy to learn! Look carefully and try to spot the patterns.</p>
					<Table
						className={`
							w-full
							[&_td]:align-top
							[&_th]:align-top
							[&_th]:whitespace-normal
							[&_td]:whitespace-normal
							[&_td]:break-words
							[&_ul]:list-disc
							[&_ul]:ml-6 
						`}
					>
						<TableBody>
							<TableRow>
								<TableCell>Español: (instrucción) Escucha a la gente hablar de millones y más, haciendo clic en los iconos de audio. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Escucha a la gente hablar de millones y más, haciendo clic en los iconos de audio.mp3`}/>
								</TableCell>
								<TableCell>Listen to people talking about millions and more by clicking on the audio icons.</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>1.000.000 - un millón de personas visitaron Cambridge el año pasado. <AudioClip className={`super-compact`} soundFile={`sounds/sp/un millón de personas visitaron Cambridge el año pasado.mp3`}/></TableCell>
								<TableCell>1,000,000 - one million people visited Cambridge last year.</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>16.789.223 - El producto interno bruto de Colombia es dieciséis millones setecientos ochenta y nueve mil doscientos veintitrés dólares. <AudioClip className={`super-compact`} soundFile={`sounds/sp/El producto interno bruto de Colombia es dieciséis millones setecientos ochenta y nueve mil doscientos veintitrés dólares.mp3`}/></TableCell>
								<TableCell>16,789,223 - The gross domestic product of Colombia is sixteen million seven hundred eighty-nine
				thousand two hundred twenty-three dollars.</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>2.000.000 - dos millones. <AudioClip className={`super-compact`} soundFile={`sounds/sp/dos millones.mp3`}/></TableCell>
								<TableCell>2,000,000 - two million</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>12.000.000 € - el premio de la lotería es de doce millones de euros. <AudioClip className={`super-compact`} soundFile={`sounds/sp/el premio de la lotería es de doce millones de euros.mp3`}/></TableCell>
								<TableCell>12,000,000 € - the lottery prize is twelve million euros</TableCell>
							</TableRow>

							<TableRow>
								<TableCell>
									<ol>
										<li>Números 1-15</li>
									</ol>
									<p>Spanish:<br />Para los números del 0 al 10 no hay un patrón real; hay que memorizarlos porque
										reaparecen constantemente: cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve,
										diez. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Para los números del 0 al 10 no hay un patrón real hay que memorizarlos porque reaparecen constantemente cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.mp3`} /></p>
									<p></p>
								</TableCell>
								<TableCell>
									<p>1. Numbers 1-15</p>
									<p>English:<br />For numbers 0-10, there is no real pattern; they must be memorised because they
					reappear throughout counting: cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.
									</p>
									<ol>
										<li>Numbers 11-15</li>
									</ol>
									<p>The next group (11-15) has a common ending -ce: once, doce, trece, catorce, quince.</p>
									<p></p>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<ol>
										<li>Números del 11-15 <AudioClip className={`super-compact`} soundFile={`sounds/sp/Números del 11-15.mp3`}/></li>
									</ol>
									<p>El siguiente grupo (11-15) tiene la terminación común -ce: once, doce, trece, catorce, quince. <AudioClip className={`super-compact`} soundFile={`sounds/sp/El siguiente grupo (11-15) tiene la terminación común -ce once, doce, trece, catorce, quince.mp3`}/></p>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<ol>
										<li>Números 16-19 <AudioClip className={`super-compact`} soundFile={`sounds/sp/Números 16-19.mp3`}/></li>
									</ol>
									<p>Spanish:<br />Estos números significan literalmente "diez y seis", "diez y siete", etc. Se pueden escribir de dos formas: <AudioClip className={`super-compact`} soundFile={`sounds/sp/Estos números significan literalmente diez y seis, diez y siete, etc. Se pueden escribir de dos formas.mp3`}/></p>
									<ul>
										<li>Estilo antiguo: diez y seis, diez y siete, diez y ocho, diez y nueve. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Estilo antiguo diez y seis, diez y siete, diez y ocho, diez y nueve.mp3`}/></li>
									</ul>
									<p>Nota: puede encontrarse en las publicacione antiguas. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Nota puede encontrarse en las publicacione antiguas.mp3`}/></p>
									<ul>
										<li>Estilo moderno (preferido): dieciséis, diecisiete, dieciocho, diecinueve. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Estilo moderno (preferido) dieciséis, diecisiete, dieciocho, diecinueve.mp3`}/></li>
									</ul>
									<p>Nota: En la forma moderna, la "z" de diez cambia a "c" y la "y" se convierte en "i". Ambas formas se pronuncian igual. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Nota En la forma moderna, la z de diez cambia a c y la y se convierte en i. Ambas formas se pronuncian igual..mp3`}/></p>
									<p></p>
								</TableCell>
								<TableCell>
									<p>Numbers 16-19</p>
									<p>English:<br />These numbers literally mean "ten and six," "ten and seven," etc. They can be written
					in two ways:</p>
									<ul>
										<li>Old style: <AudioClip className={`super-compact`} soundFile={`sounds/sp/diez y seis, diez y siete, diez y ocho, diez y nueve..mp3`}/>diez y seis, diez y siete, diez y ocho, diez y nueve.</li>
									</ul>
									<p></p>
									<ul>
										<li>Modern style (preferred): <AudioClip className={`super-compact`} soundFile={`sounds/sp/dieciséis, diecisiete, dieciocho, diecinueve.mp3`}/>dieciséis, diecisiete, dieciocho, diecinueve.</li>
									</ul>
									<p>In the modern form, the "z" in diez becomes a "c," and the "y" becomes "i." Both are pronounced the
					same.</p>
									<p>Nowadays, the shorter, combined form is preferred, although both are correct.</p>
									<p></p>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<ol>
										<li>Números 20-29 <AudioClip className={`super-compact`} soundFile={`sounds/sp/Números 20-29.mp3`}/></li>
									</ol>
									<p>Spanish:<br />Los números del 21 al 29 se condensan en una sola palabra. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Los números del 21 al 29 se condensan en una sola palabra.mp3`}/></p>
									<p>La -'e' final de veinte desaparece y la y se convierte en i. <AudioClip className={`super-compact`} soundFile={`sounds/sp/La -e final de veinte desaparece y la y se convierte en i.mp3`}/></p>
									<p>Algunos números (22, 23, 26) llevan tilde: <AudioClip className={`super-compact`} soundFile={`sounds/sp/Algunos números (22, 23, 26) llevan tilde.mp3`}/></p>
									<p>Ejemplos:</p>
									<ul>
										<li>20 = veinte <AudioClip className={`super-compact`} soundFile={`sounds/sp/veinte.mp3`}/></li>
										<li>21 = veintiuno <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintiuno.mp3`}/></li>
										<li>22 = veintidós <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintidós.mp3`}/></li>
										<li>23 = veintitrés <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintitrés.mp3`}/></li>
										<li>24 = veinticuatro <AudioClip className={`super-compact`} soundFile={`sounds/sp/veinticuatro.mp3`}/></li>
										<li>25 = veinticinco <AudioClip className={`super-compact`} soundFile={`sounds/sp/veinticinco.mp3`}/></li>
										<li>26 = veintiséis <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintiséis.mp3`}/></li>
										<li>27 = veintisiete <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintisiete.mp3`}/></li>
										<li>28 = veintiocho <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintiocho.mp3`}/></li>
										<li>29 = veintinueve <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintinueve.mp3`}/></li>
									</ul>
									<p></p>
								</TableCell>
								<TableCell>
									<p>4. Numbers 20-29</p>
									<p>English:<br />Numbers from 21-29 are condensed into a single word.</p>
									<p>The final "-e" in veinte is dropped and the "y" becomes "i."</p>
									<p>Some numbers (22, 23, 26) require an accent:</p>
									<p>Ejemplos:</p>
									<ul>
										<li>20 = veinte <AudioClip className={`super-compact`} soundFile={`sounds/sp/veinte.mp3`}/></li>
										<li>21 = veintiuno <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintiuno.mp3`}/></li>
										<li>22 = veintidós <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintidós.mp3`}/></li>
										<li>23 = veintitrés <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintitrés.mp3`}/></li>
										<li>24 = veinticuatro <AudioClip className={`super-compact`} soundFile={`sounds/sp/veinticuatro.mp3`}/></li>
										<li>25 = veinticinco <AudioClip className={`super-compact`} soundFile={`sounds/sp/veinticinco.mp3`}/></li>
										<li>26 = veintiséis <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintiséis.mp3`}/></li>
										<li>27 = veintisiete <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintisiete.mp3`}/></li>
										<li>28 = veintiocho <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintiocho.mp3`}/></li>
										<li>29 = veintinueve <AudioClip className={`super-compact`} soundFile={`sounds/sp/veintinueve.mp3`}/></li>
									</ul>
									<p></p>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<ol>
										<li>Números 30-100 <AudioClip className={`super-compact`} soundFile={`sounds/sp/Números 30-100.mp3`}/></li>
									</ol>
									<p>Español:<br />A partir del 31, los números siguen el patrón: decena + y + unidad.<br />Por ejemplo: 31 = treinta y uno. <AudioClip className={`super-compact`} soundFile={`sounds/sp/A partir del 31, los números siguen el patrón decena y unidad. Por ejemplo 31 treinta y uno.mp3`}/></p>
									<p>Consejos:</p>
									<ul>
										<li>Excepto veinte, todas las decenas terminan en -enta (treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa) <AudioClip className={`super-compact`} soundFile={`sounds/sp/Excepto veinte, todas las decenas terminan en -enta (treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa).mp3`}/></li>
										<li>Cada decena está relacionada con el número pequeño correspondiente (cuatro → cuarenta, ocho → ochenta) <AudioClip className={`super-compact`} soundFile={`sounds/sp/Cada decena está relacionada con el número pequeño correspondiente (cuatro → cuarenta, ocho → ochenta).mp3`}/></li>
										<li>El número 100 es cien (relacionado con palabras en inglés como century o percent) <AudioClip className={`super-compact`} soundFile={`sounds/sp/El número 100 es cien (relacionado con palabras en inglés como century o percent).mp3`}/></li>
									</ul>
									<p>Aprende todas las unidades de 10 (decenas) y adiciona el digito con un claro sonido the 'y'. <AudioClip className={`link`} soundFile={`sounds/sp/Aprende todas las unidades de 10 (decenas) y adiciona el digito con un claro sonido the y.mp3`}/></p>
									<p></p>
								</TableCell>
								<TableCell>
									<p>4. Numbers 30-100</p>
									<p>English:<br />From 31 onwards, numbers follow the pattern: tens + y + units.<br />For example: 31 = <AudioClip className={`link`} soundFile={`sounds/sp/treinta y uno.mp3`}>treinta y uno</AudioClip> (thirty-one).</p>
									<p>Tips:</p>
									<ul>
										<li>Except for veinte, all the tens end in -enta (treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa).</li>
										<li>Each tens word is linked to its smaller number (cuatro → cuarenta, ocho → ochenta).</li>
										<li>The number 100 is cien (related to English words like century and percent).</li>
									</ul>
									<p>Learn all the tens and add the digit with a clear y sound (= and).</p>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<ol>
										<li>Números 101-1000 <AudioClip className={`super-compact`} soundFile={`sounds/sp/Números 101-1000.mp3`}/></li>
									</ol>
									<p>Español:</p>
									<ul>
										<li>Para los números del 101 al 199 se usa ciento:<br />ciento uno, ciento veintinueve, ciento noventa y cinco. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Para los números del 101 al 199 se usa ciento ciento uno, ciento veintinueve, ciento noventa y cinco.mp3`}/></li>
										<li>Recuerda: 100 se usa cien. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Recuerda 100 se usa cien.mp3`}/></li>
										<li>El plural de cien es cientos, no cienes. <AudioClip className={`super-compact`} soundFile={`sounds/sp/El plural de cien es cientos, no cienes.mp3`}/></li>
										<li>Algunas formas son irregulares: quinientos (500), setecientos (700), novecientos (900). <AudioClip className={`super-compact`} soundFile={`sounds/sp/Algunas formas son irregulares quinientos, setecientos, novecientos.mp3`}/></li>
										<li>Ejemplos: <AudioClip className={`super-compact`} soundFile={`sounds/sp/Ejemplos.mp3`}/></li>
										<li>101 = ciento uno <AudioClip className={`super-compact`} soundFile={`sounds/sp/ciento uno.mp3`}/></li>
										<li>120 = ciento veinte <AudioClip className={`super-compact`} soundFile={`sounds/sp/ciento veinte.mp3`}/></li>
										<li>135 = ciento treinta y cinco <AudioClip className={`super-compact`} soundFile={`sounds/sp/ciento treinta y cinco.mp3`}/></li>
										<li>200 = doscientos <AudioClip className={`super-compact`} soundFile={`sounds/sp/doscientos.mp3`}/></li>
										<li>450 = cuatrocientos cincuenta <AudioClip className={`super-compact`} soundFile={`sounds/sp/cuatrocientos cincuenta.mp3`}/></li>
										<li>900 = novecientos <AudioClip className={`super-compact`} soundFile={`sounds/sp/novecientos.mp3`}/></li>
									</ul>
									<p></p>
								</TableCell>
								<TableCell>
									<p>Numbers 101-1000</p>
									<p>English:</p>
									<ul>
										<li>For numbers from 101 to 199, use ciento:<br />ciento uno, ciento veintinueve, ciento noventa y cinco. </li>
										<li>For exactly 100, use cien.</li>
										<li>The plural of cien is cientos, not cienes.</li>
										<li>Some forms are irregular: quinientos (500), setecientos (700), novecientos (900).</li>
										<li>Examples:</li>
										<li>101 = ciento uno (one hundred and one) <AudioClip className={`super-compact`} soundFile={`sounds/sp/ciento uno.mp3`}/></li>
										<li>120 = ciento veinte (one hundred and twenty) <AudioClip className={`super-compact`} soundFile={`sounds/sp/ciento veinte.mp3`}/></li>
										<li>135 = ciento treinta y cinco (one hundred and thirty-five) <AudioClip className={`super-compact`} soundFile={`sounds/sp/ciento treinta y cinco.mp3`}/></li>
										<li>200 = doscientos (two hundred) <AudioClip className={`super-compact`} soundFile={`sounds/sp/doscientos.mp3`}/></li>
										<li>450 = cuatrocientos cincuenta (four hundred and fifty) <AudioClip className={`super-compact`} soundFile={`sounds/sp/cuatrocientos cincuenta.mp3`}/></li>
										<li>900 = novecientos (nine hundred) <AudioClip className={`super-compact`} soundFile={`sounds/sp/novecientos.mp3`}/></li>
									</ul>
									<p></p>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<ol>
										<li>Números 1.000-1.000.000 <AudioClip className={`super-compact`} soundFile={`sounds/sp/Números 1.000-1.000.000.mp3`}/></li>
									</ol>
									<p>Español:</p>
									<ul>
										<li>"Mil" significa one thousand. No se usa un mil; se dice simplemente mil. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Mil significa one thousand. No se usa un mil se dice simplemente mil.mp3`}/></li>
										<li>Para separar las cifras, en español se utiliza el punto (.) para los millares y la coma (,) para los decimales. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Para separar las cifras, en español se utiliza el punto para los millares y la coma para los decimales.mp3`}/></li>
									</ul>
									<p>Ejemplos:</p>
									<ul>
										<li>1.000 = mil <AudioClip className={`super-compact`} soundFile={`sounds/sp/mil.mp3`}/></li>
										<li>1.500 = mil quinientos <AudioClip className={`super-compact`} soundFile={`sounds/sp/mil quinientos.mp3`}/></li>
										<li>2.000 = dos mil <AudioClip className={`super-compact`} soundFile={`sounds/sp/dos mil.mp3`}/></li>
										<li>3.000 = tres mil <AudioClip className={`super-compact`} soundFile={`sounds/sp/tres mil.mp3`}/></li>
										<li>10.000 = diez mil <AudioClip className={`super-compact`} soundFile={`sounds/sp/diez mil.mp3`}/></li>
										<li>1.000.000 = un millón <AudioClip className={`super-compact`} soundFile={`sounds/sp/un millón.mp3`}/></li>
									</ul>
									<p></p>
								</TableCell>
								<TableCell>
									<p>Numbers 1,000-1,000,000</p>
									<p>English:</p>
									<ul>
										<li>Mil means one thousand. You do not say un mil; simply use mil.</li>
										<li>To separate numbers, Spanish uses the dot (.) for thousands and the comma (,) for decimals.</li>
									</ul>
									<p>Examples:</p>
									<ul>
										<li>1.000 = mil (one thousand) <AudioClip className={`super-compact`} soundFile={`sounds/sp/mil.mp3`}/></li>
										<li>1.500 = mil quinientos (one thousand five hundred) <AudioClip className={`super-compact`} soundFile={`sounds/sp/mil quinientos.mp3`}/></li>
										<li>2.000 = dos mil (two thousand) <AudioClip className={`super-compact`} soundFile={`sounds/sp/dos mil.mp3`}/></li>
										<li>3.000 = tres mil (three thousand) <AudioClip className={`super-compact`} soundFile={`sounds/sp/tres mil.mp3`}/></li>
										<li>10.000 = diez mil (ten thousand) <AudioClip className={`super-compact`} soundFile={`sounds/sp/diez mil.mp3`}/></li>
										<li>1.000.000 = un millón (one million) <AudioClip className={`super-compact`} soundFile={`sounds/sp/un millón.mp3`}/></li>
									</ul>
									<p></p>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<ol>
										<li>Cómo hablar de los años y las fechas <AudioClip className={`super-compact`} soundFile={`sounds/sp/Cómo hablar de los años y las fechas.mp3`}/></li>
									</ol>
									<p>Español:<br />Hablar de los años en español es muy sencillo, ya que se leen como números cardinales. <AudioClip className={`super-compact`} soundFile={`sounds/sp/Hablar de los años en español es muy sencillo, ya que se leen como números cardinales.mp3`}/></p>
									<p>Ejemplos <AudioClip className={`super-compact`} soundFile={`sounds/sp/Ejemplos.mp3`}/>:</p>
									<ul>
										<li>En el año 1492 (mil cuatrocientos noventa y dos), Cristóbal Colón descubrió América. <AudioClip className={`super-compact`} soundFile={`sounds/sp/En el año 1492 (mil cuatrocientos noventa y dos), Cristóbal Colón descubrió América.mp3`}/></li>
										<li>¿En qué año naciste? - Yo nací en 1974 (mil novecientos setenta y cuatro). <AudioClip className={`super-compact`} soundFile={`sounds/sp/¿En qué año naciste - Yo nací en 1974 (mil novecientos setenta y cuatro).mp3`}/></li>
										<li>¿Cuándo empezó el proceso de independencia en Colombia? - En 1819 (mil ochocientos diecinueve).	<AudioClip className={`super-compact`} soundFile={`sounds/sp/¿Cuándo empezó el proceso de independencia en Colombia - En 1819 (mil ochocientos diecinueve).mp3`}/></li>
									</ul>
									<p></p>
								</TableCell>
								<TableCell>
									<p>6. How to Talk about Years and dates</p>
									<p>English:<br />Talking about years in Spanish is very straightforward, because they are said just like
					regular cardinal numbers.</p>
									<p>Examples:</p>
									<ul>
										<li>In the year 1492 (mil cuatrocientos noventa y dos <AudioClip className={`super-compact`} soundFile={`sounds/sp/mil cuatrocientos noventa y dos.mp3`}/>), Christopher Columbus discovered America.
										</li>
										<li>What year were you born? - I was born in 1974 (mil novecientos setenta y cuatro <AudioClip className={`super-compact`} soundFile={`sounds/sp/mil novecientos setenta y cuatro.mp3`}/>).</li>
										<li>When did the Colombian independence process begin? - In 1819 (mil ochocientos diecinueve <AudioClip className={`super-compact`} soundFile={`sounds/sp/mil ochocientos diecinueve.mp3`}/>). </li>
									</ul>
									<p></p>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</div>
		);
	};
}



export class LO4Intro extends PureComponent {
	render = () => {
		const { id } = this.props;
		return (
			<div
				className={`lo4-intro-container container`}
				id={`${id ? id : ''}`}
				key={`${id}CustomComponent`}
			>
				<div
					className={`panel`}
					id={`${id ? `${id}Panel` : ''}`}
					key={`${id}LO4Intro`}
				>
					<div className="intro-contents">
						<div className="intro-text-div">
							<h1 className="intro-h1">About Me</h1>
							<p className="intro-text">Here you can see at a glance the Spanish key language related to you:
							name, nationality, residence, professions, marital status and family.</p>
						</div>
						<div className="intro-img">
							<img
								src={resolveAsset(`images/All_about_me.png`)}
								alt={`image of a friendly man with his hand on his chest`}
								title={`image of a friendly man with his hand on his chest`}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	};
}
export class LO4KnowHow1 extends PureComponent {
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



						<p>"¿Cómo te llamas?" literally means "how do you call yourself?". "Me llamo ..." literally means "I call myself ...".</p>
						<p>In formal situation Spanish uses the third form of the verb (él) of 'you'.</p>
						<p>In Spanish there are two ways of saying "you": There's the informal form, tú and the more formal usted (often abbreviated as Ud.) when using pronoun usted, the verb must be conjugated in the 3rd person singular, e.g. es, está, tiene, puede, etc.</p>


					</section>
				</div>
			</div>
		);
	};
}


export class LO6Intro extends PureComponent {
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
							<h1 className="intro-h1">The Weather and the Seasons</h1>
							<p className="intro-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim tempora nisi eveniet voluptates asperiores fugiat delectus sunt laudantium assumenda quam culpa facere veniam magnam ducimus veritatis, quaerat exercitationem. Sed odit reprehenderit, temporibus eius aut natus laudantium qui quam architecto delectus.</p>
						</div>
						<div className="intro-img">
							<img
								src={resolveAsset(`images/Calendar_and_weather.png`)}
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