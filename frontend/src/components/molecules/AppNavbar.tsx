import { Card } from "../../lib/shadcn/ui/card";
import { SidebarTrigger } from "../../lib/shadcn/ui/sidebar";

export default function AppNavbar() {
    return <Card className="w-full border-border p-2 flex flex-row items-center" size="sm">
        <SidebarTrigger className="p-6" />
        <h1 className="text-2xl">Dashboard</h1>
    </Card>
}