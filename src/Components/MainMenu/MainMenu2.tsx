import "./MainMenu.scss";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { IconButton } from "..";
import React from "react";

export class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuHighlight: "menuItem-intro",
			mobileOpen: false,
		};
		window.__lastKnownScrollPosition = 0;
	}

	componentDidMount = () => {
		const isInViewport = (element) => {
			if (!element) return false;

			const mainMenu = document.getElementById("mainMenu");
			const mainMenuRect = mainMenu
				? mainMenu.getBoundingClientRect()
				: { bottom: 0 };
			const { bottom: mainMenuBottom } = mainMenuRect;

			const rect = element.getBoundingClientRect();
			const html = document.documentElement;

			return (
				rect.top >= mainMenuBottom &&
				rect.bottom <= (window.innerHeight || html.clientHeight)
			);
		};

		let running = false;

		this.scrollHandler = () => {
			window.__lastKnownScrollPosition = window.scrollY;
			const { config } = this.props;

			if (!running) {
				setTimeout(() => {
					// Check intro first
					const introTarget = document.getElementById("special-anchor-intro");
					if (introTarget !== null && isInViewport(introTarget)) {
						this.setState({ menuHighlight: "menuItem-intro" });
					} else {
						if (config) {
							for (const [, value] of Object.entries(config)) {
								const { id } = value;
								const target = document.getElementById(
									`special-anchor-${id}`
								);
								if (isInViewport(target)) {
									// Use first matching section only
									this.setState({ menuHighlight: `menuItem-${id}` });
									break;
								}
							}
						}
					}

					running = false;
				}, 200);

				running = true;
			}
		};

		document.addEventListener("scroll", this.scrollHandler, {
			passive: true,
		});

		this.resizeHandler = () => {
			// If we resize up to desktop, close mobile menu
			if (window.innerWidth >= 768 && this.state.mobileOpen) {
				this.setState({ mobileOpen: false });
			}
		};

		window.addEventListener("resize", this.resizeHandler);
	};

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scrollHandler);
		window.removeEventListener("resize", this.resizeHandler);
	}

	toggleMobileMenu = () => {
		this.setState((prev) => ({ mobileOpen: !prev.mobileOpen }));
	};

	handleNavClick = (href) => {
		// Close mobile menu on click (for mobile)
		if (this.state.mobileOpen) {
			this.setState({ mobileOpen: false });
		}
		// Let the browser handle the anchor jump; highlight will then be
		// updated by the scroll handler as the section comes into view.
	};

	render = () => {
		const { config, subTitle, toggleDark } = this.props;
		const { menuHighlight, mobileOpen } = this.state;

		if (!config) return null;

		const introHighlight = menuHighlight === "menuItem-intro";

		const topMenu = [];
		const mobileMenuItems = [];

		for (const [, value] of Object.entries(config)) {
			const { component, menuText, titleText, id } = value;

			if (component) {
				const highlight = menuHighlight === `menuItem-${id}`;
				const label = menuText ? menuText : titleText;
				const href = `#special-anchor-${id}`;

				// Desktop item
				topMenu.push(
					<NavigationMenuItem
						className={highlight ? "highlight" : ""}
						id={`menuItem-${id}`}
						key={`menuItem-${id}`}
					>
						<NavigationMenuLink asChild>
							<a
								className="special-anchor nav nav-link"
								href={href}
								onClick={() => this.handleNavClick(href)}
							>
								{label}
							</a>
						</NavigationMenuLink>
					</NavigationMenuItem>
				);

				// Mobile item
				mobileMenuItems.push(
					<li
						key={`mobile-${id}`}
						className={highlight ? "highlight" : ""}
					>
						<a
							href={href}
							className="nav-link nav-link-mobile"
							onClick={() => this.handleNavClick(href)}
						>
							{label}
						</a>
					</li>
				);
			}
		}

		let theme = "moon"; // Going from light to dark hence moon
		if (typeof document !== "undefined") {
			if (document.documentElement.classList.contains("dark")) {
				theme = "sun";
			}
		}

		const introHref = "#special-anchor-intro";

		return (
			<header className="main-menu" id="mainMenu">
				<NavigationMenu className="menu-root">
					<div className="menu-flex">
						{/* LEFT — Title / brand */}
						<NavigationMenuList className="menu-left">
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<a
										className="special-anchor nav nav-title"
										href="#special-anchor-top"
										onClick={() => this.handleNavClick("#special-anchor-top")}
									>
										{subTitle}
									</a>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>

						{/* DESKTOP — Right-hand nav */}
						<NavigationMenuList className="menu-right">
							<NavigationMenuItem
								className={introHighlight ? "highlight" : ""}
								id="menu-item-intro"
								key="menu-item-intro"
							>
								<NavigationMenuLink asChild>
									<a
										className="special-anchor nav nav-link"
										href={introHref}
										onClick={() => this.handleNavClick(introHref)}
									>
										Introduction
									</a>
								</NavigationMenuLink>
							</NavigationMenuItem>

							{topMenu}
						</NavigationMenuList>

						{/* RIGHT — Actions: theme toggle + hamburger */}
						<div className="menu-actions">
							<IconButton
								className="size-9"
								variant="ghost"
								onClick={toggleDark}
								size="icon"
								theme={theme}
								title={
									theme === "moon"
										? "Switch to dark mode"
										: "Switch to light mode"
								}
							/>
							<button
								type="button"
								className={`menu-toggle-button ${mobileOpen ? "is-open" : ""
									}`}
								aria-label="Toggle navigation menu"
								aria-expanded={mobileOpen}
								onClick={this.toggleMobileMenu}
							>
								{/* Hamburger / close icon */}
								{!mobileOpen ? (
									// Hamburger
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path d="M4 6h16M4 12h16M4 18h16" />
									</svg>
								) : (
									// Close
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path d="M6 6l12 12M18 6L6 18" />
									</svg>
								)}
							</button>
						</div>
					</div>
				</NavigationMenu>
				{/* MOBILE DROPDOWN NAV */}
				<nav
					className={`mobile-menu ${mobileOpen ? "open" : ""}`}
					aria-label="Main navigation mobile"
				>
					<ul className="mobile-menu-list">
						<li className={introHighlight ? "highlight" : ""}>
							<a
								href={introHref}
								className="nav-link nav-link-mobile"
								onClick={() => this.handleNavClick(introHref)}
							>
								Introduction
							</a>
						</li>
						{mobileMenuItems}
					</ul>
				</nav>
			</header>
		);
	};
}
