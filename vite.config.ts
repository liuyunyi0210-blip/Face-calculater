import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // 優先從環境變數讀取，然後從 .env 檔案讀取
    const env = loadEnv(mode, process.cwd(), '');
    
    // 從 process.env 直接讀取（GitHub Actions 設置的環境變數）
    const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || '';
    
    // 在構建時輸出調試信息（不會出現在生產代碼中）
    if (process.env.GITHUB_ACTIONS) {
      console.log('構建環境變數檢查:');
      console.log('- GEMINI_API_KEY 存在:', !!process.env.GEMINI_API_KEY);
      console.log('- API 金鑰長度:', apiKey ? apiKey.length : 0);
    }
    
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
        'process.env.API_KEY': JSON.stringify(apiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(apiKey)
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
