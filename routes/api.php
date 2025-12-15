<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\TeleUsersController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/send-to-n8n-prepare', function (Request $request) {
    return Http::post('https://kanzul-jawad.app.n8n.cloud/webhook/n8nlaravelpreparetosend', $request->all());
});
Route::post('/send-to-n8n-middle', function (Request $request) {
    return Http::post('https://kanzul-jawad.app.n8n.cloud/webhook/n8nlaravelmiddlesend', $request->all());
});
Route::post('/send-to-n8n-done', function (Request $request) {
    return Http::post('https://kanzul-jawad.app.n8n.cloud/webhook/n8nlaraveldonesend', $request->all());
});


Route::post('/sendChatId', [TeleUsersController::class, 'sendChatIdToN8N']);
Route::post('/from-n8n', [TeleUsersController::class, 'store']);

Route::post('/from-n8n-prepare', function (Request $request) {
    Log::info('DATA MASUK DARI N8N:', $request->all());
    return response()->json([
        'message' => 'Laravel menerima data',
        'ggawendeng' => 'njay',
        'data' => $request->all(),
    ]);
});
Route::post('/from-n8n-middle', function (Request $request) {
    Log::info('DATA MASUK DARI N8N:', $request->all());
    return response()->json([
        'message' => 'Laravel menerima data',
        'ggawendeng' => 'njay',
        'data' => $request->all(),
    ]);
});
Route::post('/from-n8n-done', function (Request $request) {
    Log::info('DATA MASUK DARI N8N:', $request->all());
    return response()->json([
        'message' => 'Laravel menerima data',
        'ggawendeng' => 'njay',
        'data' => $request->all(),
    ]);
});


