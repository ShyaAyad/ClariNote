<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // rate limit for summarizing request
        RateLimiter::for('ai', function(Request $request){
            return Limit::perMinute(2)
            ->by($request->user()?->id)
            ->response(function(){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Too many requests',
                ]);
            });
        });
    }
}
