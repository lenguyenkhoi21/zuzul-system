module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './component/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      navbar: '#46D362',
      fontColor:{
        g1:'#2AA71A',
        bl1:'#151515',
        gr:'#A9A9A9'
      }
    },
    extend: {},
    fontSize: {
      sm: ['12px', '20px'],
      md: ['14px', '20px'],
      base: ['15px', '24px'],
      lg: ['18px', '28px'],
      xl: ['32px', '32px'],
    }
  },
  fontWeight: {
    hairline: 100,
    'extra-light': 100,
    regular: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    'extra-bold': 800,
    black: 900,
  },
  variants: {
    extend: {}
  },
  plugins: []
}

