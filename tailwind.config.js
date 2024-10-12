const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            primary: {
                500: '#8B5FBF',
                800: ' #61398F',
            },
            white: colors.white,
            accent: {
                300: '#D6C6E1',
                500: '#9A73B5',
            },
            grey: {
                300: '#cccccc',
                500: '#878787',
                800: '#4A4A4A',
            },
            transparent: colors.transparent,
            background: {
                50: ' #FFFFFF',
                100: '#E9E4ED',
            },
            supersuccess: colors.teal[700],
            success: colors.green[700],
            warning: colors.amber[700],
            error: colors.red[700],
            supererror: colors.red[900],
        },
        fontFamily: {
            sans: ['AfacadFlux', 'system-ui'],
            display: ['AfacadFlux', 'system-ui'],
        },
    },
    plugins: [],
}
