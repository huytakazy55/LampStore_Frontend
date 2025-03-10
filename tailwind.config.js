/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Đảm bảo Tailwind quét tất cả file React
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
      },
      animation: {
        shake: 'shake 0.2s ease-in-out infinite', // Lặp vô hạn
      },
    },
  },
  plugins: [],
};