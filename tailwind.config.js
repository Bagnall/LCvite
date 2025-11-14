import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';


const buildPalette = (token) => ({
	50: `rgb(var(--color-${token}-50) / <alpha-value>)`,
	100: `rgb(var(--color-${token}-100) / <alpha-value>)`,
	200: `rgb(var(--color-${token}-200) / <alpha-value>)`,
	300: `rgb(var(--color-${token}-300) / <alpha-value>)`,
	400: `rgb(var(--color-${token}-400) / <alpha-value>)`,
	DEFAULT: `rgb(var(--color-${token}-400) / <alpha-value>)`,
});

/** @type {import('tailwindcss').Config} */
export default {
	// content is optional in v4; keeping it is fine
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}"],
	daisyui: {
		darkTheme: "dark",
		themes: ["light", "dark"],
	},
	darkMode: 'class',
	plugins: [
		daisyui
	],
	theme: {
		extend: {
			colors: {
				border: {
					subtle: 'rgb(var(--color-border-subtle) / <alpha-value>)',
					default: 'rgb(var(--color-border-default) / <alpha-value>)',
					strong: 'rgb(var(--color-border-strong) / <alpha-value>)',
					DEFAULT: 'rgb(var(--color-border-default) / <alpha-value>)',
				},
				primary: buildPalette('primary'),
				secondary: buildPalette('secondary'),
				surface: {
					base: 'rgb(var(--color-surface-base) / <alpha-value>)',
					elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
					overlay: 'rgb(var(--color-surface-overlay) / <alpha-value>)',
				},
				tertiary: buildPalette('tertiary'),
				text: {
					primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
					secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
					tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
					disabled: 'rgb(var(--color-text-disabled) / <alpha-value>)',
				},
			},
			fontFamily: {
				heading: ['var(--font-heading)', ...defaultTheme.fontFamily.sans],
				mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
			},
		},
	},
};
