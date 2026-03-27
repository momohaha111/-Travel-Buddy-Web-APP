/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#4A90E2',
          purple: '#8B5CF6',
          red: '#FF6B6B',
          green: '#10B981',
          bg: '#F5F7FA',
          text: '#333333',
          subtext: '#666666',
        }
      },
      borderRadius: {
        card: '8px',
        button: '20px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.1)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      }
    },
  },
  plugins: [],
}
