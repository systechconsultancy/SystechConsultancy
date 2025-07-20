export const metadata = {
  title: "Admin Login | Systech Admin Dashboard",
  description: "Secure admin access for Systech Consultancy",
};

export default function LoginLayout({ children }) {
  return (
    <div className="bg-black text-gray-900 flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
}
