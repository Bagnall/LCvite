export const initialViewOffset = 24; // To reveal edge of card table

export const addNonDuplicateHeaders = (dataSet, headers) => {

	const flatHeaders = dataSet.headers.map((header) => JSON.stringify(header));
	// console.log("flatHeaders", flatHeaders);
	headers.forEach((header) => {
		const flatHeader = JSON.stringify(header);
		const foundIndex = flatHeaders.indexOf(flatHeader);
		if (foundIndex === -1) dataSet.headers.push(header);
	});
};

export const appendScript = (scriptToAppend, DOMnode, callback) => {
	const script = document.createElement("script");
	script.type = 'text/javascript';
	script.async = true;
	script.src = scriptToAppend;
	DOMnode.appendChild(script);
	script.onload = () => callback;
};

export const arrayIncludesObject = (seeking, arrayToSearch) => {

	// For an array of objects, checks if it includes the object in question
	return arrayToSearch.some(element => {
		return JSON.stringify(seeking) === JSON.stringify(element);
	});
};

export const base64ToBlob = (base64String, contentType = '') => {
	const byteCharacters = atob(base64String);
	const byteArrays = [];

	for (let i = 0; i < byteCharacters.length; i++) {
		byteArrays.push(byteCharacters.charCodeAt(i));
	}

	const byteArray = new Uint8Array(byteArrays);
	return new Blob([byteArray], { type: contentType });
};

export const clearCanvas = (canvas) => {
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
};

export const copyObject = (originalObject) => {
	// console.log("copyObject", originalObject);
	if (originalObject) return JSON.parse(JSON.stringify(originalObject)); // If you know of a better solution, please enlighten me.
	return;
};

export const getCardById = (id, dataSet) => {
	// Note - card - any card including stacked card or 'stack'
	const { rows: molecules = [], stacks = [] } = dataSet;
	const stack = stacks.find(item => {
		return item.id === `${id}`;
	});
	if (stack) return stack;
	const molecule = molecules.find(item => {
		return item.id === `${id}`;
	});
	return molecule;
};

export const getHighAndLow = (s1, s2) => {
	if (s1 < s2) return { high: s2, low: s1 };
	return { high: s1, low: s2 };
};

export const getMoleculeById = (id, dataSet) => {
	// Molecules only, no stacks
	// const { dataSets, currentDataSet } = this.state;
	// const dataSet = dataSets[currentDataSet];
	const { rows } = dataSet;
	return rows.find(item => {
		return item.id === id;
	});
};

export const getStackSelectedCount = (stack, molecules) => {
	let nMolecules = 0;
	let nSelected = 0;
	const { molecules: stackMolecules } = stack;
	stackMolecules.map((moleculeId) => {
		const { 0: m } = molecules.filter(item => moleculeId === item.id);
		if (m) {
			nMolecules++;
			if (m.selected) nSelected++;
		}
		return false;
	});
	return 100 * nSelected / nMolecules;
};

export const handleResponse = (response) => {
	// Used in all API calls
	if (response.status === 204) return Promise.resolve(true);
	return response.json()
		.then((json) => {
			if (!response.ok) {
				const error = {
					...json,
					...{
						message: json.message,
						status: response.status,
						statusText: response.statusText,
					}
				};
				return Promise.reject(error);
			}
			return json;
		});
};

export const handleResponseCSV = (response) => {
	// Used in all CSV API calls
	if (response.status === 204 /* || response.status === 200 */) return Promise.resolve(true);
	return response.text()
		.then((text) => {
			let error = '';
			if (response.status === 404) {
				error = { message: "Sorry, file is unavailable at this time" };
				return Promise.reject(error);
			}
			if (!response.ok) {
				if (typeof (text) === 'string') {
					try {
						error = JSON.parse(text);
					}
					catch {
						error = { message: text };
					}
					return Promise.reject(error);
				} else {
					error = {
						...text,
						...{
							message: text.message,
							status: response.status,
							statusText: response.statusText,
						}
					};
					return Promise.reject(error);
				}
			}
			return text;
		});
};

export const handleResponseText = (response) => {
	// Used in all API calls
	if (response.status === 204) return Promise.resolve(true);
	return response.text()
		.then((res) => {
			if (!response.ok) {
				const error = {
					...res,
					...{
						message: res.message,
						status: response.status,
						statusText: response.statusText,
					}
				};
				return Promise.reject(error);
			}
			return res;
		});
};

function scrollToElement(element, menuOffset) {
	if (!element) return;

	// Get bounding rectangle relative to viewport
	const rect = element.getBoundingClientRect();

	// Adjust by the current scroll position
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

	// Calculate coordinates relative to the page
	const top = rect.top + scrollTop - menuOffset;
	const left = rect.left + scrollLeft;

	// Scroll to that position
	window.scrollTo({
		top: top,
		left: left,
		behavior: 'smooth'
	});
}

export const handleSpecialLinkClick = (e) => {
	// Wow, we need this (unfortunately) so that we can hyperlink between parts of the document, most importantly,
	// a target that may be hidden in a collapsed accordion. We need to try to find the target, expand the accordion and any parent accordions,
	// then do a nice scroll, rather than a jump, to the target. Maybe we can highlight it too?

	// console.log("handleSpecialLinkClick", e);
	e.preventDefault();
	const href = e.target.getAttribute('href');
	// console.log("href", href);
	const [, name] = href.split('#');
	// console.log(`.special-anchor-target[name='${name}']`, `.special-anchor-target[name='${name}']`);
	const specialAnchorTargets = document.querySelectorAll(`.special-anchor-target[name='${name}']`);
	// console.log("specialAnchorTargets.length", specialAnchorTargets.length);
	if (specialAnchorTargets.length === 1) { // Should only ever be one!
		const [specialAnchorTarget] = specialAnchorTargets;
		// console.log("SPECIAL ANCHOR TARGET", specialAnchorTarget);
		// And it should be within an accordion (or even nested accordions)
		let accordionArticle = specialAnchorTarget.closest('article.accordion-article');
		// console.log("accordionArticle", accordionArticle);

		if (accordionArticle !== null) {
			while (accordionArticle) {
				// Expand it!
				// console.log("while", accordionArticle);
				// console.log("window.refs", window.refs);
				try {
					const ref = window.refs.find((r) => {
						// console.log("searching", r, r && r.props.id, accordionArticle.id);
						return r !== null && r.props.id === accordionArticle.id;
					});
					// console.log("ref", ref);
					ref.setState({ expanded: true },
						() => setTimeout(() => {
							// Flash a highlight colour to help the user to spot it.
							specialAnchorTarget.classList.add('flash');
							// Smooth scroll to the target to give the user chance to track to it instead of just jumping to some unidentifiable part of a piece of text.
							// const targetRect = specialAnchorTarget.getBoundingClientRect();
							// console.log("10 targetRect", targetRect);
							// console.log("10 SCROLLTO", targetRect.top, -80);
							// scrollTo({ behavior: 'smooth', left: targetRect.left, top: targetRect.top - 80 });
							scrollToElement(specialAnchorTarget, 80);
							setTimeout(() => { specialAnchorTarget.classList.remove('flash'); }, 5000); // Remove the flashing highlight afte a suitable delay
						}, 500)
					);
				} catch (err) {
					console.log(err); // eslint-disable-line
				}
				accordionArticle = accordionArticle.parentNode.closest('article.accordion-article'); // Go round again in case it's nested
			}
		} else {
			// console.log("Not an accordion");
			// Flash a highlight colour to help the user to spot it.
			specialAnchorTarget.classList.add('flash');
			// Smooth scroll to the target to give the user chance to track to it instead of just jumping to some unidentifiable part of a piece of text.
			// const targetRect = specialAnchorTarget.getBoundingClientRect();
			// console.log("20 targetRect", targetRect);
			// console.log("20 SCROLLTO", targetRect.top, -80);
			// scrollTo({ behavior: 'smooth', left: targetRect.left, top: targetRect.top - 80 });
			scrollToElement(specialAnchorTarget, 80);
			setTimeout(() => { specialAnchorTarget.classList.remove('flash'); }, 5000); // Remove the flashing highlight afte a suitable delay
		}

	}
	// console.log("specialAnchorTargets", specialAnchorTargets);

};

export const highlightTextDiff = (a, b, countCorrect, sounds = false) => {
	const m = a.length, n = b.length;
	const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
	const correctAudio = new Audio(resolveAsset('/sounds/ting.mp3'));
	const errorAudio = new Audio(resolveAsset('/sounds/error.mp3'));
	// const {
	// 	countCorrect = () => { },
	// } = this.props;

	// Fill LCS table
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (a[i - 1] === b[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}

	// Backtrack to build diff
	let i = m, j = n;
	const result = [];
	let correct = true;
	while (i > 0 || j > 0) {
		if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
			result.unshift(`<span>${a[i - 1]}</span>`);
			i--; j--;
		} else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
			result.unshift(`<span class='inserted' title="inserted">${b[j - 1]}</span>`);
			correct = false;
			j--;
		} else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
			result.unshift(`<span class='deleted' title="deleted">${a[i - 1]}</span>`);
			correct = false;
			i--;
		}
	}
	if (correct) {
		if(sounds)correctAudio.play();
		countCorrect();
	} else {
		if(sounds)errorAudio.play();
	}

	return result.join('');
};

export const isAlphaNumeric = (str) => { // Within the rules for datasets
	let code, i, len;

	for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (
			!(code > 47 && code < 58) && // numeric (0-9)
			!(code > 64 && code < 91) && // upper alpha (A-Z)
			!(code > 96 && code < 123) &&// lower alpha (a-z)
			!(code === 95 || code === 45)
		) {
			return false;
		}
	}
	return true;
};

export const isTouchChrome = () => {
	const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	const ua = navigator.userAgent;
	const {vendor} = navigator;

	const isChrome = /Chrome/.test(ua) && /Google Inc/.test(vendor);
	const isEdge = /Edg\//.test(ua); // Detect Edge explicitly

	return isTouchDevice && isChrome && !isEdge;
};

export const playAudioLink = (soundFile) => {
	// console.log("playAudioLink", soundFile);
	const soundFileAudio = new Audio(resolveAsset(soundFile));
	soundFileAudio.play();
};

export const replaceSelectWithSpan = (selectElement) => {
	// console.log("replaceSelectWithSpan");
	const selectedText = selectElement.options[selectElement.selectedIndex].text;
	const span = document.createElement('span');
	span.textContent = selectedText;
	// span.className = 'replaced-select'; // Optional: for styling
	selectElement.classList.forEach(cls => span.classList.add(cls));

	// Replace the <select> in the DOM
	selectElement.parentNode.replaceChild(span, selectElement);
};

export const resolveAsset = (path = '') => {
	return `${import.meta.env.BASE_URL}${path}`;
};

export const resolveAssetHTML = (html) => {
	const base = import.meta.env.BASE_URL || '/';
	return html.replace(/(src|href)=["'](?!https?:\/\/)([^"']+)["']/g, (match, attr, path) => {
		const resolved = path.startsWith(base) ? path : `${base}${path}`;
		return `${attr}="${resolved}"`;
	});
};

export const shuffleArray = (array) => {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {

		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
};

export const speak = (e, synth, targetLanguageCode, voices, text) => {
	// console.log("speak", synth, targetLanguageCode, voices);
	// alert("speak", synth, targetLanguageCode, voices);
	e.preventDefault();
	let utterThis;
	if (text !== undefined) {
		utterThis = new SpeechSynthesisUtterance(text);
	} else {
		let { target } = e;
		while (!target.classList.contains('speak')) target = target.parentNode;
		utterThis = new SpeechSynthesisUtterance(target.innerText);
	}
	utterThis.onend = () => {
		console.log("SpeechSynthesisUtterance.onend"); // eslint-disable-line
	};

	utterThis.onerror = () => {
		console.error("SpeechSynthesisUtterance.onerror"); // eslint-disable-line
	};

	utterThis.onpause = (event) => {
		const char = event.utterance.text.charAt(event.charIndex);
		console.log(`Speech paused at character ${event.charIndex} of "${event.utterance.text}", which is "${char}".`); // eslint-disable-line
	};

	utterThis.lang = targetLanguageCode;
	switch (targetLanguageCode){
		case "fr-FR": {
			utterThis.name = 'Google français';
			utterThis.voiceURI = 'Google français';
			break;
		}
		case "de-DE": {
			utterThis.name = 'Google Deutsch';
			utterThis.voiceURI = 'Google Deutsch';
			break;
		}
		case "es-ES": {
			utterThis.name = 'Google español';
			utterThis.voiceURI = 'Google español';
			break;
		}
		default: {
			utterThis.name = 'Google français';
			utterThis.voiceURI = 'Google français';
			break;
		}
	}
	[utterThis.voice] = voices;
	utterThis.pitch = 1;
	utterThis.rate = 1;
	synth.speak(utterThis);

};

export const titleCase = (str) => {
	const splitStr = str.toLowerCase().split(' ');
	for (let i = 0; i < splitStr.length; i++) {
		// You do not need to check if i is larger than splitStr length, as your for does that for you
		// Assign it back to the array
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	// Directly return the joined string
	return splitStr.join(' ');
};

export const uuidv4 = () => {
	// console.trace('uuidv4');
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> c) / 4)).toString(16)
	);
};
