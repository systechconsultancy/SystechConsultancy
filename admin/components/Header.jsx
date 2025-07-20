// components/Header.jsx
"use client";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="text-sm text-gray-600">Logged in as <strong>Admin</strong></div>
    </header>
  );
}
