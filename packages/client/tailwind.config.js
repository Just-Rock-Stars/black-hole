const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      minHeight: {
        16: '16px',
      },
      maxWidth: {
        '464px': '464px',
      },
    },
    screens: {
      xs: '320px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
