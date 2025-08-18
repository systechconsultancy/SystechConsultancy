"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginClient() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rememberMe }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to log in.');
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 w-full p-3 border rounded-md" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input name="password" type="password" required value={formData.password} onChange={handleChange} className="mt-1 w-full p-3 border rounded-md" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link href="/signup" className="font-medium text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}