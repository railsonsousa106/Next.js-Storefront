module.exports = {
  important: true,
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      remaining: "calc(100% - 8rem)",
      full: "100%",
      screen: "100vh",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
