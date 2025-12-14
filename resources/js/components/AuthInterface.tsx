import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { Logo } from "./Logo";

export function AuthInterface() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Sign In Container */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isSignUp ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <div className="flex h-full">
          {/* Left Side - Sign In Form */}
          <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
            <div className="absolute top-8 left-8">
              <Logo />
            </div>
            <SignInForm />
          </div>

          {/* Right Side - Welcome Panel */}
          <div className="w-1/2 bg-gradient-to-br from-orange-400 to-orange-500 p-12 flex flex-col items-center justify-center text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-red-300/20 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-red-600/20 rounded-full"></div>
            <div className="absolute top-1/2 left-10 w-24 h-24 bg-orange-100/10 rounded-full"></div>

            <div className="relative z-10 text-center">
              <h2 className="mb-4">Halo, Pelanggan !</h2>
              <p className="mb-8 text-white/90">
                Belum mendaftar ?
                <br />
                silahkan klik tombol di bawah ini
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="px-12 py-3 border-2 border-white rounded-full hover:bg-white/10 transition-colors"
              >
                DAFTAR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Container */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isSignUp ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-full">
          {/* Left Side - Welcome Back Panel */}
          <div className="w-1/2 bg-gradient-to-br from-orange-400 to-orange-500 p-12 flex flex-col items-center justify-center text-white relative overflow-hidden">
            <div className="absolute top-8 left-8">
              <Logo light />
            </div>

            {/* Decorative circles */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-red-300/20 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-red-600/20 rounded-full"></div>
            <div className="absolute top-1/2 left-10 w-24 h-24 bg-orange-100/10 rounded-full"></div>

            <div className="relative z-10 text-center">
              <h2 className="mb-4">Halo Pelanggan !</h2>
              <p className="mb-8 text-white/90">
                Sudah memiliki akun ?
                <br />
                silahkan klik tombol di bawah ini
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="px-12 py-3 border-2 border-white rounded-full hover:bg-white/10 transition-colors"
              >
                MASUK
              </button>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
