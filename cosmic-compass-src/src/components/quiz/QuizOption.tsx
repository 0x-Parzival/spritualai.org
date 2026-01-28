import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  title: string;
  description: string;
  onClick: () => void;
  variant?: "left" | "right";
  delay?: number;
}

const QuizOption = ({
  title,
  description,
  onClick,
  variant = "left",
  delay = 0
}: QuizOptionProps) => {
  const isLeft = variant === "left";

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative w-full p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-all duration-300",
        "text-left overflow-hidden group",
        isLeft
          ? "border-neon-cyan/50 hover:border-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan/10"
          : "border-neon-magenta/50 hover:border-neon-magenta bg-neon-magenta/5 hover:bg-neon-magenta/10"
      )}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          isLeft ? "box-glow-cyan" : "box-glow-magenta"
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <h3
          className={cn(
            "font-orbitron font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2",
            isLeft ? "text-neon-cyan" : "text-neon-magenta"
          )}
        >
          {title}
        </h3>
        <p className="text-foreground/80 text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed line-clamp-4 sm:line-clamp-none">
          {description}
        </p>
      </div>

      {/* Corner accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12",
          isLeft ? "border-r-2 border-t-2 border-neon-cyan/30" : "border-r-2 border-t-2 border-neon-magenta/30"
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12",
          isLeft ? "border-l-2 border-b-2 border-neon-cyan/30" : "border-l-2 border-b-2 border-neon-magenta/30"
        )}
      />
    </motion.button>
  );
};

export default QuizOption;
