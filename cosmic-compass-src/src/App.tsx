import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import QuizLanding from "./pages/QuizLanding";
import QuizQuestion1 from "./pages/QuizQuestion1";
import QuizQuestion2 from "./pages/QuizQuestion2";
import QuizQuestion3 from "./pages/QuizQuestion3";
import QuizQuestion4 from "./pages/QuizQuestion4";
import QuizResult from "./pages/QuizResult";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type MBTIAnswers = {
  EI: "E" | "I" | null;
  SN: "S" | "N" | null;
  TF: "T" | "F" | null;
  JP: "J" | "P" | null;
};

const App = () => {
  const [answers, setAnswers] = useState<MBTIAnswers>({
    EI: null,
    SN: null,
    TF: null,
    JP: null,
  });

  const setEI = useCallback((value: string) => {
    setAnswers(prev => ({ ...prev, EI: value as "E" | "I" }));
  }, []);

  const setSN = useCallback((value: string) => {
    setAnswers(prev => ({ ...prev, SN: value as "S" | "N" }));
  }, []);

  const setTF = useCallback((value: string) => {
    setAnswers(prev => ({ ...prev, TF: value as "T" | "F" }));
  }, []);

  const setJP = useCallback((value: string) => {
    setAnswers(prev => ({ ...prev, JP: value as "J" | "P" }));
  }, []);

  const getMBTIType = useCallback(() => {
    const { EI, SN, TF } = answers;
    if (EI && SN && TF) {
      return `${EI}${SN}${TF}`;
    }
    return null;
  }, [answers]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/quiz" replace />} />
              <Route path="/quiz" element={<QuizLanding />} />
              <Route path="/quiz/1" element={<QuizQuestion1 onAnswer={setEI} />} />
              <Route path="/quiz/2" element={<QuizQuestion2 onAnswer={setSN} />} />
              <Route path="/quiz/3" element={<QuizQuestion3 onAnswer={setTF} />} />
              <Route path="/quiz/4" element={<QuizQuestion4 onAnswer={setJP} getMBTIType={getMBTIType} />} />
              <Route path="/result/:type" element={<QuizResult />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
