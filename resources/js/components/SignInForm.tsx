import axios from 'axios';
import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';

export function SignInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = { username, password };
            console.log('Sign in:', data);
            const response = await axios.post('/api/login', data);
            console.log('Sign in response', response);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-sm">
            <h1 className="mb-8 text-orange-500">Masuk ke FNB E-Commerce</h1>

            {/* <div className="flex justify-center gap-4 mb-6">
        <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Facebook className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </button>
        <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Linkedin className="w-5 h-5" />
        </button>
      </div> */}

            {/* <p className="text-center text-gray-500 text-sm mb-6">
        or use your email account:
      </p> */}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Nama Pengguna"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-lg border-none bg-gray-100 py-3 pr-4 pl-12 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        required
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Kata Sandi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border-none bg-gray-100 py-3 pr-4 pl-12 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        required
                    />
                </div>

                <button
                    type="button"
                    className="text-sm text-gray-600 transition-colors hover:text-orange-500"
                >
                    Lupa kata sandi Anda?
                </button>

                <button
                    type="submit"
                    className="mt-6 w-full rounded-full bg-orange-500 py-3 text-white transition-colors hover:bg-orange-600"
                >
                    MASUK
                </button>
            </form>
        </div>
    );
}
