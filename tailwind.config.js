/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryText: '#4D4D4D', // Primary text color
        secondaryText: '#99685F', // Secondary text color

        formBg: '#FAFAFA', // Form background color
        formBorder: '#CD9856', // Form field border color

        primaryButton: {
          DEFAULT: '#EC7C5D', // Primary button background
          text: '#FFFFFF', // Primary button text color
          hover: '#AF6D61', // Hover state
          active: '#99685F', // Active state
        },

        secondaryButton: {
          DEFAULT: '#C2D1D8', // Secondary button background
          text: '#4D4D4D', // Secondary button text color
          hover: '#B3C2C9', // Hover state
          active: '#AF6D61', // Active state
        },

        hoverLink: '#CD9856', // Hover color for links/text
        activeLink: '#885C51', // Active color for links
      },
    },
  },
  plugins: [],
};