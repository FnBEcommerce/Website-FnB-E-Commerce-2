import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { Logo } from "./Logo";

export function AuthInterface() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative w-full max-w-4xl min-h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">

      {/* ================= SIGN IN ================= */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isSignUp
            ? "translate-x-full opacity-0 pointer-events-none"
            : "translate-x-0 opacity-100"
        }`}
      >
        {/* ================= MOBILE ================= */}
        <div className="md:hidden">
          {/* HERO */}
          <div className="relative h-64 bg-gradient-to-br from-orange-400 to-orange-500 rounded-b-[3rem] flex flex-col items-center justify-center text-white overflow-hidden">
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full" />
            <div className="absolute bottom-8 left-8 w-28 h-28 bg-white/10 rounded-full" />

            <div className="mb-4">
              <Logo light />
            </div>

            <div className="text-center px-6 z-10">
              <h2 className="text-2xl font-bold mb-2">Halo, Pelanggan !</h2>
              <p className="text-white/90 text-sm">
                silahkan masuk untuk melanjutkan
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="relative -mt-24 bg-white rounded-3xl shadow-xl mx-4 h-[420px] flex flex-col">
            <div className="flex-1 overflow-auto p-6">
              <SignInForm />
            </div>

            <div className="px-6 py-4 text-center">
              <button
                onClick={() => setIsSignUp(true)}
                className="text-orange-500 font-semibold"
              >
                DAFTAR
              </button>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex h-full">
          {/* LEFT */}
          <div className="w-1/2 bg-white p-12 flex flex-col justify-center relative">
            <div className="absolute top-8 left-8">
              <Logo />
            </div>
            <SignInForm />
          </div>

          {/* RIGHT */}
          <div className="w-1/2 relative bg-gradient-to-br from-orange-400 to-orange-500
                          flex items-center justify-center text-white overflow-hidden">

            {/* ORNAMENT */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute bottom-[-80px] left-[-80px] w-72 h-72 bg-white/10 rounded-full" />
            <div className="absolute top-24 left-16 w-20 h-20 bg-white/10 rounded-full" />

            <div className="relative z-10 text-center px-10">
              <h2 className="mb-4 text-2xl font-bold">Halo, Pelanggan !</h2>
              <p className="mb-8 text-white/90">
                Belum mendaftar ?
                <br />
                silahkan klik tombol di bawah ini
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="px-12 py-3 border-2 border-white rounded-full
                           hover:bg-white/10 transition"
              >
                DAFTAR
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* ================= SIGN UP ================= */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isSignUp
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* ================= MOBILE ================= */}
        <div className="md:hidden">
          {/* HERO */}
          <div className="relative h-64 bg-gradient-to-br from-orange-400 to-orange-500 rounded-b-[3rem] flex flex-col items-center justify-center text-white overflow-hidden">
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full" />
            <div className="absolute bottom-8 left-8 w-28 h-28 bg-white/10 rounded-full" />

            <div className="mb-4">
              <Logo light />
            </div>

            <div className="text-center px-6 z-10">
              <h2 className="text-2xl font-bold mb-2">Halo Pelanggan !</h2>
              <p className="text-white/90 text-sm">
                silahkan daftar untuk melanjutkan
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="relative -mt-24 bg-white rounded-3xl shadow-xl mx-4 h-[425px] flex flex-col">
            <div className="flex-1 overflow-auto p-6">
              <SignUpForm />
            </div>

            <div className="px-6 py-4 text-center">
              <button
                onClick={() => setIsSignUp(false)}
                className="text-orange-500 font-semibold"
              >
                MASUK
              </button>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex h-full">
          {/* LEFT */}
          <div className="w-1/2 relative bg-gradient-to-br from-orange-400 to-orange-500
                          flex items-center justify-center text-white overflow-hidden">

            {/* ORNAMENT */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full" />
            <div className="absolute top-32 right-20 w-24 h-24 bg-white/10 rounded-full" />

            <div className="absolute top-8 left-8">
              <Logo light />
            </div>

            <div className="relative z-10 text-center px-10">
              <h2 className="mb-4 text-2xl font-bold">Halo Pelanggan !</h2>
              <p className="mb-8 text-white/90">
                Sudah memiliki akun ?
                <br />
                silahkan klik tombol di bawah ini
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="px-12 py-3 border-2 border-white rounded-full
                           hover:bg-white/10 transition"
              >
                MASUK
              </button>
            </div>
          </div>

          <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
