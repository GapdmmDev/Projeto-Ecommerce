/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],
  theme: {
    extend: {

      colors: {
        customRed: '#F15B41',
        customGreen: '#19C463' 
      },

      fontFamily: {
        helvetica: ['helvetica', 'sans-serif'],
        helveticaMedium: ['helveticaMedium', 'sans-serif'],
        helveticaBold: ['helveticaBold' , 'sans-serif'],
        inter: ['inter' , 'sans-serif']
      }
    },
  },
  plugins: [],
}

