/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Đảm bảo Tailwind quét tất cả file React
  theme: {
    extend: {
      boxShadow: {
        darker: 'inset 0 0 0 1px rgb(0 0 0 / 0.05);', // Thay giá trị tùy thích
      },
      backgroundImage: {
        'banner-product': "url('assets/images/HomeV3ProductBackground.jpg')",
      },
    },
  },
  plugins: [],
};