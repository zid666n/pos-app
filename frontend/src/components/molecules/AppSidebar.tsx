import { ChevronUp, LogOutIcon, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../lib/shadcn/ui/dropdown-menu";
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../lib/shadcn/ui/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../lib/shadcn/ui/alert-dialog";

interface IAppSidebar {
    children: React.ReactNode
}

export default function AppSidebar({ children }: IAppSidebar) {
    return (
        <Sidebar collapsible="icon" data-collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="font-bold text-xl group-data-[collapsible=icon]:hidden">
                            Point Of Sales
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            {children}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={(
                                <SidebarMenuButton>
                                    <User2 /> Zidan
                                    <ChevronUp className="h-4 w-4 ml-auto text-gray-500" />
                                </SidebarMenuButton>
                            )} />
                            <DropdownMenuContent side="right" align="end" className="w-auto">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                    <AlertDialogTrigger nativeButton={false} render={(
                                        <DropdownMenuItem closeOnClick={false} variant="destructive">
                                            <LogOutIcon />
                                            Keluar
                                        </DropdownMenuItem>
                                    )} />
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Konfirmasi keluar</AlertDialogTitle>
                                            <AlertDialogDescription>Apakah kamu yakin ingin keluar dari dashboard?</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel variant="outline" size="default">Batal</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => { }}>Ya</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}