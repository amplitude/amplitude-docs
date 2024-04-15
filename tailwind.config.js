/** @type {import('tailwindcss').Config} */
module.exports ={
    content: [
        './resources/**/*.antlers.html',
        './resources/**/*.antlers.php',
        './resources/**/*.blade.php',
        './resources/**/*.vue',
        './content/**/*.md',
    ],

    theme: {
        extend: {
            fontFamily: {
                IBMPlex: ['IBM Plex Sans', 'sans-serif'],
                IBMPlexMono: ['IBM Plex Mono', 'monospace'],
                Gellix: ['Gellix', 'sans-serif'],
            },
        },
        colors:{
            'white': '#ffffff',
            'black': {
                '50': '#f6f6f6',
                '100': '#e7e7e7',
                '200': '#d1d1d1',
                '300': '#b0b0b0',
                '400': '#888888',
                '500': '#6d6d6d',
                '600': '#5d5d5d',
                '700': '#4f4f4f',
                '800': '#454545',
                '900': '#3d3d3d',
                '950': '#000000',
            },
            'amp-gray': {
                '50': '#F4F5F6',
                '100': '#e5e6e8',
                '200': '#cdcfd4',
                '300': '#aaaeb6',
                '400': '#808690',
                '500': '#656b75',
                '600': '#5a5e68',
                '700': '#4a4d54',
                '800': '#414349',
                '900': '#393a40',
                '950': '#242528',
            },             
            'amp-blue': {
                DEFAULT: '#1e61f0',
                100: '#031233',
                200: '#062566',
                300: '#0a3798',
                400: '#0d49cb',
                500: '#1e61f0',
                600: '#4b80f3',
                700: '#78a0f6',
                800: '#a5c0f9',
                900: '#d2dffc',
                950: '#EBF5FF'
            },
            'amp-dark-blue': {
                DEFAULT: '#0d1f91',
                100: '#03061d',
                200: '#050c3a',
                300: '#081257',
                400: '#0a1874',
                500: '#0d1f91',
                600: '#122cd2',
                700: '#3d54ee',
                800: '#7e8df4',
                900: '#bec6f9'
            },
            'amp-dark-teal': {
                DEFAULT: '#0f4f73',
                100: '#030f17',
                200: '#061f2d',
                300: '#092e44',
                400: '#0c3d5a',
                500: '#0f4f73',
                600: '#177bb5',
                700: '#34a4e5',
                800: '#78c2ed',
                900: '#bbe1f6'
            },
            'amp-red': {
                DEFAULT: '#f54f4f',
                100: '#3e0404',
                200: '#7b0707',
                300: '#b90b0b',
                400: '#f11414',
                500: '#f54f4f',
                600: '#f77474',
                700: '#f99797',
                800: '#fbbaba',
                900: '#fddcdc'
            },
            'amp-light-purple': {
                DEFAULT: '#c9c2f5',
                100: '#150c4b',
                200: '#291997',
                300: '#422bdc',
                400: '#8576e9',
                500: '#c9c2f5',
                600: '#d3cef7',
                700: '#dedaf9',
                800: '#e9e6fb',
                900: '#f4f3fd'
            },
            'amp-light-blue': {
                DEFAULT: '#c1e0fe',
                100: '#012d58',
                200: '#035ab1',
                300: '#1287fb',
                400: '#6ab4fd',
                500: '#c1e0fe',
                600: '#cfe7fe',
                700: '#dbedfe',
                800: '#e7f3ff',
                900: '#f3f9ff'
            },
            'amp-light-teal': {
                DEFAULT: '#91d9e3',
                100: '#0f363b',
                200: '#1f6c76',
                300: '#2ea2b2',
                400: '#56c5d4',
                500: '#91d9e3',
                600: '#a7e1e8',
                700: '#bde8ee',
                800: '#d3f0f4',
                900: '#e9f7f9'
            },
            'amp-pink': {
                DEFAULT: '#f5d9e1',
                100: '#491323',
                200: '#932745',
                300: '#ce486e',
                400: '#e291a8',
                500: '#f5d9e1',
                600: '#f7e2e8',
                700: '#f9e9ee',
                800: '#fbf0f4',
                900: '#fdf8f9'
            },
            'warning-orange': {
                '50': '#fffbec',
                '100': '#fff7d3',
                '200': '#ffeba5',
                '300': '#ffdb6d',
                '400': '#ffbf32',
                '500': '#ffa80a',
                '600': '#ff9100',
                '700': '#cc6b02',
                '800': '#a1520b',
                '900': '#82450c',
                '950': '#462104',
            },
            'mint': {
                '50': '#eefffb',
                '100': '#c6fff2',
                '200': '#8effe8',
                '300': '#4dfbdb',
                '400': '#19e8c9',
                '500': '#00bfa5',
                '600': '#00a492',
                '700': '#028376',
                '800': '#08675e',
                '900': '#0c554e',
                '950': '#003432',
            },
            
        },
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        code: {
                            'color': '#2a2f45',
                            'background': '#f7fafc',
                            'padding': '0 3px',
                            'margin': '0 1px',
                            'border-radius': '4px',
                            'border': '1px solid #e2e8f0',
                            'font-weight': '400',
                            '&::before': {
                                'content': '""!important',
                            },
                            '&::after': {
                                'content': '""!important',
                            },
                        },
                        a: {
                            "text-decoration": "none",
                        }
                    }
                }
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
};
