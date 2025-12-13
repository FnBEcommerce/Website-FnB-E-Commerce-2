<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(Request $request) {
        // TODO: Tambahkan validation
        // $request->validate([
        //     'username' => 'required|string|max:255|unique:users,name',
        //     'password' => 'required|string|min:8|confirmed',
        //     'homeAddress' => 'required|string|max:255',
        // ]);

        // return response()->json(['status' => 'ok']);

        // The 'email' field is required and unique. We'll generate a dummy one.
        // The 'name' field will be used as the username.
        $user = User::create([
            'name' => $request->username,
            'email' => $request->username . '@example.com', // Dummy email to satisfy DB constraint
            'password' => Hash::make($request->password),
            'street' => $request->homeAddress, // Storing the address in the 'street' column
        ]);

        Auth::login($user);

        return response()->json([
            'suceess' => true,
            'message' => 'Registration successful.',
            'user' => $user
        ], 201);
    }

    /**
     * Handle user login.
     */
    public function login(Request $request) {
        // TODO: Tambahkan validation
        // $request->validate([
        //     'username' => 'required|string',
        //     'password' => 'required|string',
        // ]);

        // Attempt login using 'name' as the username field
        $credentials = [
            'name' => $request->username,
            'password' => $request->password,
        ];

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                'suceess' => true,
                'message' => 'Login successful.',
                'user' => Auth::user()
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Login failed.',
            ])->setStatusCode(401);
        }

        // throw ValidationException::withMessages([
        //     'username' => [trans('auth.failed')],
        // ]);
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out successfully.']);
    }
}