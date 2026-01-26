import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SciFiBackground from "@/components/quiz/SciFiBackground";
import QuizOption from "@/components/quiz/QuizOption";

interface QuizQuestion2Props {
  onAnswer: (value: string) => void;
}

const QuizQuestion2 = ({ onAnswer }: QuizQuestion2Props) => {
  const navigate = useNavigate();

  const handleSelect = (value: "S" | "N") => {
    onAnswer(value);
    navigate("/quiz/3");
  };

  const sensingText = "I trust what I can see, touch, and verify; I don't need theories when real-world proof exists, I notice details others miss, remember exact words and moments, and prefer what works now over what might work someday—give me clarity, facts, and something tangible, and I'm grounded.";

  const intuitionText = "I connect dots without knowing how, see meanings beneath words, think ten steps ahead, and feel restless with surface-level explanations; ideas excite me more than details, possibilities feel more real than the present, and my mind is always asking what could be instead of what is.";

  return (
    <>
      <Helmet>
        <title>Sensing vs Intuition | MBTI Personality Quiz</title>
        <meta name="description" content="Are you a sensing or intuitive type? Discover how you perceive and process information in this MBTI personality test question." />
        <meta name="keywords" content="sensing, intuition, MBTI, personality test, perception, information processing, personality type" />
      </Helmet>

      <div className="relative h-full w-full flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
        <SciFiBackground variant="question2" />
        
        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto flex flex-col h-full justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress indicator */}
          <motion.div
            className="flex justify-center gap-2 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-8 sm:w-12 h-1 rounded-full ${
                  step <= 2 ? "bg-secondary" : "bg-muted"
                }`}
              />
            ))}
          </motion.div>

          {/* Question */}
          <motion.div
            className="text-center mb-4 sm:mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="font-orbitron text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
              Question 2 of 4
            </span>
            <h1 className="font-orbitron text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mt-2">
              How do you{" "}
              <span className="text-secondary text-glow-cyan">perceive</span> the world?
            </h1>
          </motion.div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <QuizOption
              title="Sensing"
              description={sensingText}
              onClick={() => handleSelect("S")}
              variant="left"
              delay={0.3}
            />
            <QuizOption
              title="Intuition"
              description={intuitionText}
              onClick={() => handleSelect("N")}
              variant="right"
              delay={0.4}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default QuizQuestion2;
