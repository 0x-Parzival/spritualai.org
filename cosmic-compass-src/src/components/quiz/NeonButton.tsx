import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "cyan" | "magenta";
  className?: string;
  disabled?: boolean;
}

const NeonButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className,
  disabled = false 
}: NeonButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "border-primary bg-primary/10 text-primary hover:bg-primary/20 box-glow-purple";
      case "secondary":
        return "border-secondary bg-secondary/10 text-secondary hover:bg-secondary/20 box-glow-cyan";
      case "cyan":
        return "border-neon-cyan bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 box-glow-cyan";
      case "magenta":
        return "border-neon-magenta bg-neon-magenta/10 text-neon-magenta hover:bg-neon-magenta/20 box-glow-magenta";
      default:
        return "border-primary bg-primary/10 text-primary hover:bg-primary/20 box-glow-purple";
    }
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative px-6 py-3 sm:px-8 sm:py-4 font-orbitron font-bold text-sm sm:text-base uppercase tracking-wider",
        "border-2 rounded-lg transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        getVariantClasses(),
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-50"
        animate={{
          boxShadow: [
            "0 0 20px currentColor",
            "0 0 40px currentColor",
            "0 0 20px currentColor",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default NeonButton;
