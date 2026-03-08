import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
    },
  },
  plugins: [],
}
export default config
