module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                'dark-100': '#171717',
                'dark-200': '#262626',
                'dark-300': '#404040',
                'dark-400': '#52525b',
            },
        },
    },
    variants: {
        extend: {
            gridColumn: ['first'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
