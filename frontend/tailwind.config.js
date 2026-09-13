/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--text)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "#050b14",
        },
        secondary: {
          DEFAULT: "var(--surface-elevated)",
          foreground: "var(--text)",
        },
        destructive: {
          DEFAULT: "var(--danger)",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "var(--surface-hover)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--surface-card-hover)",
          foreground: "var(--text)",
        },
        popover: {
          DEFAULT: "var(--surface-card)",
          foreground: "var(--text)",
        },
        card: {
          DEFAULT: "var(--surface-card)",
          foreground: "var(--text)",
        },
        border: "var(--border)",
        input: "var(--border-light)",
        ring: "var(--border-focus)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
    },
  },
  plugins: [],
}
