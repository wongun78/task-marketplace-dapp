/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#8affef", // 💡 bạn có thể thay bằng màu bạn thích
      },
      boxShadow: {
        neon: "0 0 15px #8affef",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
