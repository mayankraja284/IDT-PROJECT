import { motion } from 'framer-motion';

interface MascotProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function Mascot({ message, size = 'md', animate = true }: MascotProps) {
  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className={sizeClasses[size]}
        animate={animate ? {
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        } : undefined}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🌱
      </motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card rounded-2xl px-6 py-3 shadow-card max-w-xs text-center"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card rotate-45" />
          <p className="relative text-foreground font-medium">{message}</p>
        </motion.div>
      )}
    </div>
  );
}
