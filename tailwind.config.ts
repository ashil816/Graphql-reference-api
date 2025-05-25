import type { Config } from "tailwindcss"
import typography from '@tailwindcss/typography';

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
  		colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { // shadcn primary, maps to our accent-blue for interactive elements
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: { // shadcn secondary, maps to our content-pane for cards/sections
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: { // shadcn muted, for less prominent backgrounds/borders
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))", // for text on muted backgrounds
        },
        accent: { // shadcn accent, for hover states
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: { // shadcn card, maps to our content-pane
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'accent-blue': 'hsl(var(--accent-blue-hsl))', // Custom color for links and highlights
        'content-pane': 'hsl(var(--content-pane-bg-hsl))', // Custom color for content pane background
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)",
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: "0" },
  				to: { height: 'var(--radix-accordion-content-height)' },
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: "0" },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  		},
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.foreground'),
            '--tw-prose-headings': theme('colors.foreground'),
            '--tw-prose-lead': theme('colors.muted.foreground'),
            '--tw-prose-links': 'hsl(var(--custom-accent-blue-hsl))', // Ensure it uses the custom blue
            '--tw-prose-bold': theme('colors.foreground'),
            '--tw-prose-counters': theme('colors.muted.foreground'),
            '--tw-prose-bullets': theme('colors.muted.foreground'),
            '--tw-prose-hr': 'hsl(var(--border))', // Use the defined border color
            '--tw-prose-quotes': theme('colors.foreground'),
            '--tw-prose-quote-borders': theme('colors.border'),
            '--tw-prose-captions': theme('colors.muted.foreground'),
            '--tw-prose-code': 'hsl(var(--foreground))', // Inline code text color
            '--tw-prose-pre-code': 'hsl(var(--foreground))', 
            '--tw-prose-pre-bg': 'hsl(var(--background))', // Consistent with Shiki override
            '--tw-prose-th-borders': theme('colors.border'),
            '--tw-prose-td-borders': theme('colors.border'),
            // Overrides for dark mode are implicitly handled by CSS variables
            // if not using the `dark:` modifier within prose directly.
            // However, shadcn/ui's dark mode is class-based on <html>.
            // The CSS variables in globals.css under .dark will take precedence.
          },
        },
      }),
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    typography,
  ],
} satisfies Config

export default config;
