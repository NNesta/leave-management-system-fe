import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  LogOut,
  Briefcase,
  FilePlus,
  ClipboardList,
  CalendarDays,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FloatingSidebarTrigger } from "./floating-sidebar-trigger";
import UserAvatar from "./UserAvatar";
import { useMsal } from "@azure/msal-react";
import { useMemo } from "react";
import { FaBalanceScale } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { useUserByEmail } from "@/hooks/useEmployee";
import { User } from "../user/types";

function SidebarAvatarProfile({ currentUser }: { currentUser: User }) {
  const { state } = useSidebar();
  return (
    <div className="flex w-full items-center justify-between p-4 pb-2">
      <div
        className={cn(
          "flex items-center gap-3 transition-all",
          state === "collapsed" && "justify-center p-0"
        )}
      >
        <UserAvatar
          avatarUrl={currentUser?.avatar?.url}
          name={currentUser?.fullName}
        />
        {state === "expanded" && (
          <div>
            <div className="font-semibold leading-tight text-white text-base">
              {currentUser?.fullName}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarLogout() {
  const { state } = useSidebar();
  const { instance } = useMsal();
  const handleLogout = async () => {
    instance.logout();
  };
  return (
    <Button
      variant="outline"
      size={state === "collapsed" ? "icon" : "default"}
      className={cn(
        "mx-3 mb-3 mt-2 bg-transparent border border-white/30 text-white hover:bg-white/20",
        state === "collapsed" &&
          "rounded-full w-12 h-12 justify-center p-0 border-0"
      )}
      onClick={handleLogout}
    >
      <LogOut size={22} className="text-white" />
      {state !== "collapsed" && <span className="ml-2">Logout</span>}
    </Button>
  );
}

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { accounts } = useMsal();
  const { data: currentUser } = useUserByEmail(accounts[0]?.username);

  const menuItems = useMemo(() => {
    const common = [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { label: "New Leave Request", path: "/new-request", icon: FilePlus },
    ];
    const manager = [
      { label: "Manager View", path: "/manager", icon: FcManager },
      { label: "Leave Types", path: "/leave-types", icon: ClipboardList },
      { label: "Leave Balance", path: "/leave-balance", icon: FaBalanceScale },
    ];
    const admin = [
      { label: "Team Calendar", path: "/team-calendar", icon: CalendarDays },
      { label: "Users", path: "/users", icon: Users },
      { label: "Departments", path: "/departments", icon: Briefcase },
    ];

    if (currentUser?.role === "ADMIN") return [...common, ...manager, ...admin];
    if (currentUser?.role === "MANAGER") return [...common, ...manager];
    return common;
  }, [currentUser]);
  return (
    <Sidebar
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "5rem", // Increased from default 3rem
        } as React.CSSProperties
      }
      collapsible="icon"
      side={"left"}
      className={cn(
        "text-white shadow-2xl border-0 ",
        "min-h-screen flex flex-col",
        "transition-all duration-300"
      )}
    >
      <div className="flex flex-col h-full bg-[#1A1F2C]">
        <SidebarHeader>
          <SidebarAvatarProfile currentUser={currentUser} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            {menuItems && (
              <SidebarGroupContent>
                <SidebarMenu
                  className={cn(
                    "w-full flex-col flex gap-4 my-16",
                    state === "collapsed" ? "items-center" : "items-start"
                  )}
                >
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <Link to={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === item.path}
                          className={cn(
                            "font-medium rounded-lg text-base transition-all",
                            location.pathname === item.path
                              ? "bg-white/10 text-white font-bold"
                              : "hover:text-gray-400 hover:bg-white/5"
                          )}
                        >
                          <a
                            href={item.path}
                            className="flex items-center gap-3 w-full"
                          >
                            <item.icon
                              className={cn(
                                "size-5",
                                location.pathname === item.path
                                  ? "text-[#9b87f5]"
                                  : "text-white/80"
                              )}
                            />
                            {state !== "collapsed" && <span>{item.label}</span>}
                          </a>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter
          className={cn(
            "w-full flex items-center",
            state === "collapsed"
              ? "flex-col justify-center"
              : "justify-between flex-row"
          )}
        >
          <SidebarLogout />
          <FloatingSidebarTrigger />
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
