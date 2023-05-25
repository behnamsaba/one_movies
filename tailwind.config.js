/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '480px',  // extra small screens
        'sm': '640px',  // small screens
        'md': '768px',  // medium screens
        'lg': '1024px', // large screens
        'xl': '1280px', // extra large screens
        '2xl': '1536px' // 2x extra large screens
      },
    },
  },
  plugins: [],
}
