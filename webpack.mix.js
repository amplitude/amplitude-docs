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

mix.js('resources/js/site.js', 'public/js')
    
mix.postCss('resources/css/site.css', 'public/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    ]);

mix.browserSync({
    proxy: 'amplitude-docs.test',
    injectChanges: true,
    notify: false,
    ui: false,
    files: [
        './content/**/*.md',
        './resources/views/**/*.html',
        './public/css/**/*.css',
        './public/js/**/*.js'
    ]
});