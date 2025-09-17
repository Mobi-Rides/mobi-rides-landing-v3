import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-ride" element={<FindRidePage />} />
          <Route path="/host" element={<HostPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
