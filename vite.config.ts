import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    // GitHub Pages 需要設置 base 路徑
    // 只有在明確設置 GITHUB_PAGES=true 時才使用 base 路徑
    const base = process.env.GITHUB_PAGES === 'true' ? '/Face-calculater/' : '/';
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'gemini-vendor': ['@google/genai']
            }
          }
        },
        chunkSizeWarningLimit: 1000
      },
      preview: {
        port: 4173,
        host: '0.0.0.0'
      }
    };
});
