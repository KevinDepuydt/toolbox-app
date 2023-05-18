/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // pdf-sign-page
        'pdf-sign': '3fr minmax(200px, 1fr)',
      }
    },
  },
  plugins: [],
}
