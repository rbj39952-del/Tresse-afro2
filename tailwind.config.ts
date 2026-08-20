import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09090B',
        surface: '#F9FAFB',
        border: '#E4E4E7',
        muted: '#71717A'
      }
    }
  },
  plugins: []
}
export default config
