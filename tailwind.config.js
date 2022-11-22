/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        screens: {
            xs: '0px',
            ...defaultTheme.screens,
        },
        minHeight: {
            mch: 'calc(100vh - 72px)',
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
