<?php
use Illuminate\Support\Facades\Route;



Route::group(['namespace' => 'AltDesign\AltSitemap\Http\Controllers'], function() {
    Route::get('/docs/sitemap-docs.xml', 'AltSitemapController@generateSitemap');
});