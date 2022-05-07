module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'lato': 'lato',
      },
    }
    
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
