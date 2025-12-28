// Professional Design System Constants
// Following 8px grid system, typography scale, and color palette

export const DESIGN_SYSTEM = {
  // Typography Scale (1.25x multiplier)
  // Base: 16px (1rem)
  typography: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px (base)
    lg: '1.25rem',    // 20px (base * 1.25)
    xl: '1.563rem',   // 25px (lg * 1.25)
    '2xl': '1.953rem', // 31px (xl * 1.25)
    '3xl': '2.441rem', // 39px (2xl * 1.25)
    '4xl': '3.052rem', // 49px (3xl * 1.25)
  },

  // Spacing Scale (8px grid system)
  spacing: {
    1: '0.5rem',   // 8px
    2: '1rem',     // 16px
    3: '1.5rem',   // 24px
    4: '2rem',     // 32px
    5: '2.5rem',   // 40px
    6: '3rem',     // 48px
    8: '4rem',     // 64px
    10: '5rem',    // 80px
  },

  // Colors - Professional Palette
  colors: {
    // Primary Brand Color
    primary: {
      dark: '#0f172a',   // Primary Dark (slate-900)
      DEFAULT: '#2563eb', // Action Blue (blue-600)
      light: '#3b82f6',   // blue-500
    },
    
    // Secondary Accent
    secondary: {
      DEFAULT: '#10b981', // green-500
      dark: '#059669',     // green-600
      light: '#34d399',    // green-400
    },
    
    // Neutral Greys (avoid pure black)
    neutral: {
      50: '#f9fafb',   // Background
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',   // Text (very dark grey, not black)
    },
    
    // Semantic Colors
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },

  // Border Radius (consistent values)
  radius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.25rem', // 20px (for cards)
    full: '9999px',
  },

  // Shadows (soft, layered)
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Transitions (fast animations)
  transitions: {
    fast: '150ms',
    DEFAULT: '200ms',
    medium: '300ms',
  },
}



