import { getSession } from "@/hooks/getSession";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import { redirect } from "next/navigation";

const AdminLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const role = session.user?.role;

  const isAdmin =
    role === "admin" || (Array.isArray(role) && role.includes("admin"));

  if (!isAdmin) {
    redirect("/");
  }

  console.log(role);
  console.log(session);
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
