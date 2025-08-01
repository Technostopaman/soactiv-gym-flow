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
import Enquiries from "./pages/admin/Enquiries";
import EnquiryForm from "./pages/admin/EnquiryForm";
import Clients from "./pages/admin/Clients";
import Staff from "./pages/admin/Staff";
import Reports from "./pages/admin/Reports";
import Setup from "./pages/admin/Setup";

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
            
            {/* Admin Routes */}
            <Route path="/admin/enquiries" element={
              <AdminLayout>
                <Enquiries />
              </AdminLayout>
            } />
            <Route path="/admin/enquiry-form" element={
              <AdminLayout>
                <EnquiryForm />
              </AdminLayout>
            } />
            <Route path="/admin/clients" element={
              <AdminLayout>
                <Clients />
              </AdminLayout>
            } />
            <Route path="/admin/staff" element={
              <AdminLayout>
                <Staff />
              </AdminLayout>
            } />
            <Route path="/admin/reports" element={
              <AdminLayout>
                <Reports />
              </AdminLayout>
            } />
            <Route path="/admin/setup" element={
              <AdminLayout>
                <Setup />
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
