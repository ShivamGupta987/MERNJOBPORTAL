/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "primary":"#141414",
      "blue":'#3537E2'
    },
  },
  plugins: [],
}

