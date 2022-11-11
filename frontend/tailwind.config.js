/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"dark-blue": "#101b30",
				"blue-second": "#2b3055",
				transparent: "transparent",
				current: "currentColor",
			},
			fontFamily: {
				rubik: ["rubik"],
			},
		},
	},
	plugins: [],
};
