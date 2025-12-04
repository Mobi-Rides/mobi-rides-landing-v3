import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FindRidePage from "./pages/FindRidePage";
import HostPage from "./pages/HostPage";
import PartnersPage from "./pages/PartnersPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import SafetyPage from "./pages/SafetyPage";
import CareersPage from "./pages/CareersPage";
import PressPage from "./pages/PressPage";
import ContactPage from "./pages/ContactPage";
import SupportPage from "./pages/SupportPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import PricingPage from "./pages/PricingPage";
import Rent2BuyPage from "./pages/Rent2BuyPage";
import HostRequirementsPage from "./pages/HostRequirementsPage";
import FAQPage from "./pages/FAQPage";
import HostBenefitsPage from "./pages/HostBenefitsPage";
import HostDashboardPage from "./pages/HostDashboardPage";
import HostSupportPage from "./pages/HostSupportPage";
import LocationsPage from "./pages/LocationsPage";
import InsurancePage from "./pages/InsurancePage";
import HostProtectionPage from "./pages/HostProtectionPage";
import HostCommunityPage from "./pages/HostCommunityPage";
import TravelGuidesPage from "./pages/TravelGuidesPage";
import BusinessSolutionsPage from "./pages/BusinessSolutionsPage";
import ApiDocsPage from "./pages/ApiDocsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminBlogPage from "./pages/AdminBlogPage";
import AdminBlogEditPage from "./pages/AdminBlogEditPage";
import BlogPostPage from "./pages/BlogPostPage";
import AdminBlogPreviewPage from "./pages/AdminBlogPreviewPage";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import PageTransition from "./components/PageTransition";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
          <ScrollToTop />
          <ScrollToTopButton />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/find-ride" element={<FindRidePage />} />
              <Route path="/host" element={<HostPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/press" element={<PressPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/rent2buy" element={<Rent2BuyPage />} />
              <Route path="/host-requirements" element={<HostRequirementsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/host-benefits" element={<HostBenefitsPage />} />
              <Route path="/host-dashboard" element={<HostDashboardPage />} />
              <Route path="/host-support" element={<HostSupportPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/insurance" element={<InsurancePage />} />
              <Route path="/host-protection" element={<HostProtectionPage />} />
              <Route path="/host-community" element={<HostCommunityPage />} />
              <Route path="/travel-guides" element={<TravelGuidesPage />} />
              <Route path="/business-solutions" element={<BusinessSolutionsPage />} />
              <Route path="/api-docs" element={<ApiDocsPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/blog" element={
                <ProtectedRoute>
                  <AdminBlogPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/blog/new" element={
                <ProtectedRoute>
                  <AdminBlogEditPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/blog/edit/:id" element={
                <ProtectedRoute>
                  <AdminBlogEditPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/blog/preview/:id" element={
                <ProtectedRoute>
                  <AdminBlogPreviewPage />
                </ProtectedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
