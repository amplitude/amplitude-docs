<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/bundle-phobia', function (Request $request) {
    $package = $request->get('package');
    
    if (!$package) {
        return response()->json([
            '_bundlephobia_success' => false, 
            '_bundlephobia_error' => 'Package parameter required'
        ], 400);
    }
    
    // Create a new instance of the BundlePhobia tag
    $bundlePhobia = new \App\Tags\BundlePhobia();
    
    // Set the parameters manually since we're not in a template context
    $bundlePhobia->setParameters(['package' => $package]);
    
    try {
        $result = $bundlePhobia->index();
        return response()->json($result);
    } catch (\Exception $e) {
        return response()->json([
            '_bundlephobia_success' => false,
            '_bundlephobia_error' => $e->getMessage()
        ], 500);
    }
});
