import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export type MBTILetter = {
  EI: "E" | "I" | null;
  SN: "S" | "N" | null;
  TF: "T" | "F" | null;
  JP: "J" | "P" | null;
};

export const useQuizState = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<MBTILetter>({
    EI: null,
    SN: null,
    TF: null,
    JP: null,
  });

  const setAnswer = useCallback((dimension: keyof MBTILetter, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [dimension]: value as MBTILetter[typeof dimension],
    }));
  }, []);

  const getMBTIType = useCallback(() => {
    const { EI, SN, TF, JP } = answers;
    if (EI && SN && TF && JP) {
      return `${EI}${SN}${TF}${JP}`;
    }
    return null;
  }, [answers]);

  const goToResult = useCallback(() => {
    const type = getMBTIType();
    if (type) {
      navigate(`/result/${type}`);
    }
  }, [getMBTIType, navigate]);

  const resetQuiz = useCallback(() => {
    setAnswers({
      EI: null,
      SN: null,
      TF: null,
      JP: null,
    });
  }, []);

  return {
    answers,
    setAnswer,
    getMBTIType,
    goToResult,
    resetQuiz,
  };
};
