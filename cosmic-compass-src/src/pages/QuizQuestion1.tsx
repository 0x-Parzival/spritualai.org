import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SciFiBackground from "@/components/quiz/SciFiBackground";
import QuizOption from "@/components/quiz/QuizOption";

interface QuizQuestion1Props {
  onAnswer: (value: string) => void;
}

const QuizQuestion1 = ({ onAnswer }: QuizQuestion1Props) => {
  const navigate = useNavigate();

  const handleSelect = (value: "I" | "E") => {
    onAnswer(value);
    navigate("/quiz/2");
  };

  const introversionText = "I don't hate people, I just get tired of being around them; I replay conversations in my head long after they end, find comfort in silence, cancel plans when my energy runs out without knowing how to explain it, and feel things deeply but quietly—crowds drain me, small talk exhausts me, yet one honest conversation or a calm presence can keep me there longer than anyone else, because I'm not shy or broken, I'm simply wired to live more in my inner world than the loud one outside, and that world is full.";

  const extraversionText = "I don't chase people for validation, I chase connection; silence makes me restless, energy multiplies when it's shared, my thoughts become clearer when spoken out loud, and being around others fuels me rather than drains me—crowds excite me, conversations spark ideas, laughter resets my mood, and even strangers feel like potential stories, because I'm not shallow or attention-hungry, I'm simply wired to live outwardly, where connection, expression, and shared moments make life feel fully alive.";

  return (
    <>
      <Helmet>
        <title>Introversion vs Extroversion | MBTI Personality Quiz</title>
        <meta name="description" content="Discover whether you're an introvert or extrovert. Take this MBTI personality test question to understand your energy source and social preferences." />
        <meta name="keywords" content="introvert, extrovert, MBTI, personality test, introversion, extroversion, personality type" />
      </Helmet>

      <div className="relative h-full w-full flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
        <SciFiBackground variant="question1" />
        
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
                  step === 1 ? "bg-neon-cyan" : "bg-muted"
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
              Question 1 of 4
            </span>
            <h1 className="font-orbitron text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mt-2">
              To which text do you{" "}
              <span className="text-neon-cyan text-glow-cyan">relate</span> to most?
            </h1>
          </motion.div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <QuizOption
              title="Introversion"
              description={introversionText}
              onClick={() => handleSelect("I")}
              variant="left"
              delay={0.3}
            />
            <QuizOption
              title="Extroversion"
              description={extraversionText}
              onClick={() => handleSelect("E")}
              variant="right"
              delay={0.4}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default QuizQuestion1;
