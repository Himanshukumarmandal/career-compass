/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandNavy: {
          DEFAULT: '#072B63',
          dark: '#031736',
          light: '#103F80',
        },
        brandGold: {
          DEFAULT: '#F5B21A',
          dark: '#D2940D',
          light: '#F8C34B',
        },
        brandGreen: {
          DEFAULT: '#0B7A3A',
          dark: '#085729',
          light: '#11A54F',
        },
        brandRed: {
          DEFAULT: '#B11434',
          dark: '#840E26',
          light: '#DE244C',
        },
        brandGray: {
          DEFAULT: '#F4F4F4',
          dark: '#E2E2E2',
          light: '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        hindi: ['Mukta', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
