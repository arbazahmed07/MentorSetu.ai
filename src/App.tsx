import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MentorDirectory from "./pages/MentorDirectory";
import MentorProfile from "./pages/MentorProfile";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import BecomeMentor from "./pages/BecomeMentor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mentors" element={<MentorDirectory />} />
          <Route path="/mentor/:id" element={<MentorProfile />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/become-mentor" element={<BecomeMentor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
