<?php

use Illuminate\Support\Facades\Route;
use Takepart\Oreos\Controllers\OreosController;

Route::post('save', [OreosController::class, 'save'])->name('oreos.save');
