/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marrom: {
          DEFAULT: "#593D2B",
          claro: "#7A5840",
          escuro: "#3D2A1D",
        },
        bege: {
          DEFAULT: "#D2C4B8",
          claro: "#E8DFD6",
          fundo: "#F5F0EA",
        },
        creme: "#FAF6F1",
        dourado: "#C9A961",
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
