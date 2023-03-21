/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      tiny: '480px',
      // => @media (min-width: 640px) { ... }
    },
  },
  plugins: [],
};
