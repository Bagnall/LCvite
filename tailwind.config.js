/** @type {import('tailwindcss').Config} */

export default {
	// content is optional in v4; keeping it is fine
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}"],
	theme: { extend: {} },
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["light", "dark"],
		darkTheme: "dark"
	},
};