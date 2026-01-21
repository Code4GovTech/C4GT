import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import twAnimate from 'tailwindcss-animate';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography'; //Typography used by TextEditor
export type DefaultColors = typeof colors;
type TCustomColorConfig<T extends string> = Record<
  T,
  Record<string | number, string> | string
>;
export type AllowedColors =
  | TCustomColorConfig<keyof typeof colors>
  | TCustomColorConfig<string>;

export const customColors = {
  dark: 'hsl(204, 7%, 14%)',
  'skin-color': 'hsl(12, 75%, 72%)',
  'main-gradient': 'hsl(211, 100%, 63%)',
  primary: {
    DEFAULT: 'hsl(211, 94%, 53%)',
    'info-main': 'hsl(209, 100%, 42%)',
    100: 'hsl(211, 100%, 95%)',
    200: 'hsl(211, 100%, 87%)',
    300: 'hsl(211, 100%, 79%)',
    400: 'hsl(211, 100%, 71%)',
    500: 'hsl(211, 100%, 63%)',
    600: 'hsl(211, 94%, 53%)',
    700: 'hsl(211, 100%, 41%)',
    800: 'hsl(221, 100%, 25%)',
    900: 'hsl(221, 100%, 17%)'
  },
  black: {
    DEFAULT: 'hsl(0, 0%, 0%)',
    100: 'hsl(180, 10%, 96%)',
    200: 'hsl(195, 11%, 93%)',
    300: 'hsl(204, 5%, 79%)',
    400: 'hsl(210, 3%, 60%)',
    500: 'hsl(210, 2%, 35%)',
    600: 'hsl(212, 11%, 27%)',
    700: 'hsl(217, 20%, 21%)',
    800: 'hsl(218, 32%, 15%)',
    900: 'hsl(222, 46%, 12%)'
  },
  gray: {
    DEFAULT: 'hsl(220, 37%, 92%)',
    100: 'hsl(220, 86%, 97%)',
    200: 'hsl(220, 37%, 92%)',
    300: 'hsl(196, 27%, 83%)',
    400: 'hsl(198, 16%, 71%)',
    500: 'hsl(202, 11%, 55%)',
    600: 'hsl(205, 17%, 44%)',
    700: 'hsl(209, 26%, 34%)',
    800: 'hsl(212, 37%, 25%)',
    900: 'hsl(216, 50%, 19%)'
  },
  success: {
    DEFAULT: 'hsl(166, 70%, 40%)',
    100: 'hsl(163, 100%, 96%)',
    200: 'hsl(166, 100%, 88%)',
    300: 'hsl(165, 100%, 81%)',
    400: 'hsl(165, 100%, 73%)',
    500: 'hsl(166, 87%, 61%)',
    600: 'hsl(166, 63%, 50%)',
    700: 'hsl(166, 70%, 40%)',
    800: 'hsl(165, 88%, 22%)',
    900: 'hsl(166, 97%, 14%)'
  },
  danger: {
    DEFAULT: 'hsl(353, 99%, 87%)',
    100: 'hsl(354, 100%, 96%)',
    200: 'hsl(353, 100%, 87%)',
    300: 'hsl(353, 100%, 79%)',
    400: 'hsl(353, 100%, 70%)',
    500: 'hsl(353, 89%, 58%)',
    600: 'hsl(353, 71%, 48%)',
    700: 'hsl(353, 79%, 38%)',
    800: 'hsl(353, 88%, 29%)',
    900: 'hsl(353, 98%, 21%)'
  },
  warning: {
    DEFAULT: 'hsl(42, 100%, 84%)',
    100: 'hsl(45, 100%, 92%)',
    200: 'hsl(42, 100%, 84%)',
    300: 'hsl(40, 100%, 76%)',
    400: 'hsl(37, 100%, 70%)',
    500: 'hsl(35, 100%, 61%)',
    600: 'hsl(32, 71%, 51%)',
    700: 'hsl(30, 74%, 41%)',
    800: 'hsl(27, 79%, 32%)',
    900: 'hsl(25, 85%, 26%)'
  },
  activity: {
    DEFAULT: 'hsl(130, 64%, 76%)',
    100: 'hsl(130, 64%, 76%)',
    200: 'hsl(136, 53%, 51%)',
    300: 'hsl(136, 54%, 41%)',
    400: 'hsl(139, 54%, 28%)'
  }
} satisfies AllowedColors;
export type CustomColors = typeof customColors;

const twConfig = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: {
          DEFAULT: 'hsl(var(--input))',
          bg: 'hsl(var(--input-bg))'
        },
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        ...customColors
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'] // Added Satoshi font for navbar
      }
    }
  },
  plugins: [twAnimate, forms, typography] // Added this Plugin to override default input stylings
} satisfies Config;

export type TwConfig = typeof twConfig;
export default twConfig;
