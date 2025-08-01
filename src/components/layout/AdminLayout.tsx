import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import { AddClientModal } from "@/components/modals/AddClientModal";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const handleAddClient = () => {
    setShowAddClientModal(true);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminTopBar onAddClient={handleAddClient} />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      <AddClientModal 
        open={showAddClientModal} 
        onOpenChange={setShowAddClientModal} 
      />
    </SidebarProvider>
  );
}