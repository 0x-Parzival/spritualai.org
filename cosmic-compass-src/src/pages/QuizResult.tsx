import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SciFiBackground from "@/components/quiz/SciFiBackground";
import FirecrackerAnimation from "@/components/quiz/FirecrackerAnimation";
import NeonButton from "@/components/quiz/NeonButton";

const mbtiDescriptions: Record<string, { title: string; subtitle: string }> = {
  INTP: { title: "The Logician", subtitle: "Innovative inventors with an unquenchable thirst for knowledge" },
  INTJ: { title: "The Architect", subtitle: "Imaginative and strategic thinkers with a plan for everything" },
  ENTJ: { title: "The Commander", subtitle: "Bold, imaginative and strong-willed leaders" },
  ENTP: { title: "The Debater", subtitle: "Smart and curious thinkers who cannot resist an intellectual challenge" },
  INFJ: { title: "The Advocate", subtitle: "Quiet and mystical, yet very inspiring and tireless idealists" },
  INFP: { title: "The Mediator", subtitle: "Poetic, kind and altruistic people, always eager to help a good cause" },
  ENFJ: { title: "The Protagonist", subtitle: "Charismatic and inspiring leaders, able to mesmerize their listeners" },
  ENFP: { title: "The Campaigner", subtitle: "Enthusiastic, creative and sociable free spirits" },
  ISTJ: { title: "The Logistician", subtitle: "Practical and fact-minded individuals, whose reliability cannot be doubted" },
  ISFJ: { title: "The Defender", subtitle: "Very dedicated and warm protectors, always ready to defend their loved ones" },
  ESTJ: { title: "The Executive", subtitle: "Excellent administrators, unsurpassed at managing things or people" },
  ESFJ: { title: "The Consul", subtitle: "Extraordinarily caring, social and popular people" },
  ISTP: { title: "The Virtuoso", subtitle: "Bold and practical experimenters, masters of all kinds of tools" },
  ISFP: { title: "The Adventurer", subtitle: "Flexible and charming artists, always ready to explore something new" },
  ESTP: { title: "The Entrepreneur", subtitle: "Smart, energetic and very perceptive people" },
  ESFP: { title: "The Entertainer", subtitle: "Spontaneous, energetic and enthusiastic people" },
};

const QuizResult = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [showFirecrackers, setShowFirecrackers] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  const mbtiType = type?.toUpperCase() || "INTP";
  const description = mbtiDescriptions[mbtiType] || mbtiDescriptions.INTP;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirecrackers(false);
      setAnimationComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // SEO meta content based on personality type
  const getSEOMeta = () => {
    const seoContent: Record<string, { description: string; keywords: string }> = {
      INTP: {
        description: "You are INTP - The Logician! Discover how to master focus, hack social dynamics, learn skills rapidly, find your life purpose, and automate income with your analytical mind.",
        keywords: "INTP personality, logician, analytical thinker, focus mastery, skill acquisition, life purpose, automation, MBTI INTP"
      },
      INTJ: {
        description: "You are INTJ - The Architect! Learn to systemize your life, think strategically, achieve top competence, win arguments with logic, and build a global business solo.",
        keywords: "INTJ personality, architect, strategic thinker, life system, competence, logical arguments, solo business, MBTI INTJ"
      },
      ENTJ: {
        description: "You are ENTJ - The Commander! Build your empire, execute rapidly, outmaneuver competitors, command any room, and ensure your vision survives.",
        keywords: "ENTJ personality, commander, empire builder, execution, competition, leadership, vision, MBTI ENTJ"
      },
      ENTP: {
        description: "You are ENTP - The Debater! Generate million-dollar ideas, master persuasion, thrive in uncertainty, bypass career ladders, and monetize your hobbies.",
        keywords: "ENTP personality, debater, idea generation, persuasion, uncertainty, career acceleration, hobby monetization, MBTI ENTP"
      },
      INFJ: {
        description: "You are INFJ - The Advocate! Stop absorbing emotions, build a coaching business, find your soul's career, change the world quietly, and manifest reality.",
        keywords: "INFJ personality, advocate, emotional boundaries, coaching, soul career, world change, manifestation, MBTI INFJ"
      },
      INFP: {
        description: "You are INFP - The Mediator! Monetize your art, get things done your way, heal through story, keep your heart open, and access the muse on command.",
        keywords: "INFP personality, mediator, art monetization, productivity, storytelling, open heart, creativity, MBTI INFP"
      },
      ENFJ: {
        description: "You are ENFJ - The Protagonist! Lead powerful movements, build a tribe, set healthy boundaries, read people deeply, and speak mesmerizingly.",
        keywords: "ENFJ personality, protagonist, leadership, community building, boundaries, emotional intelligence, public speaking, MBTI ENFJ"
      },
      ENFP: {
        description: "You are ENFP - The Campaigner! Finish projects, become super connected, tell viral stories, work without losing spark, and find your true people.",
        keywords: "ENFP personality, campaigner, project completion, networking, storytelling, work-life balance, authentic connections, MBTI ENFP"
      },
      ISTJ: {
        description: "You are ISTJ - The Logistician! Build an ordered life, organize digitally, build wealth safely, become unstoppable through habits, and never forget anything.",
        keywords: "ISTJ personality, logistician, life organization, digital management, wealth building, habit stacking, memory, MBTI ISTJ"
      },
      ISFJ: {
        description: "You are ISFJ - The Defender! Create a healing home, care without burnout, organize family life, get recognized, and build lasting memories.",
        keywords: "ISFJ personality, defender, healing home, self-care, family organization, recognition, memory building, MBTI ISFJ"
      },
      ESTJ: {
        description: "You are ESTJ - The Executive! Master administration, lead with authority, and create systems that work efficiently.",
        keywords: "ESTJ personality, executive, administration, leadership, systems, efficiency, MBTI ESTJ"
      },
      ESFJ: {
        description: "You are ESFJ - The Consul! Build caring communities, support others effectively, and create harmony in every environment.",
        keywords: "ESFJ personality, consul, community, caring, support, harmony, MBTI ESFJ"
      },
      ISTP: {
        description: "You are ISTP - The Virtuoso! Master practical skills, experiment boldly, and solve problems with hands-on expertise.",
        keywords: "ISTP personality, virtuoso, practical skills, experimentation, problem solving, hands-on, MBTI ISTP"
      },
      ISFP: {
        description: "You are ISFP - The Adventurer! Express yourself artistically, explore new experiences, and live authentically.",
        keywords: "ISFP personality, adventurer, artistic expression, exploration, authenticity, MBTI ISFP"
      },
      ESTP: {
        description: "You are ESTP - The Entrepreneur! Take bold action, read situations quickly, and thrive in dynamic environments.",
        keywords: "ESTP personality, entrepreneur, bold action, perception, dynamic, MBTI ESTP"
      },
      ESFP: {
        description: "You are ESFP - The Entertainer! Bring joy to others, live in the moment, and create unforgettable experiences.",
        keywords: "ESFP personality, entertainer, joy, present moment, experiences, MBTI ESFP"
      },
    };
    return seoContent[mbtiType] || seoContent.INTP;
  };

  const seo = getSEOMeta();

  return (
    <>
      <Helmet>
        <title>{mbtiType} Personality Type - {description.title} | Spiritual AI</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={`/result/${mbtiType}`} />
      </Helmet>

      <div className="relative h-full w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
        <SciFiBackground variant="result" />
        <FirecrackerAnimation 
          isActive={showFirecrackers} 
          onComplete={() => setAnimationComplete(true)} 
        />
        
        {/* Glass card container */}
        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Premium glass card */}
          <div className="relative p-6 sm:p-10 md:p-12 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/20 to-transparent rotate-12 opacity-50" />
            </div>
            
            {/* Result announcement */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative z-10"
            >
              <span className="font-orbitron text-xs sm:text-sm lg:text-base xl:text-lg text-foreground/60 uppercase tracking-[0.3em] font-medium">
                Your Personality Type Is
              </span>
            </motion.div>

            {/* MBTI Type - Large Display with enhanced glow */}
            <motion.h1
              className="font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black my-4 sm:my-6 relative z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 1,
                type: "spring",
                stiffness: 200
              }}
            >
              {mbtiType.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className={`inline-block drop-shadow-[0_0_30px_currentColor] ${
                    i === 0 ? "text-neon-cyan" :
                    i === 1 ? "text-secondary" :
                    i === 2 ? "text-accent" :
                    "text-primary"
                  }`}
                  style={{
                    textShadow: i === 0 ? '0 0 20px hsl(180 100% 50%), 0 0 40px hsl(180 100% 50% / 0.5), 0 0 60px hsl(180 100% 50% / 0.3)' :
                               i === 1 ? '0 0 20px hsl(180 100% 50%), 0 0 40px hsl(180 100% 50% / 0.5), 0 0 60px hsl(180 100% 50% / 0.3)' :
                               i === 2 ? '0 0 20px hsl(320 100% 60%), 0 0 40px hsl(320 100% 60% / 0.5), 0 0 60px hsl(320 100% 60% / 0.3)' :
                               '0 0 20px hsl(280 100% 60%), 0 0 40px hsl(280 100% 60% / 0.5), 0 0 60px hsl(280 100% 60% / 0.3)'
                  }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Separator line with gradient */}
            <motion.div 
              className="w-24 sm:w-32 h-[2px] mx-auto mb-4 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            />

            {/* Type name and description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="relative z-10"
            >
              <h2 className="font-orbitron text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-primary mb-2 tracking-wide drop-shadow-[0_0_10px_hsl(280_100%_60%_/_0.5)]">
                {description.title}
              </h2>
              <p className="font-exo text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-foreground/70 max-w-md lg:max-w-lg mx-auto px-2 leading-relaxed">
                {description.subtitle}
              </p>
            </motion.div>

            {/* Retake button */}
            <motion.div
              className="mt-5 sm:mt-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <NeonButton
                variant="secondary"
                onClick={() => navigate("/quiz")}
                className="backdrop-blur-sm bg-white/5 border-white/30 hover:bg-white/10"
              >
                Retake Quiz
              </NeonButton>
            </motion.div>
          </div>

          {/* Floating decorative orbs */}
          <motion.div
            className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary/30 to-transparent backdrop-blur-sm border border-white/10"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tl from-secondary/20 to-transparent backdrop-blur-sm border border-white/10"
            animate={{ 
              rotate: -360,
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute top-1/2 -right-8 sm:-right-12 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-l from-accent/25 to-transparent backdrop-blur-sm border border-white/10"
            animate={{ 
              y: [-10, 10, -10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </>
  );
};

export default QuizResult;
