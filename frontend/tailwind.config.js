/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  safelist: [
    // keep common gradient/color utilities from being purged
    'bg-gradient-to-br', 'bg-gradient-to-r', 'from-primary', 'to-secondary',
    'from-secondary', 'to-primary', 'bg-primary', 'bg-secondary',
    'from-primary/30', 'to-secondary/30', 'from-primary/70', 'to-secondary/70'
  ],
  theme: {
    extend: {
      colors: {
        // flat tokens for reliable class names
        primary: '#0ea5a4',    // mint/teal (buttons, accents)
        secondary: '#0369a1',  // deeper teal/blue for gradients
        accent: '#ff8a65',     // warm accent
        bg: '#f8faf9',         // light page background
        card: '#ffffff'        // card background
      },
      backgroundImage: {
        // named gradient helper — use class "bg-grad-primary"
        'grad-primary': 'linear-gradient(135deg, var(--tw-gradient-stops))'
      },
      boxShadow: {
        'soft-lg': '0 12px 30px rgba(16,24,40,0.06)',
        'panel': '0 6px 18px rgba(8,15,30,0.06)'
      },
      borderRadius: {
        DEFAULT: '0.25rem', // 4px default
        sm: '0.125rem',     // 2px
        md: '0.25rem',
        lg: '0.375rem',
        xl: '0.5rem',
        full: '9999px'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}
