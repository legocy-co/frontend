/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'sign-in': 'url("/src/assets/pics/mixed-lego.png")',
        'sign-up': 'url("/src/assets/pics/red-lego.png")',
      },
      fontSize: {
        'bh': '2.5rem',
      },
      colors: {
        'slate': '#3C3A3A',
        'charcoal': '#2C2828',
        'rose': '#FFD0D0',
        'legocy': '#FFD540',
        'legocy-hover': '#f5cc3c',
        'legocy-active': '#ecc439',
        'rose-2': '#FFD0D0D1',
        'burgundy': '#821919',
        'graphite': '#414141AD',
      },
      dropShadow: {
        'legocy': '-1px 1px 10px 2px #52525226',
      }
    },
  },
};
