// Evan You's Vite Optimization - PREET_ENGLISH App
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|tsx)$/,  // Ensure React Fast Refresh works properly
    }),
    runtimeErrorOverlay(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  assetsInclude: ['**/*.svg'],
  root: path.resolve(__dirname, "client"),
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: true,
    minify: 'esbuild',
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1200,
    reportCompressedSize: true,
    // Evan You's Asset Inlining for English Learning App
    assetsInlineLimit: 4096, // Inline files < 4kb (play buttons, correct/incorrect icons)
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('wouter')) {
              return 'vendor-react';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui-radix';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('date-fns') || id.includes('zod') || id.includes('lucide-react') || id.includes('i18next')) {
              return 'vendor-utils';
            }
          }
          
          // English Learning App Specific Chunks
          if (id.includes('grammarLogic') || id.includes('languageUtils')) {
            return 'grammar-engine';
          }
          if (id.includes('audioService') || id.includes('speechRecognition')) {
            return 'audio-engine';
          }
          if (id.includes('HindiComponents') || id.includes('gamification')) {
            return 'learning-components';
          }
        },
      },
    },
  },
  server: {
    host: true,
    port: 3000,
    hmr: { overlay: true },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    fs: {
      strict: false,  // Allow serving files from outside the root directory during development
      deny: ["**/.*"],
    },
  },
});
