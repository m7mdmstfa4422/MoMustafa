module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient-flow': 'gradient-flow 8s linear infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      },
    },
  },
}