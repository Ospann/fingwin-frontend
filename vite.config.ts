import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import * as path from 'path'

const vitePWA = VitePWA({
    registerType: 'autoUpdate',
    outDir: 'dist',
    srcDir: 'src',
    filename: 'service-worker.js',
    strategies: 'injectManifest',
    manifest: {
        name: 'Fingwin',
        short_name: 'Fingwin',
        description: 'Financial literacy app',
        theme_color: '#ffffff',
        display: 'standalone',
        background_color: '#ffffff',
        start_url: '/',
        id: 'fingwin_app',
        categories: ['finance', 'education', 'productivity'],
        icons: [
            {
                src: 'android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: 'apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
            {
                src: 'favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                src: 'favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
        ],
    },
    injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}'],
    },
})

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), vitePWA],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
})
