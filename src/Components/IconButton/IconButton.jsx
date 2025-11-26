import './IconButton.scss';
import { Button } from "@/components/ui/button";
import React from 'react';
export class IconButton extends React.PureComponent {
	render = () => {
		const {
			children,
			className,
			onClick,
			theme = 'reset',
		} = this.props;
		let svgContent;
		switch (theme){
			case 'reset': {
				svgContent = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2"
					strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" >
					<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
					<path d="M3 3v5h5" />
					<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
					<path d="M16 16h5v5" />
				</svg>;
				break;
			}
			case 'eye': {
				svgContent = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
					stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
					</path>
					<circle cx="12" cy="12" r="3"></circle>
				</svg>;
				break;
			}
			case 'shuffle':			{
				svgContent = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
					stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="m18 14 4 4-4 4"></path>
					<path d="m18 2 4 4-4 4"></path>
					<path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"></path>
					<path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"></path>
					<path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"></path>
				</svg>;
				break;
			}
		}
		return (
			<Button size="sm" className={`w-full icon-button ${className}`} onClick={onClick}>
				{svgContent}
				{children}</Button>
		);
	};
}