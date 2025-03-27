
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Attractions from "./pages/Attractions";
import AttractionDetail from "./pages/AttractionDetail";
import RoutesPage from "./pages/Routes";
import HistoryPage from "./pages/History";
import MapPage from "./pages/Map";
import InfoPage from "./pages/Info";
import RestaurantsPage from "./pages/Restaurants";
import AccommodationsPage from "./pages/Accommodations";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance for React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Index />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/attraction/:id" element={<AttractionDetail />} />
          <Route path="/routes" element={<RoutesPage />} />
          
          {/* Pages */}
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/accommodations" element={<AccommodationsPage />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
