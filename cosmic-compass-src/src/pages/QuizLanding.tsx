import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SciFiBackground from "@/components/quiz/SciFiBackground";
import NeonButton from "@/components/quiz/NeonButton";

const QuizLanding = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Discover Your MBTI Personality Type | Spiritual AI Quiz</title>
        <meta name="description" content="Take our sci-fi themed MBTI personality quiz to discover your true personality type. Find out if you're INTP, ENFJ, INTJ, or one of 16 unique personality types." />
        <meta name="keywords" content="MBTI quiz, personality test, INTP, INTJ, ENFJ, INFP, personality type, spiritual AI, Myers-Briggs" />
        <link rel="canonical" href="/quiz" />
      </Helmet>

      <div className="relative h-full w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <SciFiBackground variant="landing" />

        {/* Back Button */}
        <motion.button
          onClick={() => window.location.href = "/"}
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
          className="relative z-10 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="neon-wave-container mb-2 sm:mb-4"
          >
            <div className="neon-wave-title">
              <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[120px] font-black">
                SPIRITUAL AI
              </h1>
              <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[120px] font-black">
                SPIRITUAL AI
              </h1>
            </div>
          </motion.div>
          <div className="h-[2px] w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-4 sm:mb-8" />

          {/* Subtitle */}
          <motion.p
            className="font-exo text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl text-foreground/80 mb-4 sm:mb-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            You need to answer these following{" "}
            <span className="text-neon-cyan font-bold">4 questions</span>{" "}
            to know your personality type
          </motion.p>

          {/* MBTI Types Preview */}
          <motion.div
            className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-6 sm:mb-8 px-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP",
              "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"].map((type, i) => (
                <span
                  key={type}
                  className="text-[10px] sm:text-xs lg:text-xl xl:text-2xl font-orbitron text-muted-foreground/60 px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-4 lg:py-2 border border-border/30 rounded"
                >
                  {type}
                </span>
              ))}
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <NeonButton
              variant="primary"
              onClick={() => navigate("/quiz/1")}
              className="text-base sm:text-lg lg:text-4xl px-8 py-4 sm:px-12 sm:py-5 lg:px-24 lg:py-8"
            >
              Start Quiz
            </NeonButton>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="mt-6 sm:mt-8 flex justify-center gap-2 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default QuizLanding;
