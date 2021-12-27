module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './component/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			navbar: '#6A983C'
		},
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
