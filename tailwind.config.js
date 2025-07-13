/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fade: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
       colors: {
        heroBg: "#F5FAFD",
        customGold: '#F0C54E'
       }
    },
  },
  plugins: [],
}
