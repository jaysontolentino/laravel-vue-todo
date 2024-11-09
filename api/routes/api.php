<?php

use App\Http\Controllers\CompleteTaskController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;


Route::prefix("v1")->group(function () {
    Route::apiResource("tasks", TaskController::class);
    Route::patch("tasks/{task}/complete", CompleteTaskController::class);
});
