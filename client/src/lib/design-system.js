/**
 * PREET ENGLISH DESIGN SYSTEM
 * Comprehensive design tokens and utilities for consistent UI/UX
 * Inspired by Sivi.ai with Hulu green color scheme
 */
// ==================== COLOR PALETTE ====================
export var colors = {
    // Primary Colors (Hulu Green Inspired)
    primary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#10b981', // Main Hulu green
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        950: '#022c22',
    },
    // Secondary Colors (Complementary Blue)
    secondary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554',
    },
    // Accent Colors (Warm Orange)
    accent: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
        950: '#431407',
    },
    // Neutral Colors (Enhanced Grays)
    neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a',
    },
    // Semantic Colors
    success: {
        50: '#f0fdf4',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
    },
    warning: {
        50: '#fffbeb',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
    },
    error: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
    },
    // Cultural Colors (Indian Heritage)
    cultural: {
        saffron: '#ff9933',
        lotus: '#ff69b4',
        peacock: '#005f73',
        marigold: '#ffb347',
        turmeric: '#e4d00a',
        henna: '#a0522d',
    },
};
// ==================== TYPOGRAPHY SYSTEM ====================
export var typography = {
    fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        hindi: ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
    },
    fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
    },
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
};
// ==================== SPACING SYSTEM ====================
export var spacing = {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
};
// ==================== BORDER RADIUS ====================
export var borderRadius = {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
};
// ==================== SHADOWS ====================
export var boxShadow = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
    // Custom shadows for glass morphism
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    'glass-lg': '0 16px 64px 0 rgba(31, 38, 135, 0.37)',
    glow: '0 0 20px rgba(16, 185, 129, 0.3)',
    'glow-lg': '0 0 40px rgba(16, 185, 129, 0.4)',
};
// ==================== ANIMATIONS ====================
export var animations = {
    // Entrance animations
    fadeIn: 'fadeIn 0.5s ease-out',
    slideInUp: 'slideInUp 0.6s ease-out',
    slideInDown: 'slideInDown 0.6s ease-out',
    slideInLeft: 'slideInLeft 0.6s ease-out',
    slideInRight: 'slideInRight 0.6s ease-out',
    scaleIn: 'scaleIn 0.4s ease-out',
    // Interactive animations
    bounce: 'bounce 1s infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    // Custom animations
    float: 'float 3s ease-in-out infinite',
    glow: 'glow 2s ease-in-out infinite alternate',
    shimmer: 'shimmer 2s linear infinite',
    wiggle: 'wiggle 1s ease-in-out infinite',
};
// ==================== BREAKPOINTS ====================
export var breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};
// ==================== COMPONENT VARIANTS ====================
export var componentVariants = {
    button: {
        primary: {
            base: 'bg-primary-500 text-white border-primary-600 hover:bg-primary-600 focus:ring-primary-500',
            disabled: 'bg-primary-300 text-primary-100 cursor-not-allowed',
        },
        secondary: {
            base: 'bg-secondary-500 text-white border-secondary-600 hover:bg-secondary-600 focus:ring-secondary-500',
            disabled: 'bg-secondary-300 text-secondary-100 cursor-not-allowed',
        },
        outline: {
            base: 'bg-transparent text-primary-600 border-primary-500 hover:bg-primary-50 focus:ring-primary-500',
            disabled: 'text-neutral-400 border-neutral-300 cursor-not-allowed',
        },
        ghost: {
            base: 'bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
            disabled: 'text-neutral-400 cursor-not-allowed',
        },
    },
    card: {
        default: {
            base: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-md',
            hover: 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200',
        },
        glass: {
            base: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-white/20 dark:border-neutral-800/20 rounded-xl shadow-glass',
            hover: 'hover:shadow-glass-lg hover:bg-white/90 dark:hover:bg-neutral-900/90 transition-all duration-300',
        },
        elevated: {
            base: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl',
            hover: 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300',
        },
    },
    input: {
        default: {
            base: 'bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            error: 'border-error-500 focus:ring-error-500 focus:border-error-500',
            success: 'border-success-500 focus:ring-success-500 focus:border-success-500',
        },
    },
    badge: {
        default: {
            base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        },
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
        secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300',
        success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
        warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300',
        error: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300',
    },
};
// ==================== UTILITY FUNCTIONS ====================
export var designUtils = {
    // Generate gradient classes
    gradient: function (from, to, direction) {
        if (direction === void 0) { direction = 'r'; }
        return "bg-gradient-to-".concat(direction, " from-").concat(from, " to-").concat(to);
    },
    // Generate glass morphism styles
    glass: function (opacity) {
        if (opacity === void 0) { opacity = 80; }
        return ({
            backgroundColor: "rgba(255, 255, 255, ".concat(opacity / 100, ")"),
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
        });
    },
    // Generate responsive text sizes
    responsiveText: function (base, md, lg) {
        var classes = "text-".concat(base);
        if (md)
            classes += " md:text-".concat(md);
        if (lg)
            classes += " lg:text-".concat(lg);
        return classes;
    },
    // Generate hover elevate effect
    hoverElevate: function (scale) {
        if (scale === void 0) { scale = 1.02; }
        return "hover:scale-".concat(Math.round(scale * 100), " hover:shadow-lg transition-all duration-200");
    },
    // Generate focus ring
    focusRing: function (color) {
        if (color === void 0) { color = 'primary-500'; }
        return "focus:outline-none focus:ring-2 focus:ring-".concat(color, " focus:ring-offset-2");
    },
    // Generate cultural color combinations (returns inline style object)
    culturalGradient: function (primary, secondary) {
        var secondaryColor = secondary || 'saffron';
        return {
            background: "linear-gradient(to right, ".concat(colors.cultural[primary], ", ").concat(colors.cultural[secondaryColor], ")"),
        };
    },
};
// ==================== ACCESSIBILITY UTILITIES ====================
export var a11y = {
    // Screen reader only text
    srOnly: 'sr-only',
    // Focus visible utilities
    focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    // High contrast mode support
    highContrast: 'contrast-more:border-neutral-900 contrast-more:text-neutral-900',
    // Reduced motion support
    reducedMotion: 'motion-reduce:animate-none motion-reduce:transition-none',
    // Color contrast utilities
    contrast: {
        aa: 'text-neutral-700 dark:text-neutral-300', // WCAG AA compliant
        aaa: 'text-neutral-900 dark:text-neutral-100', // WCAG AAA compliant
    },
};
// ==================== THEME CONFIGURATION ====================
export var theme = {
    colors: colors,
    typography: typography,
    spacing: spacing,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
    animations: animations,
    breakpoints: breakpoints,
    componentVariants: componentVariants,
    designUtils: designUtils,
    a11y: a11y,
};
// Export default theme
export default theme;
