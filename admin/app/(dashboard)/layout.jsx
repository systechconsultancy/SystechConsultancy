import { getAdminSession } from "./lib/getAdminSession";
import DashboardShell from "./DashboardShell";

export const metadata = {
  title: "Systech Admin Dashboard",
  description: "Admin Panel for Systech Consultancy – Empowering Your Vision",
};

export default async function DashboardLayout({ children }) {
  const session = await getAdminSession(); // Runs on server
  return <DashboardShell session={session}>{children}</DashboardShell>;
}