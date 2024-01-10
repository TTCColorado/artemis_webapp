import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            buffer: './node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6.js',
        },
    },
    define: {
        'process.env': process.env,
    },
    build: {
        commonjsOptions: { include: [] },
        rollupOptions: {
            maxParallelFileOps: 300, //Arbitrary value, Build breaks without this
            plugins: [],
        },
        outDir: './prod',
    },
    optimizeDeps: {
        disabled: false,
        esbuildOptions: {
            //Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
        },
    },
})
