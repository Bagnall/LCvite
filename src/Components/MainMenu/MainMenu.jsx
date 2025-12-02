import "./MainMenu.scss";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
	IconButton
} from '..';
import React from "react";

export class MainMenu extends React.Component {

	constructor(props) {

		super(props);
		this.state = ({menuHighlight: `menuItem-intro`});
		this.lastKnownScrollPosition = 0;

	}

	componentDidMount = () => {
		// console.log("MainMenu Mount");

		let ticking = false;

		// Determine if an element is in the visible viewport
		const isInViewport = (element) => {
			if (!element) return false;
			const mainMenu = document.getElementById('mainMenu');
			const mainMenuRect = mainMenu.getBoundingClientRect();
			const { bottom: mainMenuBottom } = mainMenuRect;
			const rect = element.getBoundingClientRect();
			const html = document.documentElement;
			return (
				rect.top >= 0 + mainMenuBottom &&
				// rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || html.clientHeight)
				// rect.right <= (window.innerWidth || html.clientWidth)
			);
		};

		document.addEventListener("scroll", () => {
			this.lastKnownScrollPosition = window.scrollY;
			const { config } = this.props;

			if (!ticking) {
				// console.log("scrolly e=", e);
				// Throttle the event to "do something" every 200ms
				setTimeout(() => {
					// console.log("lastKnownScrollPosition", lastKnownScrollPosition);

					// const specialAnchorTargets = document.querySelectorAll('.special-anchor-target');
					// specialAnchorTargets.forEach((sat) => {
					// 	console.log("special-anchor-target", sat);
					// });

					// Is introduction in view?
					const target = document.getElementById(`special-anchor-intro`);
					if (target !== null && isInViewport(target)) {
						// Found intro
						// console.log("Found intro in view", target, target.id);
						this.setState({menuHighlight: `menuItem-intro`});
					} else {
						if (!config) return null;
						for (const [, value] of Object.entries(config)) {
							const { id } = value;
							const target = document.getElementById(`special-anchor-${id}`);

							// console.log("target", target, `#special-anchor-${id}`);
							if (isInViewport(target)) {
								// console.log("Found target in view", target, target.id);
								this.setState({menuHighlight: `menuItem-${id}`});
							}
						}
					}


					ticking = false;
				}, 200);

				ticking = true;
			}

		});
	};


	render = () => {
		const { config, subTitle, toggleDark } = this.props;
		const { menuHighlight } = this.state;

		if (!config) return null;

		let introHighlight = true;
		if (menuHighlight !== 'menuItem-intro') introHighlight = false;

		const topMenu = [];

		for (const [, value] of Object.entries(config)) {
			const { component, menuText, titleText, id } = value;

			if (component) {
				let highlight = false;
				if (menuHighlight === `menuItem-${id}`) highlight = true;
				topMenu.push(
					<NavigationMenuItem className={`${highlight ? 'highlight' : ''} `} id={`menuItem-${id}`} key={`menuItem-${id}`}>
						<NavigationMenuLink asChild>
							<a
								className="special-anchor nav-link"
								href={`#special-anchor-${id}`}
							>
								{menuText ? menuText : titleText}
							</a>
						</NavigationMenuLink>
					</NavigationMenuItem>
				);
			}
		}

		let theme = 'moon'; // Going from light to dark hence moon
		if (document.documentElement.classList.contains("dark")) theme = 'sun';

		return (
			<div className="main-menu" id="mainMenu">
				<NavigationMenu className="menu-root">

					{/* FLEX container to split left vs right */}
					<div className="menu-flex">

						{/* LEFT SIDE — Title */}
						<NavigationMenuList className="menu-left">
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<a
										className="special-anchor nav-title"
										href="#special-anchor-top"
									>
										{subTitle}
									</a>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>

						{/* RIGHT SIDE — Items */}
						<NavigationMenuList className="menu-right">
							<NavigationMenuItem className={`${introHighlight ? 'highlight' : ''}`} id="menu-item-intro" key="menu-item-intro">
								<NavigationMenuLink asChild>
									<a
										className="special-anchor nav-link"
										href="#special-anchor-intro"
									>
										Introduction
									</a>
								</NavigationMenuLink>
							</NavigationMenuItem>

							{topMenu}
							<IconButton className={'size-9'} onClick={toggleDark} size={`m`} theme={theme} title={`${theme === 'moon' ? 'Switch to dark mode' : 'Switch to light mode'}`} />
						</NavigationMenuList>
					</div>
				</NavigationMenu>
			</div>
		);
	};
}
