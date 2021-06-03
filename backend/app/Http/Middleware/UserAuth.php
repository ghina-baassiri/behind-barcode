<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class UserAuth extends Middleware
{
    // Handle an incoming request.
    public function handle(Request $request, Closure $next, $guard) {

        if((Auth::guard($guard)->check()) && ($guard == "user")) {
            // admin was authenticated with admin guard
            return redirect()->route(basepath('routes/api/user/home'));
        }             

    return $next($request);
}
}
