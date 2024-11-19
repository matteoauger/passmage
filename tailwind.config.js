import * as colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                supersuccess: colors.teal[700],
                success: colors.green[700],
                warning: colors.amber[700],
                error: colors.red[700],
                supererror: colors.red[900],
            },
        },
        fontFamily: {
            sans: ['AfacadFlux', 'system-ui'],
            display: ['AfacadFlux', 'system-ui'],
        },
    },
    plugins: [],
}
