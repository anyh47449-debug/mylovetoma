import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MiniGames from "./pages/MiniGames";
import CherryGame from "./pages/CherryGame";
import ReactionGame from "./pages/ReactionGame";
import TypingGame from "./pages/TypingGame";
import MemoryGame from "./pages/MemoryGame";
import SpamHeartsGame from "./pages/SpamHeartsGame";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<MiniGames />} />
          <Route path="/games/cherry" element={<CherryGame />} />
          <Route path="/games/reaction" element={<ReactionGame />} />
          <Route path="/games/typing" element={<TypingGame />} />
          <Route path="/games/memory" element={<MemoryGame />} />
          <Route path="/games/spam-hearts" element={<SpamHeartsGame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
