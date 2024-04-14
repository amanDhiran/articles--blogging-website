/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        border: 'rgb(var(--color-border))',
        hover: 'rgb(var(--color-hover))',
      }
    },
  },
  plugins: [],
}

