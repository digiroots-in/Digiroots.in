/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#84cc16',
        'background-light': '#f8fafc',
        'background-dark': '#061a06',
        'surface-dark': '#0a260a',
        'accent-pink': '#fce7f3',
        'accent-blue': '#e0f2fe',
        'accent-yellow': '#fef9c3',
        'accent-purple': '#f3e8ff',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        '2xl': '2rem',
      },
    },
  },
  plugins: [],
};
