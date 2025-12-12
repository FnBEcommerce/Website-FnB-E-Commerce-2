# Illuminate\Database\QueryException - Internal Server Error

SQLSTATE[42000]: Syntax error or access violation: 1055 Expression #1 of ORDER BY clause is not in GROUP BY clause and contains nonaggregated column 'fnb.orders.created_at' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by (Connection: mysql, SQL: select DATE_FORMAT(created_at, "%a") as name, SUM(subtotal) as pendapatan, COUNT(id) as pesanan from `orders` where `created_at` >= 2024-12-12 17:21:40 group by `name` order by WEEK(created_at) asc)

PHP 8.4.14
Laravel 12.38.1
localhost:8000

## Stack Trace

0 - vendor\laravel\framework\src\Illuminate\Database\Connection.php:824
1 - vendor\laravel\framework\src\Illuminate\Database\Connection.php:778
2 - vendor\laravel\framework\src\Illuminate\Database\Connection.php:397
3 - vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php:3188
4 - vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php:3173
5 - vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php:3763
6 - vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php:3172
7 - vendor\laravel\framework\src\Illuminate\Database\Eloquent\Builder.php:902
8 - vendor\laravel\framework\src\Illuminate\Database\Eloquent\Builder.php:884
9 - app\Http\Controllers\AdminController.php:256
10 - app\Http\Controllers\AdminController.php:259
11 - vendor\laravel\framework\src\Illuminate\Routing\ControllerDispatcher.php:46
12 - vendor\laravel\framework\src\Illuminate\Routing\Route.php:265
13 - vendor\laravel\framework\src\Illuminate\Routing\Route.php:211
14 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:822
15 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
16 - vendor\laravel\framework\src\Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets.php:32
17 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
18 - vendor\inertiajs\inertia-laravel\src\Middleware.php:96
19 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
20 - app\Http\Middleware\HandleAppearance.php:21
21 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
22 - vendor\laravel\framework\src\Illuminate\Routing\Middleware\SubstituteBindings.php:50
23 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
24 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken.php:87
25 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
26 - vendor\laravel\framework\src\Illuminate\View\Middleware\ShareErrorsFromSession.php:48
27 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
28 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:120
29 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:63
30 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
31 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse.php:36
32 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
33 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\EncryptCookies.php:74
34 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
35 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
36 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:821
37 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:800
38 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:764
39 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:753
40 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:200
41 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
42 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
43 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull.php:31
44 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
45 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
46 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TrimStrings.php:51
47 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
48 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePostSize.php:27
49 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
50 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance.php:109
51 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
52 - vendor\laravel\framework\src\Illuminate\Http\Middleware\HandleCors.php:48
53 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
54 - vendor\laravel\framework\src\Illuminate\Http\Middleware\TrustProxies.php:58
55 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
56 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\InvokeDeferredCallbacks.php:22
57 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
58 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePathEncoding.php:26
59 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
60 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
61 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:175
62 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:144
63 - vendor\laravel\framework\src\Illuminate\Foundation\Application.php:1220
64 - public\index.php:20
65 - vendor\laravel\framework\src\Illuminate\Foundation\resources\server.php:23

## Request

GET /admin/cashflow-management

## Headers

- **host**: localhost:8000
- **connection**: keep-alive
- **cache-control**: max-age=0
- **sec-ch-ua**: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"
- **sec-ch-ua-mobile**: ?0
- **sec-ch-ua-platform**: "Windows"
- **upgrade-insecure-requests**: 1
- **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
- **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3;q=0.7
- **sec-fetch-site**: none
- **sec-fetch-mode**: navigate
- **sec-fetch-user**: ?1
- **sec-fetch-dest**: document
- **accept-encoding**: gzip, deflate, br, zstd
- **accept-language**: en-GB,en-US;q=0.9,en;q=0.8,id;q=0.7,ga;q=0.6
- **cookie**: rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX19qRQJjSTHJAWWOadxKBVNdkmqPhtm4Z5UsKLcrK4inXeO1Ae%2FbU86oFZhm25AFIFhwFKLTHaOtGA%3D%3D; rl_page_init_referrer=RudderEncrypt%3AU2FsdGVkX1%2Bb2E8uypBtMIp22GCYPAWwvUDoxTuK6HE%3D; rl_page_init_referring_domain=RudderEncrypt%3AU2FsdGVkX18%2FaoMSkSRvaNF4qtbf%2BBSx7cRODoh%2FkQY%3D; rl_user_id=RudderEncrypt%3AU2FsdGVkX19Jpe4c0DK05QgV1eCUVwfVidYHtSItmbhabBgSeZiSmWMmWOsvJj11PbnBEas8K9IWQJoVw0cnhYtTMls1EqECla8rScx%2FUF42iBGp2VroJyrCed6raKRML1SDH53xjplRMjetA2CB0A6UrGl59BhAMbg9ow27tks%3D; rl_trait=RudderEncrypt%3AU2FsdGVkX1%2FR24lwpgYR%2B1K%2FRAfL0wSbiF3Ht%2F3%2BCAJPvLWKInLufV0NJtlmv3V0zInw3U2noDnG7XfqrwjJOkGfKAvAcsRar8trpkaoqr43ffyd8h51BrVKfH%2BTODYwT%2BPH5eDA%2F5ppTWt1rScc8g%3D%3D; rl_session=RudderEncrypt%3AU2FsdGVkX1%2By1F%2BhOdP90PG5rh2F5KS77gTmrz%2F8DhpIvzXqvtPE9oeIXitcoF6qg5dWtfPHjji%2Fa%2FSn%2Fb6tWj5EjdinW%2FtDQpGZjGZi2zabEM0XwTaLa9NfliXD%2BLUx2UDa321KIs8LbQOmF0RNbA%3D%3D; ph_phc_4URIAm1uYfJO7j8kWSe0J8lc8IqnstRLS7Jx8NcakHo_posthog=%7B%22distinct_id%22%3A%2237bf347d0e29b8f99d3713d167220487d04caf560d070c0860300c27dbb008de%23d5654710-dfb8-43c6-a536-8a9328df0b58%22%2C%22%24sesid%22%3A%5B1762415011419%2C%22019a581e-e660-74f5-9414-e25df323e80d%22%2C1762415011419%5D%2C%22%24epp%22%3Atrue%2C%22%24initial_person_info%22%3A%7B%22r%22%3A%22%24direct%22%2C%22u%22%3A%22http%3A%2F%2Flocalhost%3A5678%2Fsetup%22%7D%7D; \_ga=GA1.1.1857082712.1762845239; \_ga_4B63ZDHB5M=GS2.1.s1762845239$o1$g1$t1762846232$j60$l0$h0; dir=ltr; vite-ui-theme=dark; sidebar_state=true; XSRF-TOKEN=eyJpdiI6ImsvbGhoS05DSG9EakNsTGZlTm13RXc9PSIsInZhbHVlIjoiMkVCN3ppb0E4VGtWYWlTb0hZZFVIeWw0WW14R1pMdmZTOWRUQUNZVzIrY2RTSnpxaDFmOG53b3cvUkhVL3BSOFJIVGFrb3RPTkZ0cmdqalRvK1hWN1BXS2NJYk1hNDRTd2I5Q21VWHN0TGdYeDZ2MWJaV3U0UkF6Mi9tWWRrdWkiLCJtYWMiOiIyNTFlMjU1OGFjZTFjYjQ4MDBmYmUwYzhiZDM4ZjIxNGFjZDAwOGFiMDkwZDhlZDhmMGFkMjA5YjUxMjNjZTFiIiwidGFnIjoiIn0%3D; fb-e-commerce-session=eyJpdiI6IkpqYU93UkRPcTdYR3Y4NWlLQUwyakE9PSIsInZhbHVlIjoiMENEQUUyREZCa294dVl5S1J2NmJkSkNWS3lVWEVUaENtV2R0OVlHblprcXNsbXlBdGRKTWx4RjRoMTBGQ29taWFOT3B2VnJ1N1ZESGd3enMvVjlDdjl3Z3BBa2p1NEdKVUpLWmllRHpYdmtxQVJpRXdkcFdQYUVuUXBnanF1YkYiLCJtYWMiOiJhYmZiNzBjYjU3NDQzM2JlNWM3YjMxODczMzA3MWMyNGU3MWY2YjBmMGI3YjdmMTg4ZmIwYzlhOGY0OTVlNjRjIiwidGFnIjoiIn0%3D

## Route Context

controller: App\Http\Controllers\AdminController@cashflowManagement
route name: admin.cashflow_management
middleware: web

## Route Parameters

No route parameter data available.

## Database Queries

- mysql - select \* from `sessions` where `id` = 'p7uEIYGOGbrLYpXFze74CR5BrRdXIYoEmLs5cE4N' limit 1 (11.73 ms)
- mysql - select \* from `orders` (2.7 ms)
