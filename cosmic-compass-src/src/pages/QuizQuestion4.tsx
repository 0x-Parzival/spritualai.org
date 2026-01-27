import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SciFiBackground from "@/components/quiz/SciFiBackground";
import QuizOption from "@/components/quiz/QuizOption";

interface QuizQuestion4Props {
  onAnswer: (value: string) => void;
  getMBTIType: () => string | null;
}

const QuizQuestion4 = ({ onAnswer, getMBTIType }: QuizQuestion4Props) => {
  const navigate = useNavigate();

  const handleSelect = (value: "J" | "P") => {
    onAnswer(value);
    // We need to manually construct the type since state update is async
    setTimeout(() => {
      const type = getMBTIType();
      if (type) {
        // The type won't include the last answer yet, so we need to get the current answers
        // and append the new one
        navigate(`/result/${type.slice(0, 3)}${value}`);
      }
    }, 0);
  };

  const judgingText = "I relax when plans are made, expectations are clear, and things are settled; loose ends occupy my mind, sudden changes throw me off balance, and finishing tasks feels grounding—not because I need control, but because structure gives my thoughts room to rest.";

  const perceivingText = "I function best with freedom to respond in the moment, follow curiosity, and adjust as things unfold; strict schedules drain me, deadlines feel abstract until they're urgent, and I trust momentum over planning—structure can come later, but inspiration has a short lifespan.";

  return (
    <>
      <Helmet>
        <title>Judging vs Perceiving | MBTI Personality Quiz</title>
        <meta name="description" content="Discover your lifestyle preference. Do you prefer structure and planning or flexibility and spontaneity? Final MBTI personality test question." />
        <meta name="keywords" content="judging, perceiving, MBTI, personality test, lifestyle, planning, flexibility, personality type" />
      </Helmet>

      <div className="relative h-full w-full flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
        <SciFiBackground variant="question4" />

        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-foreground/70 hover:text-neon-cyan transition-colors font-orbitron text-sm sm:text-base lg:text-3xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className="uppercase tracking-widest">Back</span>
        </motion.button>

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
                className="w-8 sm:w-12 lg:w-32 h-1 lg:h-3 rounded-full bg-primary"
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
            <span className="font-orbitron text-xs sm:text-sm lg:text-2xl xl:text-3xl text-muted-foreground uppercase tracking-widest text-glow-purple">
              Question 4 of 4
            </span>
            <h1 className="font-orbitron text-lg sm:text-xl md:text-2xl lg:text-5xl xl:text-6xl font-black text-foreground mt-2 sm:mt-6">
              How do you approach{" "}
              <span className="text-primary text-glow-purple">life</span>?
            </h1>
          </motion.div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <QuizOption
              title="Judging"
              description={judgingText}
              onClick={() => handleSelect("J")}
              variant="left"
              delay={0.3}
            />
            <QuizOption
              title="Perceiving"
              description={perceivingText}
              onClick={() => handleSelect("P")}
              variant="right"
              delay={0.4}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default QuizQuestion4;
