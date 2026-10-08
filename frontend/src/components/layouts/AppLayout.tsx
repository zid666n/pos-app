import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../lib/shadcn/ui/sidebar";
import AdminSidebar from "../organism/AdminSidebar";
import AppNavbar from "../molecules/AppNavbar";


export default function AppLayout() {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="flex flex-col w-full p-3">
                <div className="flex-1 w-full space-y-3">
                    <AppNavbar />
                    <Outlet />
                </div>
                <footer className="text-center">
                    <small className="text-gray-500">&copy; {new Date().getFullYear()} Develop by Ahmad Zidan</small>
                </footer>
            </main>
        </SidebarProvider>
    )
}