import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  label: string;
  emoji: string;
  suffix?: string;
}

export function AnimatedCounter({ 
  end, 
  duration = 2, 
  label, 
  emoji,
  suffix = '' 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2 p-6 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow"
    >
      <span className="text-4xl">{emoji}</span>
      <span className="text-3xl font-bold text-primary">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm text-muted-foreground font-medium text-center">
        {label}
      </span>
    </motion.div>
  );
}
