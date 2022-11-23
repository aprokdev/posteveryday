/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            spacing: {
                '5.5/12': '47.666667%',
                '1.5/4': '31.666667%',
              }
        },
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
