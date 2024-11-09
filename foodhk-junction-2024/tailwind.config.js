/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary_login_dark: '#000212',
        secondary_login_dark: '#191b29',
        third_login_dark: '#323441',
        primary_message_dark: '#36393e',
        secondary_message_dark: '#282b30',
        third_message_dark: '#7289da',
        chat_background: '#3B3B3B',
        google_color: '#DB4437',
      },
      flexBasis: {
        '1/10': '10%',
        '1.5/10': '15%',
        '2/10': '20%',
        '6/10': '60%',
        '7/10': '70%',
        '6.5/10': '65%',
      },
      borderWidth: {
        DEFAULT: '1px',
        1.2: '1.2px',
      },
    },
  },
};