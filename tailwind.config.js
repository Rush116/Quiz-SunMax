/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#f59e0b',
        midnight: '#09090b',
        steel: '#18181b',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(245, 158, 11, 0.18)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top, rgba(245,158,11,0.22), transparent 35%), linear-gradient(135deg, #09090b 0%, #18181b 60%, #09090b 100%)',
      },
    },
  },
  plugins: [],
};