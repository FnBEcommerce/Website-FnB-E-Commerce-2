import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { Logo } from "./Logo";

export function AuthInterface() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">

      {/* ================= SIGN IN ================= */}
      <section
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isSignUp
            ? "translate-x-full opacity-0 pointer-events-none"
            : "translate-x-0 opacity-100"
        }`}
      >
        {/* ================= SIGN IN MOBILE ================= */}
        <div className="md:hidden min-h-screen flex flex-col bg-white">
          {/* HERO */}
          <div
            className="
              relative min-h-[40vh]
              bg-gradient-to-br from-orange-400 to-orange-500
              rounded-b-[3rem]
              flex flex-col items-center justify-center
              text-white overflow-hidden
            "
          >
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full" />
            <div className="absolute bottom-8 left-8 w-28 h-28 bg-white/10 rounded-full" />

            <Logo light />

            <div className="text-center px-6 mt-4 z-10">
              <h2 className="text-2xl font-bold mb-2">Halo, Pelanggan !</h2>
              <p className="text-white/90 text-sm">
                silahkan masuk untuk melanjutkan
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="flex-1 flex flex-col px-6 pt-8">
            <SignInForm />

            {/* BUTTON FIX BOTTOM */}
            <div className="mt-auto py-6 text-center">
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
        <div className="hidden md:grid grid-cols-2 min-h-screen">
          {/* LEFT */}
          <div className="flex flex-col justify-center px-16 relative">
            <div className="absolute top-8 left-8">
              <Logo />
            </div>
            <SignInForm />
          </div>

          {/* RIGHT */}
          <div className="relative bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white overflow-hidden">
            {/* ORNAMENT */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full" />
            <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-white/10 rounded-full" />
            <div className="absolute top-32 left-24 w-20 h-20 bg-white/10 rounded-full" />

            <div className="relative z-10 text-center px-10">
              <h2 className="text-3xl font-bold mb-4">Halo, Pelanggan!</h2>
              <p className="text-white/90 mb-8">
                Belum mendaftar?
                <br />
                silahkan klik tombol di bawah ini
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="px-12 py-3 border-2 border-white rounded-full hover:bg-white/10 transition"
              >
                DAFTAR
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SIGN UP ================= */}
      <section
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isSignUp
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* ================= SIGN UP MOBILE ================= */}
        <div className="md:hidden min-h-screen flex flex-col bg-white">
          {/* HERO */}
          <div
            className="
              relative min-h-[40vh]
              bg-gradient-to-br from-orange-400 to-orange-500
              rounded-b-[3rem]
              flex flex-col items-center justify-center
              text-white overflow-hidden
            "
          >
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full" />
            <div className="absolute bottom-8 left-8 w-28 h-28 bg-white/10 rounded-full" />

            <Logo light />

            <div className="text-center px-6 mt-4 z-10">
              <h2 className="text-2xl font-bold mb-2">Halo Pelanggan !</h2>
              <p className="text-white/90 text-sm">
                silahkan daftar untuk melanjutkan
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="flex-1 flex flex-col px-6 pt-8">
            <SignUpForm />

            {/* BUTTON FIX BOTTOM */}
            <div className="mt-auto py-6 text-center">
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
        <div className="hidden md:grid grid-cols-2 min-h-screen">
          {/* LEFT */}
          <div className="relative bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white overflow-hidden">
            {/* ORNAMENT */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full" />
            <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-white/10 rounded-full" />

            <div className="absolute top-8 left-8">
              <Logo light />
            </div>

            <div className="relative z-10 text-center px-10">
              <h2 className="text-3xl font-bold mb-4">Halo Pelanggan!</h2>
              <p className="text-white/90 mb-8">
                Sudah memiliki akun?
                <br />
                silahkan klik tombol di bawah ini
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="px-12 py-3 border-2 border-white rounded-full hover:bg-white/10 transition"
              >
                MASUK
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-center px-16 bg-white">
            <SignUpForm />
          </div>
        </div>
      </section>
    </div>
  );
}
