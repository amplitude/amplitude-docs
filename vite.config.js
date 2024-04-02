import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
// import vue2 from '@vitejs/plugin-vue2';

export default defineConfig({
    base: './',
    plugins: [
        laravel({
            input: [
                'resources/css/site.css',
                'resources/css/tocbot.css',
                'resources/css/styles.css',
                'resources/js/site.js',
                'resources/js/api-table.js',
                'resources/js/tocbot.js',

                // Control Panel assets.
                // https://statamic.dev/extending/control-panel#adding-css-and-js-assets
                // 'resources/css/cp.css',
                // 'resources/js/cp.js',
            ],
            refresh: true,
        }),
        // vue2(),
    ],
});
