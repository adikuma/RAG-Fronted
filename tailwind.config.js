/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'claude-orange': '#E27D60',
        'claude-blue': '#6E91B7',
        'claude-bg': '#F5F2EF',
        'claude-text': '#333333',
        'claude-input-bg': '#FFFFFF',
        'claude-border': '#E6E6E6',
        'claude-muted': '#A0A0A0',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montaga': ['Montaga', 'serif'],
        'myeongjo': ['Nanum Myeongjo', 'serif'],
        'ruwudu': ['Ruwudu', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'claude': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'claude-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}