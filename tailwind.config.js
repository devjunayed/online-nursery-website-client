/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: ["light"],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Logo' : ['Raleway', 'sans-serif']
    },
    
    extend: {
      colors: {
        'green': '#60A83B'
      },
    },
  },
  plugins: [require('daisyui'),],
}

