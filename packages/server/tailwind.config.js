const path = require('node:path');

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    path.join(__dirname, './node_modules/client/index.html'),
    path.join(__dirname, './node_modules/client/src/**/*.tsx'),
  ],
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
