import "./MainMenu.scss";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";

export class MainMenu extends React.Component {
	render = () => {
		const { config, subTitle } = this.props;

		if (!config) return null;

		const topMenu = [];

		for (const [, value] of Object.entries(config)) {
			const { component, menuText, titleText, id } = value;

			if (component) {
				topMenu.push(
					<NavigationMenuItem key={`menuItem-${id}`}>
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

		return (
			<div className="main-menu">
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
							<NavigationMenuItem key="menu-item-intro">
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
						</NavigationMenuList>

					</div>
				</NavigationMenu>
			</div>
		);
	};
}
