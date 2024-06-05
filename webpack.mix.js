const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/site.js', 'public/docs/js')
mix.js('resources/js/api-table.js', 'public/docs/js')
mix.js('resources/js/interactive-exposure-tracking-table.js', 'public/docs/js')

    
mix.postCss('resources/css/site.css', 'public/docs/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    ]);

    mix.postCss('resources/css/algolia.css', 'public/docs/css', [
        require('postcss-import'),
        // require('tailwindcss'),
        require('postcss-nested'),
        require('autoprefixer'),
        ]);
    