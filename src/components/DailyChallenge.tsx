import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import type { DailyChallenge as DailyChallengeType } from '@/lib/mockApi';

interface DailyChallengeProps {
  challenge: DailyChallengeType;
  isCompleted: boolean;
  onComplete: () => void;
}

export function DailyChallenge({ challenge, isCompleted, onComplete }: DailyChallengeProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    setShowConfetti(true);
    onComplete();
    setTimeout(() => setShowConfetti(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-br from-secondary to-reward/20 rounded-2xl p-6 shadow-card"
    >
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  x: '50%',
                  y: '50%',
                }}
                animate={{
                  opacity: 0,
                  x: `${Math.random() * 100}%`,
                  y: `${-Math.random() * 100}%`,
                  rotate: Math.random() * 720,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute text-2xl"
              >
                {['⭐', '🌟', '✨', '🎉'][i % 4]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-start gap-4">
        <motion.span
          className="text-5xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {challenge.emoji}
        </motion.span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-reward uppercase tracking-wide">
              Daily Challenge
            </span>
            <Sparkles className="w-4 h-4 text-reward" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            {challenge.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {challenge.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-sm font-bold text-primary">
              +{challenge.points} Points 🌟
            </span>
            {isCompleted ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
                <Check className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">Completed!</span>
              </div>
            ) : (
              <Button
                variant="reward"
                size="sm"
                onClick={handleComplete}
              >
                I Did It! 🎉
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
