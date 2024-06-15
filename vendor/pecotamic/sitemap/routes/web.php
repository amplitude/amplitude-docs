<?php

use Illuminate\Support\Facades\Route;
use Pecotamic\Sitemap\Http\Controllers\SitemapController;
use Statamic\Facades\Site;
use Statamic\Facades\URL;

Site::all()->map(function ($site) {
    return URL::makeRelative($site->url());
})->unique()->each(function ($sitePrefix) {
    Route::group(['prefix' => $sitePrefix], static function () {
        Route::get(config('pecotamic.sitemap.url'), [SitemapController::class, 'show']);
    });
});
