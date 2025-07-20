"use client";
import LogOutSVG from "@/icons/LogoutSVG";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="pt-6 text-red-300 hover:text-red-500 flex items-center space-x-2 cursor-pointer"
    >
      <span className="w-5 h-5">
        <LogOutSVG />
      </span>
      <span className="text-lg font-medium">Logout</span>
    </button>
  );
}

export default LogoutButton;