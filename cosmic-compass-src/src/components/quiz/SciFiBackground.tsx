import { motion } from "framer-motion";

interface SciFiBackgroundProps {
  variant?: "landing" | "question1" | "question2" | "question3" | "question4" | "result";
}

const SciFiBackground = ({ variant = "landing" }: SciFiBackgroundProps) => {
  const getGradient = () => {
    switch (variant) {
      case "landing":
        return "from-background via-purple-950/20 to-background";
      case "question1":
        return "from-background via-blue-950/30 to-background";
      case "question2":
        return "from-background via-cyan-950/30 to-background";
      case "question3":
        return "from-background via-pink-950/30 to-background";
      case "question4":
        return "from-background via-indigo-950/30 to-background";
      case "result":
        return "from-background via-purple-900/40 to-background";
      default:
        return "from-background via-purple-950/20 to-background";
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()}`} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-glow" />
      
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-neon-cyan"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"
        animate={{
          top: ["-10%", "110%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-32 sm:h-32 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 border-r-2 border-b-2 border-primary/30" />
    </div>
  );
};

export default SciFiBackground;
