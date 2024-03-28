/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'sign-in': 'url("/src/assets/pics/mixed-lego.png")',
        'sign-up': 'url("/src/assets/pics/red-lego.png")',
        'collections-intro': 'url("/src/assets/pics/lego-museum.webp")',
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
        'silver': '#C4C4C4',
        'light': '#5F5F5F',
        'ghost': '#F8F8F8',
        'dark': '#2f2f2f',
        "condition": "#EAE8E8",
        "conditiondark": "#484747",
        'headerdark': '#2F2F2FFC',
        'celllink': '#151414',
        'celllinkdarktext': '#2F2929',
      },
      dropShadow: {
        'legocy': '-1px 1px 10px 2px #52525226',
        'avatar': '0 4px 7px 0 #00000070',
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
};
