/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        form: 'auto 1fr',
      },
    },
    minWidth: {
      '1/2': '50%',
    },
    screens: {
      tiny: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1550px',
    },
  },
  plugins: [],
};
