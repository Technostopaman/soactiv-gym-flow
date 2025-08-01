import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Users,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  Dumbbell,
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Enquiries",
    url: "/admin/enquiries",
    icon: MessageSquare,
  },
  {
    title: "Enquiry Form",
    url: "/admin/enquiry-form",
    icon: FileText,
  },
  {
    title: "Clients",
    url: "/admin/clients",
    icon: Users,
  },
  {
    title: "Staff",
    url: "/admin/staff",
    icon: UserCog,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Setup",
    url: "/admin/setup",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground";

  const handleLogout = () => {
    // TODO: Implement logout logic with Supabase
    console.log("Logout clicked");
  };

  return (
    <Sidebar
      className="sidebar-glow transition-all duration-300"
      collapsible="icon"
    >
      <SidebarContent className="pt-4">
        {/* Logo Section */}
        <div className={`px-4 mb-6 ${isCollapsed ? "text-center" : ""}`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-xl text-gradient">SoActiv</h1>
                <p className="text-xs text-muted-foreground">Fitness Application</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClasses}
                      title={isCollapsed ? item.title : ""}
                    >
                      <item.icon className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto p-4">
          <SidebarMenuButton 
            onClick={handleLogout}
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
            {!isCollapsed && <span>Logout</span>}
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}