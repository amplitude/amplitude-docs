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
mix.js('resources/docs/js/interactive-evaluation-table.js', 'public/docs/js')
mix.js('resources/docs/js/interactive-exposure-table.js', 'public/docs/js')
mix.js('resources/docs/js/statuspage.js', 'public/docs/js')


    
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

mix.override(webpackConfig => {
    webpackConfig.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
                ],
                plugins: [
                    '@babel/plugin-transform-class-properties',
                    '@babel/plugin-proposal-object-rest-spread',
                    '@babel/plugin-transform-runtime',
                ],
            },
        }
    });
});