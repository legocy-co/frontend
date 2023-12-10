/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'sign-in': 'url("/src/assets/pics/mixed-lego.png")',
      },
      fontSize: {
        'bh': '2.5rem',
      },
      colors: {
        'slate': '#3C3A3A',
        'charcoal': '#2C2828',
        'rose': '#FFD0D0',
      }
    },
  },
  // plugins: [require('daisyui')],
};
