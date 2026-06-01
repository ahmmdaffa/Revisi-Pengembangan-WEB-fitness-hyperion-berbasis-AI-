export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "#121414",
        "surface-dim": "#121414",
        "surface-bright": "#37393a",
        "surface-container-lowest": "#0c0f0f",
        "surface-container-low": "#1a1c1c",
        "surface-container": "#1e2020",
        "surface-container-high": "#282a2b",
        "surface-container-highest": "#333535",
        "on-surface": "#e2e2e2",
        "on-surface-variant": "#e6bdb7",
        "outline-variant": "#5c403c",
        "surface-variant": "#333535",
        "accent-crimson": "#AA0E27",
        "surface-charcoal": "#1A1A1A",
        "ui-silver": "#EDEDEC",
        primary: "#ffb4a9",
        "primary-container": "#ba0b0b",
        "on-primary-container": "#ffc8c0",
        error: "#ffb4ab",
        "error-container": "#93000a"
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px"
      },
      spacing: {
        "stack-sm": "8px",
        "stack-md": "24px",
        "stack-lg": "48px",
        gutter: "24px",
        "margin-mobile": "20px",
        "margin-desktop": "64px"
      },
      fontFamily: {
        display: ["Anton", "Impact", "sans-serif"],
        headline: ["Anton", "Impact", "sans-serif"],
        body: ["Hanken Grotesk", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"]
      },
      boxShadow: {
        "red-glow": "0 0 20px rgba(186, 11, 11, 0.45)",
        "panel-glow": "0 0 40px rgba(186, 11, 11, 0.15)"
      }
    }
  },
  plugins: []
};
