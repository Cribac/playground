/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      cursor: {
        'fancy-left': 'url(/icons/arrow_left.svg), pointer',
        'fancy-right': 'url(/icons/arrow_forward.svg), pointer',
      },
    },
  },
  plugins: []
}
