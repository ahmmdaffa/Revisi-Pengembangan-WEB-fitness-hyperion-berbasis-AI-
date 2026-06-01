---
name: Kinetic AI
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e6bdb7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#ac8883'
  outline-variant: '#5c403c'
  surface-tint: '#ffb4a9'
  primary: '#ffb4a9'
  on-primary: '#690002'
  primary-container: '#ba0b0b'
  on-primary-container: '#ffc8c0'
  inverse-primary: '#bd0f0d'
  secondary: '#c8c6c5'
  on-secondary: '#303030'
  secondary-container: '#474747'
  on-secondary-container: '#b6b5b4'
  tertiary: '#b2c5ff'
  on-tertiary: '#002b74'
  tertiary-container: '#0053d0'
  on-tertiary-container: '#c8d4ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4a9'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930003'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#dae2ff'
  tertiary-fixed-dim: '#b2c5ff'
  on-tertiary-fixed: '#001849'
  on-tertiary-fixed-variant: '#003fa3'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
  accent-crimson: '#AA0E27'
  surface-charcoal: '#1A1A1A'
  ui-silver: '#EDEDEC'
typography:
  display-lg:
    fontFamily: Anton
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: 0.02em
  display-lg-mobile:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 44px
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  data-point:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system embodies a "Premium AI-Powered Fitness" aesthetic, blending the raw energy of high-intensity training with the precision of advanced technology. It targets a high-performance audience that values data-driven results and professional-grade coaching.

The visual style is **High-Contrast / Bold** with a futuristic **Minimalist** edge. It utilizes expansive whitespace to frame aggressive typography and vibrant brand colors. The interface should feel kinetic, utilizing diagonal lines, sharp cuts, and high-energy transitions to reflect movement and progress. The AI elements are integrated via subtle glow effects and data-dense overlays, suggesting intelligence without compromising the brand's athletic core.

## Colors
This design system defaults to a **Dark Mode** experience to emphasize the "futuristic tech" narrative and allow the primary red to vibrate against deep backgrounds. 

- **Primary (#BA0B0B):** Used for critical calls to action, active states, and AI-driven insights. 
- **Secondary (#2C2C2C):** Functions as the base surface color, providing a sophisticated, low-glare environment for workout tracking.
- **Surface Charcoal (#1A1A1A):** Used for deep backgrounds to create a tiered visual hierarchy.
- **Neutral/White (#FFFFFF):** Reserved for primary headers and high-contrast body text to ensure maximum legibility against dark surfaces.
- **Accent Crimson (#AA0E27):** Used for secondary accents or gradient stops to add depth to brand elements.

## Typography
The typography strategy creates a high-contrast relationship between aggressive, condensed headlines and technical, precise data.

- **Headlines (Anton):** Used in uppercase to project strength and urgency. Tracking is slightly loosened for large display sizes but kept tight for headlines.
- **Body (Hanken Grotesk):** Provides a contemporary, clean reading experience. It balances the "loudness" of the headlines with professional clarity.
- **Technical/Labels (JetBrains Mono):** Introduced specifically for the AI and data features. This monospaced font signals the "tech-integrated" nature of the product, used for metrics, timestamps, and AI chatbot responses.

## Layout & Spacing
The layout follows a **Fluid Grid** model based on a 12-column system for desktop and a 4-column system for mobile. 

A "Dynamic Spacing" approach is utilized where vertical rhythm alternates between tight, data-heavy clusters and large, airy sections of negative space. This creates a "breath and push" feeling akin to interval training. 

Breakpoints:
- **Mobile (< 600px):** 4 columns, 20px margins, 16px gutters.
- **Tablet (600px - 1024px):** 8 columns, 40px margins, 24px gutters.
- **Desktop (> 1024px):** 12 columns, 64px margins, 24px gutters. Max content width is 1440px.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than traditional shadows. Surfaces are stacked to suggest hierarchy:
- **Level 0 (Background):** #1A1A1A.
- **Level 1 (Cards/Containers):** #2C2C2C with a 1px border of #FFFFFF (10% opacity).
- **Level 2 (Popovers/Modals):** #2C2C2C with a subtle red ambient glow (primary color at 15% opacity, 40px blur).

Interactive elements should use "Hard Depth"—solid offsets or high-contrast borders—to maintain the brutalist, high-energy feel. AI-specific modules use a "Scanning" glassmorphism effect: a subtle vertical linear gradient that moves across the container.

## Shapes
This design system utilizes a **Sharp (0)** roundedness strategy. The absence of curves reinforces a disciplined, high-performance atmosphere. 

- **Corners:** 0px radius for all buttons, containers, and input fields.
- **Angular Cuts:** Use 45-degree "clipped corners" on primary brand containers or image masks to emphasize the futuristic, aggressive aesthetic.
- **Separators:** 1px solid lines, often using the accent-crimson or low-opacity white.

## Components
- **Buttons:** Primary buttons are solid #BA0B0B with #FFFFFF Anton text. Hover states should trigger a slight "glitch" shift or a solid black border offset. Secondary buttons are outlined white (2px).
- **AI Chatbot Interface:** Messages are framed in sharp, monospaced blocks. The AI's responses use #BA0B0B for key metrics and #EDEDEC for text. Use a "blinking cursor" terminal effect for loading states.
- **Cards:** No rounded corners. Background is #2C2C2C. Use "Technical Corner Marks" (small L-shapes at the corners) to frame fitness data.
- **Input Fields:** Underline-only or 1px solid borders. Focus state turns the border #BA0B0B with a subtle red outer glow.
- **Chips/Badges:** Small, rectangular, monospaced labels. High-contrast colors (Red background for "Live", Silver background for "AI-Optimized").
- **Progress Bars:** Segmented blocks rather than a smooth continuous line, mimicking digital readouts from high-end gym equipment.