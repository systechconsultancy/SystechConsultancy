"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import PasswordStrengthMeter from "../components/shared/PasswordStrengthMeter"
import zxcvbn from 'zxcvbn';

export default function SignupClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: "", password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      if (value) {
        const result = zxcvbn(value);
        setStrength(result.score);
      } else {
        setStrength(0);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...submissionData } = formData;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to sign up.');
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
        <h2 className="text-2xl font-bold text-center text-gray-900">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input name="name" type="text" required value={formData.name} onChange={handleChange} className="mt-1 w-full p-3 border rounded-md" />
          </div>
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 w-full p-3 border rounded-md" />
          </div>
          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <input
              name="phone"
              type="tel"
              required
              pattern="[6-9]\d{9}"
              title="Please enter a valid 10-digit Indian mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input name="password" type={showPassword ? 'text' : 'password'} required minLength="8" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-md pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {formData.password && <PasswordStrengthMeter score={strength} />}
          </div>
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <input name="confirmPassword" type={showPassword ? 'text' : 'password'} required value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 border rounded-md pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}