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

mix.js('resources/docs/js/site.js', 'public/docs/js')
mix.js('resources/docs/js/api-table.js', 'public/docs/js')
mix.js('resources/docs/js/interactive-exposure-tracking-table.js', 'public/docs/js')

    
mix.postCss('resources/docs/css/site.css', 'public/docs/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    ]).options({
        processCssUrls: false
    });

mix.postCss('resources/docs/css/algolia.css', 'public/docs/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    ]);
    