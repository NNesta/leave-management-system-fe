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
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  //   Dashboard,
  Users,
  //   Calendar,
  Settings,
  Bell,
  LogOut,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FloatingSidebarTrigger } from "./floating-sidebar-trigger";
import UserAvatar from "./UserAvatar";
import { useMsal } from "@azure/msal-react";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Calendar,
  },
  {
    label: "Portfolio",
    path: "/portfolio",
    icon: Users,
  },
  {
    label: "Offerings",
    path: "/offerings",
    icon: Calendar,
  },
  {
    label: "Orders",
    path: "/orders",
    icon: Calendar,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

// Fake user for this sidebar mockup

function SidebarAvatarProfile() {
  const { state } = useSidebar();
  const { accounts } = useMsal();
  return (
    <div className="flex w-full items-center justify-between p-4 pb-2">
      <div
        className={cn(
          "flex items-center gap-3 transition-all",
          state === "collapsed" && "justify-center p-0"
        )}
      >
        <UserAvatar />
        {state === "expanded" && (
          <div>
            <div className="font-semibold leading-tight text-white text-base">
              {accounts[0]?.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarNotification() {
  const { state } = useSidebar();
  return (
    <div
      className={cn(
        "relative  mt-1 w-fit",
        state === "collapsed" ? "self-center" : "self-end"
      )}
    >
      <Bell className="text-white/90" size={22} />
      {/* Notification badge */}
      <span className="absolute -top-1 -right-0 flex size-3 rounded-full bg-red-500 border-2 border-black" />
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
          <SidebarAvatarProfile />
          <SidebarNotification />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu
                className={cn(
                  "w-full flex-col flex",
                  state === "collapsed" ? "items-center" : "items-start"
                )}
              >
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      className={cn(
                        "font-medium rounded-lg text-base transition-all",
                        location.pathname === item.path
                          ? "bg-white/10 text-white font-bold"
                          : "text-white/80 hover:bg-white/5"
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
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
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
