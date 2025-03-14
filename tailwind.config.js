/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Đảm bảo Tailwind quét tất cả file React
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          "sans-serif"
        ],
        mono: [
          "source-code-pro", "Menlo", "Monaco", "Consolas", "Courier New",
          "monospace"
        ]
      },
      boxShadow: {
        darker: 'inset 0 0 0 1px rgb(0 0 0 / 0.05);', // Thay giá trị tùy thích
      },
      backgroundImage: {
        'banner-product': "url('assets/images/HomeV3ProductBackground.jpg')",
      },
      fontSize: {
        h1: "2rem",
        h2: "1.5rem",
        h3: "1.25rem",
        normal: "1rem",
        small: "0.875rem",
        smaller: "0.7rem",
        tiny: "0.625rem",
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.clip-custom': {
          'clip-path': 'polygon(150% 0, 0 125%, 100% 100%)',
        },
        '.no-spinner': {
          '-moz-appearance': 'textfield', // Ẩn spinner trên Firefox
          '&::-webkit-outer-spin-button': { appearance: 'none', margin: '0' },
          '&::-webkit-inner-spin-button': { appearance: 'none', margin: '0' }
        }
      });
    }),
  ],
};