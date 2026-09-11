/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#F7F9FC',
          secondary: '#F2F5FA',
          surface: '#FFFFFF',
        },
        purple: {
          primary: '#6C63FF',
          soft: '#8B83FF',
          light: '#F0EEFF',
        },
        blue: {
          primary: '#4FACFE',
          soft: '#7CC4FF',
          light: '#EAF6FF',
        },
        cyan: {
          primary: '#38BDF8',
          light: '#ECFAFF',
        },
        green: {
          primary: '#34D399',
          soft: '#6EE7B7',
          light: '#ECFDF5',
        },
        yellow: {
          primary: '#FBBF24',
          soft: '#FCD34D',
          light: '#FFFBEB',
        },
        orange: {
          primary: '#FB923C',
          light: '#FFF7ED',
        },
        pink: {
          primary: '#F472B6',
          light: '#FDF2F8',
        },
        red: {
          primary: '#F87171',
          light: '#FEF2F2',
        },
        indigo: {
          primary: '#818CF8',
          light: '#EEF2FF',
        },
        ink: {
          DEFAULT: '#1E2333',
          secondary: '#475569',
          muted: '#64748B',
        },
        border: {
          subtle: '#E8ECF3',
        },
        // Backward compatibility mappings
        paper: '#FFFFFF',
        line: '#E8ECF3',
        brass: '#6C63FF',
        ontrack: '#34D399',
        monitor: '#FBBF24',
        atrisk: '#FB923C',
        critical: '#F87171',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        numeral: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(108, 99, 255, 0.05), 0 2px 6px -1px rgba(30, 35, 51, 0.03)',
        hover: '0 10px 25px -4px rgba(108, 99, 255, 0.1), 0 4px 10px -2px rgba(30, 35, 51, 0.04)',
      },
    },
  },
  plugins: [],
};
