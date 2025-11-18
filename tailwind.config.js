// tailwind.config.js
// import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';

/**
 * Helper to map CSS variables:
 *   --color-primary-50, --color-primary-100, etc.
 * into Tailwind color scales like primary-50, primary-100...
 */
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
	// Tailwind v4 does automatic source detection, so this is optional.
	// You *can* keep a content array if you want, but it's not required.
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}"],
	// daisyui: {
	// 	darkTheme: "dark",
	// 	themes: ["light", "dark"],
	// },
	darkMode: 'class',
	// plugins: [
	// 	daisyui
	// ],
	theme: {
		extend: {
			colors: {
				border: {
					DEFAULT: 'rgb(var(--color-border-default) / <alpha-value>)',
					default: 'rgb(var(--color-border-default) / <alpha-value>)',
					strong: 'rgb(var(--color-border-strong) / <alpha-value>)',
					subtle: 'rgb(var(--color-border-subtle) / <alpha-value>)',
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
					disabled: 'rgb(var(--color-text-disabled) / <alpha-value>)',
					primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
					secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
					tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
				},
				background: 'rgb(var(--color-surface-base) / <alpha-value>)',
				foreground: 'rgb(var(--color-text-primary) / <alpha-value>)',
			},
			// Merge fonts with shadcn's expectations
			fontFamily: {
				heading: ['var(--font-heading)', ...defaultTheme.fontFamily.sans],
				mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
				// shadcn expects a sensible `sans` base it can use
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
			},
			// If you later want shadcn-style radii:
			// borderRadius: {
			//   lg: "var(--radius-lg)",
			//   md: "var(--radius-md)",
			//   sm: "var(--radius-sm)",
			// },
		},
	},
};
