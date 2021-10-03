module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#191414",
        lightdark: "#6c757d",
        green: "#1DB954",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
