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

      <div className="relative h-[100dvh] w-full flex flex-col items-center justify-between p-4 sm:justify-center sm:h-full sm:p-6 overflow-hidden">
        <SciFiBackground variant="landing" />

        <motion.div
          className="relative z-10 text-center max-w-2xl mx-auto flex flex-col h-full justify-around sm:justify-center sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-2 mb-4 sm:mb-12 mt-8 sm:mt-0"
          >
            <div className="neon-wave-container transform scale-75 sm:scale-100">
              <div className="neon-wave-title text-center">
                <h1 className="font-orbitron text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black">
                  <span className="block text-primary">SPIRITUAL</span>
                  <span className="block text-secondary mt-1 sm:mt-2">AI</span>
                </h1>
                <h1 className="font-orbitron text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black" aria-hidden="true">
                  <span className="block text-primary">SPIRITUAL</span>
                  <span className="block text-secondary mt-1 sm:mt-2">AI</span>
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="font-exo text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-foreground/80 mb-4 sm:mb-12 px-4 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            You need to answer these following{" "}
            <span className="text-neon-cyan font-bold">4 questions</span>{" "}
            to know your personality type
          </motion.p>

          <div className="flex flex-col gap-2 sm:gap-0">
            {/* MBTI Types Preview - Row 1 */}
            <motion.div
              className="grid grid-cols-4 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 mb-2 sm:mb-4 px-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP"].map((type) => (
                <span
                  key={type}
                  className="text-xs sm:text-base lg:text-lg xl:text-xl font-orbitron text-muted-foreground/60 px-1 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 border border-border/30 rounded"
                >
                  {type}
                </span>
              ))}
            </motion.div>

            {/* MBTI Types Preview - Row 2 */}
            <motion.div
              className="grid grid-cols-4 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {["ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"].map((type) => (
                <span
                  key={type}
                  className="text-xs sm:text-base lg:text-lg xl:text-xl font-orbitron text-muted-foreground/60 px-1 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 border border-border/30 rounded"
                >
                  {type}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Start Button */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-8 sm:mb-0"
          >
            <NeonButton
              variant="primary"
              onClick={() => navigate("/quiz/1")}
              className="text-lg sm:text-2xl lg:text-3xl px-10 py-5 sm:px-16 sm:py-8 w-full sm:w-auto"
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
