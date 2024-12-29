/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust the paths based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f5f5", // Background color for the page
        text: "#333333", // Text color
      },
    },
  },
  plugins: [],
};
