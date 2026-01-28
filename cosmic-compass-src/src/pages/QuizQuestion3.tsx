import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SciFiBackground from "@/components/quiz/SciFiBackground";
import QuizOption from "@/components/quiz/QuizOption";

interface QuizQuestion3Props {
  onAnswer: (value: string) => void;
}

const QuizQuestion3 = ({ onAnswer }: QuizQuestion3Props) => {
  const navigate = useNavigate();

  const handleSelect = (value: "T" | "F") => {
    onAnswer(value);
    navigate("/quiz/4");
  };

  const thinkingText = "I don't switch off emotions because I lack them, I set them aside to think clearly; I respect logic, consistency, and fairness more than comfort, I say what's true even when it disrupts the mood, and I'd rather be misunderstood for honesty than praised for something that isn't accurate—clarity feels like respect to me.";

  const feelingText = "I carry emotions quietly but intensely, weigh decisions by how they affect people, and trust my inner sense of right and wrong more than cold reasoning; when something feels off, no explanation can override it, and choosing empathy and harmony isn't weakness—it's how I protect what matters most.";

  return (
    <>
      <Helmet>
        <title>Thinking vs Feeling | MBTI Personality Quiz</title>
        <meta name="description" content="Discover your decision-making style. Are you guided by logic and analysis or values and emotions? Take this MBTI personality test question." />
        <meta name="keywords" content="thinking, feeling, MBTI, personality test, decision making, logic, emotions, personality type" />
      </Helmet>

      <div className="relative h-full w-full flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
        <SciFiBackground variant="question3" />
        
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
                  step <= 3 ? "bg-accent" : "bg-muted"
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
            <span className="font-orbitron text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground uppercase tracking-widest">
              Question 3 of 4
            </span>
            <h1 className="font-orbitron text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-foreground mt-2">
              How do you make{" "}
              <span className="text-accent text-glow-magenta">decisions</span>?
            </h1>
          </motion.div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <QuizOption
              title="Thinking"
              description={thinkingText}
              onClick={() => handleSelect("T")}
              variant="left"
              delay={0.3}
            />
            <QuizOption
              title="Feeling"
              description={feelingText}
              onClick={() => handleSelect("F")}
              variant="right"
              delay={0.4}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default QuizQuestion3;
