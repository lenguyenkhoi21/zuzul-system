module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './component/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			navbar: '#46D362'
		},
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
