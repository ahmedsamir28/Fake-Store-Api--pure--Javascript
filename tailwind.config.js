/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      'sl': '570px',
      'lgg': '775px',
      'xll': '991px',

    },
    extend: {
      colors:{
        icon:'#E3AC10'
      },
      
    },
  },
  plugins: [],
}

