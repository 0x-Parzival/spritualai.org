import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  velocity: number;
}

interface FirecrackerAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
}

const FirecrackerAnimation = ({ isActive, onComplete }: FirecrackerAnimationProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const colors = [
      "hsl(180, 100%, 50%)", // cyan
      "hsl(320, 100%, 60%)", // magenta
      "hsl(280, 100%, 60%)", // purple
      "hsl(60, 100%, 50%)",  // yellow
      "hsl(0, 100%, 60%)",   // red
      "hsl(120, 100%, 50%)", // green
    ];

    const createExplosion = (centerX: number, centerY: number, count: number) => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: Date.now() + i + Math.random(),
          x: centerX,
          y: centerY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 8,
          angle: (Math.PI * 2 * i) / count + Math.random() * 0.3,
          velocity: 100 + Math.random() * 200,
        });
      }
      return newParticles;
    };

    // Create multiple explosions at random positions
    const allParticles: Particle[] = [];
    const explosionCount = 8;
    
    for (let e = 0; e < explosionCount; e++) {
      setTimeout(() => {
        const x = 20 + Math.random() * 60;
        const y = 20 + Math.random() * 60;
        setParticles(prev => [...prev, ...createExplosion(x, y, 20)]);
      }, e * 200);
    }

    // Clear particles and call onComplete after 3 seconds
    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  if (!isActive && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos(particle.angle) * particle.velocity,
              y: Math.sin(particle.angle) * particle.velocity + 50,
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Sparkle effects */}
      <AnimatePresence>
        {isActive && [...Array(30)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-2xl sm:text-4xl"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
              rotate: 180,
            }}
            transition={{
              duration: 0.8,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FirecrackerAnimation;
