import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "client", "dist"),
    emptyOutDir: false,
    rollupOptions: {
      external: [
        'express',
        'cors',
        'dotenv',
        'pg',
        'drizzle-orm',
        '@neondatabase/serverless',
        'multer',
        'bcrypt',
        'jsonwebtoken',
        'passport',
        'passport-local',
        'express-session',
        'ws'
      ]
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    'process.env.VITE_CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.VITE_CLOUDINARY_CLOUD_NAME),
    'process.env.VITE_CLOUDINARY_API_KEY': JSON.stringify(process.env.VITE_CLOUDINARY_API_KEY)
  },
  resolve: {
    alias: {
      "@db": path.resolve(import.meta.dirname, "db"),
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
});