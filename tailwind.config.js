const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [path.resolve(__dirname, './components/**/*.{js,jsx,ts,tsx}')],
};