/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['helvetica', 'sans-serif'],
        helveticaMedium: ['helveticaMedium', 'sans-serif'],
        helveticaBold: ['helveticaBold' , 'sans-serif']
      }
    },
  },
  plugins: [],
}

