import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        40: '40px',
        50: '50px',
        100: '100px',
        150: '150px',
        170: '170px',
        300: '300px',
        400: '400px',
        450: '450px',
        500: '500px',
        700: '700px',
      },
      width: {
        300: '400px',
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        royal: "#191970",
      },
      rotate: {
        '90': '90deg',
      },
      fontFamily: {
        'source': ['Source Serif 4', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
