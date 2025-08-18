"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { initiateWorkshopRegistration } from './action'; // Import the Server Action

export default function RegisterButton({ slug, workshopId }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    // Call the server action directly
    try {
      const response = await initiateWorkshopRegistration(workshopId);
      console.log("Registration Response: ", response);
      if (!response.success) {
        setError(response.error || 'An error occurred while registering.');
        return;
      }
      router.push(`/workshops/payment/${slug}`);
    } catch (error) {
      console.error("Registration Error:", error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full text-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Register Now'}
      </button>
      {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
}