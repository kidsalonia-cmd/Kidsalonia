import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ContactUs from "./pages/ContactUs";
import Insights from "./pages/Insights";
import BlogPost from "./pages/BlogPost";
import Hair from "./pages/Hair";
import Nails from "./pages/Nails";
import Skin from "./pages/Skin";
import AboutUs from "./pages/AboutUs";
import AdminSeo from "./pages/AdminSeo";
import { Navigate } from "react-router-dom";
import BestKidsSalon from "./pages/BestKidsSalon";
import KidsSalonSector67 from "./pages/KidsSalonSector67";
import KidsSalonSohnaRoad from "./pages/KidsSalonSohnaRoad";
import KidsSalonDLF from "./pages/KidsSalonDLF";
import KidsSalonFaridabad from "./pages/KidsSalonFaridabad";
import KidsSalonSouthDelhi from "./pages/KidsSalonSouthDelhi";
import KidsSalonNewGurgaon from "./pages/KidsSalonNewGurgaon";
import KidsSalonDwarka from "./pages/KidsSalonDwarka";
import KidsSalonGreaterNoidaWest from "./pages/KidsSalonGreaterNoidaWest";
import KidsSalonNoida from "./pages/KidsSalonNoida";
import KidsSalonGhaziabad from "./pages/KidsSalonGhaziabad";
import KidsSalonDelhiNCR from "./pages/KidsSalonDelhiNCR";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<BlogPost />} />
          <Route path="/hair" element={<Hair />} />
          <Route path="/nails" element={<Nails />} />
          <Route path="/skin" element={<Skin />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin/seo" element={<AdminSeo />} />
          <Route path="/hyperrevamp-reporting" element={<Navigate to="/admin/seo" replace />} />
          <Route path="/best-kids-salon-gurugram" element={<BestKidsSalon />} />
          <Route path="/kids-salon-sector-67-gurugram" element={<KidsSalonSector67 />} />
          <Route path="/kids-salon-near-sohna-road-gurugram" element={<KidsSalonSohnaRoad />} />
          <Route path="/kids-salon-near-dlf-gurugram" element={<KidsSalonDLF />} />
          <Route path="/locations/kids-salon-faridabad" element={<KidsSalonFaridabad />} />
          <Route path="/locations/kids-salon-faridabad/" element={<KidsSalonFaridabad />} />
          <Route path="/locations/kids-salon-south-delhi" element={<KidsSalonSouthDelhi />} />
          <Route path="/locations/kids-salon-south-delhi/" element={<KidsSalonSouthDelhi />} />
          <Route path="/locations/kids-salon-new-gurgaon" element={<KidsSalonNewGurgaon />} />
          <Route path="/locations/kids-salon-new-gurgaon/" element={<KidsSalonNewGurgaon />} />
          <Route path="/locations/kids-salon-dwarka" element={<KidsSalonDwarka />} />
          <Route path="/locations/kids-salon-dwarka/" element={<KidsSalonDwarka />} />
          <Route path="/locations/kids-salon-greater-noida-west" element={<KidsSalonGreaterNoidaWest />} />
          <Route path="/locations/kids-salon-greater-noida-west/" element={<KidsSalonGreaterNoidaWest />} />
          <Route path="/locations/kids-salon-noida" element={<KidsSalonNoida />} />
          <Route path="/locations/kids-salon-noida/" element={<KidsSalonNoida />} />
          <Route path="/locations/kids-salon-ghaziabad" element={<KidsSalonGhaziabad />} />
          <Route path="/locations/kids-salon-ghaziabad/" element={<KidsSalonGhaziabad />} />
          <Route path="/locations/kids-salon-delhi-ncr" element={<KidsSalonDelhiNCR />} />
          <Route path="/locations/kids-salon-delhi-ncr/" element={<KidsSalonDelhiNCR />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
