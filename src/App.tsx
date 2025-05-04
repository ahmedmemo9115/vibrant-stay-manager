
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Setup from "./pages/Setup";
import HotelDetails from "./pages/HotelDetails";
import Rooms from "./pages/Rooms";
import Guests from "./pages/Guests";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import Payments from "./pages/Payments";
import Charges from "./pages/Charges";
import Housekeeping from "./pages/Housekeeping";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/charges" element={<Charges />} />
          <Route path="/housekeeping" element={<Housekeeping />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/setup/hotel-details" element={<HotelDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
