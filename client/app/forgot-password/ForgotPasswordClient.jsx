"use client";
import { useState } from 'react';

export default function ForgotPasswordClient() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'sent'
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setError('');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error('Something went wrong.');
            setStatus('sent');
        } catch (err) {
            setError(err.message);
            setStatus('idle');
        }
    };

    if (status === 'sent') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-green-700">Check Your Email</h2>
                    <p className="mt-4 text-gray-600">
                        If an account with the email <strong>{email}</strong> exists, a password reset link has been sent. Please check your inbox (and spam folder). The link is valid for 10 minutes.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">Reset Password</h2>
                <p className="text-sm text-center text-gray-600">
                    Please enter the email address registered with your account. A passowrd reset link will be sent to your mail.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Email Address</label>
                        <input name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full p-3 border rounded-md" />
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    <button type="submit" disabled={status === 'sending'} className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                        {status === 'sending' ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}