<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::statamic('/docs/json', 'json', [
    'content_type' => 'json',
    'layout' => 'blank'
   
]);

Route::statamic('/docs/llms.txt', 'llms',[
    'content_type' => 'text/plain',
    'layout' => 'blank'
]);

Route::permanentRedirect('/docs/cdp/audiences', '/docs/data/audiences');
Route::permanentRedirect('/docs/cdp/audiences/predictions', '/docs/data/audiences/predictions');
Route::permanentRedirect('/docs/cdp/audiences/computations', '/docs/data/audiences/computations');
Route::permanentRedirect('/docs/cdp/audiences/predictions-build', '/docs/data/audiences/predictions-build');
Route::permanentRedirect('/docs/cdp/audiences/predictions-use', '/docs/data/audiences/predictions-use');
Route::permanentRedirect('/docs/cdp/audiences/recommendations', '/docs/data/audiences/recommendations');
Route::permanentRedirect('/docs/cdp/audiences/recommendations-build', '/docs/data/audiences/recommendations-build');
Route::permanentRedirect('/docs/cdp/audiences/recommendations-use', '/docs/data/audiences/recommendations-use');
Route::permanentRedirect('/docs/cdp/audiences/third-party-syncs', '/docs/data/audiences/third-party-syncs');

// Legacy Help Center redirects
Route::permanentRedirect('/docs/hc/en-us/articles/360021252771-Manage-Data-', '/docs/data/amplitude-data-settings');

// Experiment documentation redirects (DOC-921, DOC-1055)
Route::permanentRedirect('/docs/feature-experiment/advanced-techniques/multiple-hypothesis-testing', '/docs/feature-experiment/advanced-techniques/bonferroni-correction');
Route::permanentRedirect('/docs/feature-experiment/advanced-techniques/find-and-resolve-outliers-in-your-data', '/docs/feature-experiment/advanced-techniques/winsorization-in-experiment');
Route::permanentRedirect('/docs/feature-experiment/advanced-techniques/split-url-testing', '/docs/web-experiment/url-redirect-testing');
Route::permanentRedirect('/docs/feature-experiment', '/docs/experiment-home');
Route::permanentRedirect('/docs/web-experiment', '/docs/experiment-home');
