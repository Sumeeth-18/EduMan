import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Blue Palette (Primary)
        blue: {
          50: '#B3CCE0',   // Lightest blue - Highlighted backgrounds and selected rows
          100: '#8DADC6',  // Light blue - Borders and secondary elements
          200: '#668DAC',  // Supporting blue - Charts and supporting icons
          300: '#204E72',  // Main blue - Brand colour, primary buttons and active controls
          400: '#113B5B',  // Deep blue - Hover states
          500: '#0E324D',  // Dark blue - Strong emphasis
          600: '#0A283F',  // Deepest blue - Deep accents
        },
        // Green Palette (Success/Positive)
        green: {
          50: '#B0C9AB',   // Lightest green - Success backgrounds
          100: '#8BA685',  // Light green - Secondary accents
          200: '#65835E',  // Supporting green - Charts and illustrations
          300: '#3F6038',  // Main green - Positive status indicators
          400: '#36582F',  // Deep green - Strong positive emphasis
          500: '#2C4F25',  // Dark green - Dark accents
          600: '#193D11',  // Deepest green - Dark-mode success
        },
        // Red Palette (Absent/Failed/Critical)
        red: {
          50: '#FADBD8',
          100: '#F5B7B1',
          200: '#E68A84',
          300: '#E74C3C',  // Main red
          400: '#C0392B',  // Hover
          500: '#922B21',  // Emphasis
          600: '#641E16',  // Deep
        },
        // Amber Palette (Pending/Warning)
        amber: {
          50: '#FCF3CF',
          100: '#F9E79F',
          200: '#F5D04F',
          300: '#F39C12',  // Main amber
          400: '#B7950B',  // Hover
          500: '#87760E',  // Emphasis
          600: '#5C4C0C',  // Deep
        },
        // Semantic colors
        primary: {
          DEFAULT: '#204E72',
          foreground: '#FFFFFF',
          hover: '#113B5B',
          light: '#B3CCE0',
          lighter: '#8DADC6',
        },
        success: {
          DEFAULT: '#3F6038',
          foreground: '#B0C9AB',
          hover: '#36582F',
          light: '#B0C9AB',
          dark: '#193D11',
        },
        warning: {
          DEFAULT: '#F39C12',
          foreground: '#FCF3CF',
          hover: '#B7950B',
          light: '#FCF3CF',
        },
        danger: {
          DEFAULT: '#E74C3C',
          foreground: '#FFFFFF',
          hover: '#C0392B',
          light: '#FADBD8',
        },
        // Light mode
        light: {
          background: '#FFFFFF',
          card: '#FFFFFF',
          elevated: '#F5F8FB',
          border: '#D9E2EA',
          text: '#0A283F',
          textSecondary: '#0E324D',
          muted: '#F5F8FB',
        },
        // Dark mode (Carbon black)
        dark: {
          background: '#111111',
          card: '#1A1A1A',
          elevated: '#222222',
          border: '#333333',
          text: '#F5F5F5',
          textSecondary: '#B3CCE0',
          muted: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        brand: ['var(--font-calistoga)', 'cursive'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
        'code': ['0.875rem', { lineHeight: '1.6', fontFamily: 'var(--font-space-mono)' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'elevated': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'inner-light': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'slide-down': 'slideDown 200ms ease-out',
        'scale-in': 'scaleIn 150ms ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      zIndex: {
        'dropdown': '100',
        'sticky': '200',
        'modal': '300',
        'popover': '400',
        'tooltip': '500',
        'toast': '600',
      },
    },
  },
  plugins: [],
};

export default config;