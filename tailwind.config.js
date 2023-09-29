/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './public/**/*.{html,js}', './node_modules/flowbite/**/*.js'],
  theme: {
    fontFamily: {
      'sans': ['KronaOne', 'sans-serif'],
    },
    extend: {
      colors: {
        'if-black': '#060410',
        'if-white': '#F2F5F6',
        'if-green': '#A8E926',
        'if-red': '#E55110',
        'if-blue': '#23A7FC',
        'if-purple': '#3e001d',
        'if-yellow': '#e5b310',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translate(0px,0%)' },
          '50%': { transform: 'translate(0px,5%)' },
        }
      },
      animation: {
        wiggle: 'wiggle 5s ease-in-out infinite',
      },
      fontFamily: {
        kronaone: ['KronaOne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

