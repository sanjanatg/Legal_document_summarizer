import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        setup: './setup.html'
      }
    },
    // Copy JS files to dist/js
    copyPublicDir: true
  },
  publicDir: 'public',
  plugins: [
    {
      name: 'copy-js-files',
      closeBundle() {
        const jsFiles = [
          'config.js',
          'pdf-processor.js',
          'upload-manager.js',
          'ai-service.js',
          'chatbot.js',
          'main.js',
          'dom-elements.js',
          'event-handlers.js',
          'ui-helpers.js'
        ]
        
        try {
          mkdirSync(resolve(__dirname, 'dist/js'), { recursive: true })
          jsFiles.forEach(file => {
            try {
              copyFileSync(
                resolve(__dirname, `js/${file}`),
                resolve(__dirname, `dist/js/${file}`)
              )
            } catch (err) {
              console.log(`Skipping ${file} (not found)`)
            }
          })
          console.log('✅ JS files copied to dist/js')
        } catch (err) {
          console.error('Error copying JS files:', err)
        }
      }
    }
  ]
})

