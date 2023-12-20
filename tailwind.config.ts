import type { Config } from 'tailwindcss'

import defaultTheme from 'tailwindcss/defaultTheme';
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
      },
      gridTemplateColumns: {
      },
      screens: {
        'xxxs': '280px',
         // => @media (min-width: 280px) { ... }
        'xxs': '320px',
         // => @media (min-width: 320px) { ... }
         '340': '340px',
         // => @media (min-width: 340px) { ... }
         'xs': '480px',
         // => @media (min-width: 480px) { ... }
         'd': '500px',
         // => @media (min-width: 500px) { ... }
        's': '576px',
         // => @media (min-width: 576px) { ... }
        ...defaultTheme.screens
      },
    },
  },
  plugins: [],
}
export default config
