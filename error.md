# Illuminate\Foundation\ViteException - Internal Server Error

Unable to locate file in Vite manifest: resources/js/pages/homepage/product-status.tsx.

PHP 8.4.14
Laravel 12.38.1
localhost:8000

## Stack Trace

0 - vendor\laravel\framework\src\Illuminate\Foundation\Vite.php:999
1 - vendor\laravel\framework\src\Illuminate\Foundation\Vite.php:390
2 - resources\views\app.blade.php:44
3 - vendor\laravel\framework\src\Illuminate\Filesystem\Filesystem.php:123
4 - vendor\laravel\framework\src\Illuminate\Filesystem\Filesystem.php:124
5 - vendor\laravel\framework\src\Illuminate\View\Engines\PhpEngine.php:57
6 - vendor\laravel\framework\src\Illuminate\View\Engines\CompilerEngine.php:76
7 - vendor\laravel\framework\src\Illuminate\View\View.php:208
8 - vendor\laravel\framework\src\Illuminate\View\View.php:191
9 - vendor\laravel\framework\src\Illuminate\View\View.php:160
10 - vendor\laravel\framework\src\Illuminate\Http\Response.php:78
11 - vendor\laravel\framework\src\Illuminate\Http\Response.php:34
12 - vendor\laravel\framework\src\Illuminate\Routing\ResponseFactory.php:61
13 - vendor\laravel\framework\src\Illuminate\Routing\ResponseFactory.php:91
14 - vendor\laravel\framework\src\Illuminate\Support\Facades\Facade.php:363
15 - vendor\inertiajs\inertia-laravel\src\Response.php:199
16 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:921
17 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:906
18 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:821
19 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
20 - app\Http\Middleware\RoleMiddleware.php:29
21 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
22 - vendor\laravel\framework\src\Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets.php:32
23 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
24 - vendor\inertiajs\inertia-laravel\src\Middleware.php:96
25 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
26 - app\Http\Middleware\HandleAppearance.php:21
27 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
28 - vendor\laravel\framework\src\Illuminate\Routing\Middleware\SubstituteBindings.php:50
29 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
30 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken.php:87
31 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
32 - vendor\laravel\framework\src\Illuminate\View\Middleware\ShareErrorsFromSession.php:48
33 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
34 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:120
35 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:63
36 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
37 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse.php:36
38 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
39 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\EncryptCookies.php:74
40 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
41 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
42 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:821
43 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:800
44 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:764
45 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:753
46 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:200
47 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
48 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
49 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull.php:31
50 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
51 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
52 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TrimStrings.php:51
53 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
54 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePostSize.php:27
55 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
56 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance.php:109
57 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
58 - vendor\laravel\framework\src\Illuminate\Http\Middleware\HandleCors.php:48
59 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
60 - vendor\laravel\framework\src\Illuminate\Http\Middleware\TrustProxies.php:58
61 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
62 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\InvokeDeferredCallbacks.php:22
63 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
64 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePathEncoding.php:26
65 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
66 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
67 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:175
68 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:144
69 - vendor\laravel\framework\src\Illuminate\Foundation\Application.php:1220
70 - public\index.php:20
71 - vendor\laravel\framework\src\Illuminate\Foundation\resources\server.php:23

## Request

GET /product/status

## Headers

* **host**: localhost:8000
* **connection**: keep-alive
* **sec-ch-ua**: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"
* **sec-ch-ua-mobile**: ?0
* **sec-ch-ua-platform**: "Windows"
* **upgrade-insecure-requests**: 1
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
* **sec-fetch-site**: none
* **sec-fetch-mode**: navigate
* **sec-fetch-user**: ?1
* **sec-fetch-dest**: document
* **accept-encoding**: gzip, deflate, br, zstd
* **accept-language**: en-GB,en-US;q=0.9,en;q=0.8,id;q=0.7,ga;q=0.6
* **cookie**: XSRF-TOKEN=eyJpdiI6IkJOMUpncC8rTWdUcTZLNGlLNjdOUWc9PSIsInZhbHVlIjoicnJQQXYyVG1aTkVOaFd3UEhCTy9GaUNUdTNpSmtmeFhtWUx3MGpOTjBCSnJwWW9BSWxtSXQ2Z0dIcnl3ZW13c2dJVjVzc2dGRC9mNGV1a3p6c1kraXA4VzJjei85dFE2SmhDTHloeUtjOGdWcUh1bXlGL25aanlmS0JSemFkYUEiLCJtYWMiOiI2NjZlOTFiYTAwZmU3YWEzZGYyM2NhNmU3OWQ1YTQ1MjIwMzhiNTA2NTU2OTFiM2RlNTkzOWViYzE3NmZiNTZlIiwidGFnIjoiIn0%3D; fb-e-commerce-session=eyJpdiI6InBkdjVKSWpaSUVLYXJsL3BEdmp1enc9PSIsInZhbHVlIjoiWEY5SHRRTVMyZFZwYXVhQmRMRm9kcFN5bEpSS3NLNlZweGYyME9IQko5MmwzbTQyL2dSRWRHckRubUVjeHNMTDN6TUt5Rmt2SGZCQnBDbXJDTE9BYzYxcFYzbmNXTXRUc2RyU1dUcGZKdThTbFJNeWlKdU5PMnFHaG4yOCtocTMiLCJtYWMiOiJiOWZkMGI3ZjM0MGY4ZjM5YjNjZmY3ZDI4ZGNjMWZlN2NjYjBlYzY3N2JiOGNjY2FhYTBkMWQ1ZjZiMjE5ZTU0IiwidGFnIjoiIn0%3D

## Route Context

controller: App\Http\Controllers\HomepageController@productStatus
route name: product.cart
middleware: web, role:user,admin

## Route Parameters

No route parameter data available.

## Database Queries

* mysql - select * from `sessions` where `id` = 'tY7egYcBXdYJEuqcUdpHHQb1SvSBQNHGdllaz5Dh' limit 1 (8.97 ms)
* mysql - select * from `users` where `id` = 1 limit 1 (1.35 ms)
* mysql - select * from `notification` where `users_id` = 1 order by `created_at` desc (2.33 ms)
* mysql - select * from `orders` where `user_id` = 1 order by `created_at` desc limit 1 (1.81 ms)
* mysql - select * from `order_details` where `order_details`.`order_id` in (37) (1.39 ms)
* mysql - select * from `products` where `products`.`id` in (21) (1.74 ms)
* mysql - select * from `couriers` where `couriers`.`id` in (1) (1.06 ms)
* mysql - select * from `users` where `users`.`id` in (1) (1.14 ms)
