<?php

use Illuminate\Support\Facades\Route;
use Takepart\Oreos\Controllers\OreosCpController;

Route::get('oreos', [ OreosCpController::class, 'edit' ])->name('oreos.edit');
Route::post('oreos', [ OreosCpController::class, 'update' ])->name('oreos.update');
