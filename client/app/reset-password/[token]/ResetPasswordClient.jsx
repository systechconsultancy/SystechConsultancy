"use client";
import { useState } from 'react';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({ score }) => {
    const strength = {
        0: { text: 'Weak', color: 'bg-red-500' },
        1: { text: 'Fair', color: 'bg-orange-500' },
        2: { text: 'Good', color: 'bg-yellow-500' },
        3: { text: 'Strong', color: 'bg-lime-500' },
        4: { text: 'Very Strong', color: 'bg-green-500' },
    };

    const width = score === 0 ? 'w-1/5' : `w-${score + 1}/5`;

    return (
        <div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className={`h-2 rounded-full ${strength[score].color} transition-all duration-300`} style={{ width: `${(score + 1) * 20}%` }}></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">{strength[score].text}</p>
        </div>
    );
};

export default function ResetPasswordClient({ token, params }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword) {
            const result = zxcvbn(newPassword);
            setStrength(result.score);
        } else {
            setStrength(0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setStatus('sending');
        setError('');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to reset password.');
            setStatus('success');
        } catch (err) {
            setError(err.message);
            setStatus('idle');
        }
    };

    if (status === 'success') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-green-700">Password Reset Successful!</h2>
                    <p className="mt-4 text-gray-600">You can now log in with your new password.</p>
                    <Link href="/login" className="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">Set a New Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">New Password</label>
                        <div className="relative mt-1">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full p-3 border rounded-md pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                        {password && <PasswordStrengthMeter score={strength} />}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <div className="relative mt-1">
                            <input
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 border rounded-md pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    <button type="submit" disabled={status === 'sending'} className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                        {status === 'sending' ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}