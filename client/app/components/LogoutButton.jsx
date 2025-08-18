"use client";
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Call the backend API to clear the httpOnly cookie
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, { 
      method: 'POST',
      credentials: "include", 
    });
    // Refresh the current route to reflect the logged-out state
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 cursor-pointer rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition"
    >
      Logout
    </button>
  );
}