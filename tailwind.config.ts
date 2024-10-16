import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#242d3e',
        primary: '#3a588f',
        secondary: '#6179a5',
        text: '#e7f5f6',
        accent: '#53FF09',
        success: '#418F1A',
        danger: '#8C0404',
      },
    },
    screens: {
      'xs': '438px',
      'sm': {'min': '439px', 'max': '767px'},
      'md': {'min': '768px'},
      'lg': {'min': '1024px'},
    },
  },
  plugins: [],
}
export default config
