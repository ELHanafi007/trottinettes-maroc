import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {

    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          red: '#cc0000',
          'red-hot': '#e50000',
          'red-dark': '#990000',
          white: '#f0f0f0',
        },
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        'xxs': ['0.65rem', { lineHeight: '0.75rem' }],
      },
    },
  },
  plugins: [],
}
export default config
