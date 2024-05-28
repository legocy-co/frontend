/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'buy': 'url("/src/assets/pics/yellow-lego.png")',
        'collections-intro': 'url("/src/assets/pics/lego-museum.webp")',
        'sell': 'url("/src/assets/pics/lego-money.png")',
        'sign-in': 'url("/src/assets/pics/mixed-lego.png")',
        'sign-up': 'url("/src/assets/pics/red-lego.png")',
        'wiki-intro': 'url("/src/assets/pics/lego-space.png")',
      },
      fontSize: {
        'bh': '2.5rem',
      },
      colors: {
        'celllink': '#151414',
        'confirmmodal': '#2C2828',
        'condition': '#EAE8E8',
        'conditiondark': '#484747',
        'dark': '#2F2F2F',
        'statevaluationchart': '#A2A2A2',
        'darkfiltersborder': '#727272',
        'darkstate': '#EEEEEE',
        'darkstatebg': '#FEFEFE',
        'darkstatefocus': '#1C1919',
        'filtersprice': '#5A5959',
        'tab': '#222020',
        'description': '#F8F8F8',
        'menubuttonborder': '#4F4F4F',
        'legocy': '#FFD540',
        'pagesize': '#EAEAEA',
        'pagesizehover': '#C9C9C9',
        'prev': '#ADAAAA',
        'prevdark': '#5B5B5B',
        'invalid': '#FFD0D0',
        'selectborder': '#3C3A3A',
        'state': '#393939',
        'step': '#D2D2D2',
        'below': '#CCCCCC',
        'above': '#FCB11F',
        'abovedark': '#FFF6A3',
        'high': '#FF8D8D',
        'fair': '#458D3E',
        'fairdark': '#ABF8A4',
        'avatarbg': '#100F0F',
        'darkmenuborder': '#3D3D3D',
        'statuswarn': '#FFE8AE',
        'updatewarn': '#FCE9A6'
      },
      boxShadow: {
        'avatar': '0 4px 7px 0 #00000070',
        'subimages': '0px 4px 16px 0px #00000040;'
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
