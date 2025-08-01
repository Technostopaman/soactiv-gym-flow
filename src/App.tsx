import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AdminLayout } from "@/components/layout/AdminLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            } />
            
            {/* Placeholder Admin Routes */}
            <Route path="/admin/enquiries" element={
              <AdminLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Enquiries</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </AdminLayout>
            } />
            <Route path="/admin/enquiry-form" element={
              <AdminLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Enquiry Form</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </AdminLayout>
            } />
            <Route path="/admin/clients" element={
              <AdminLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Clients</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </AdminLayout>
            } />
            <Route path="/admin/staff" element={
              <AdminLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Staff</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </AdminLayout>
            } />
            <Route path="/admin/reports" element={
              <AdminLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Reports</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </AdminLayout>
            } />
            <Route path="/admin/setup" element={
              <AdminLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Setup</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </AdminLayout>
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
