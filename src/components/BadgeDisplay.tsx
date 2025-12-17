import { motion } from 'framer-motion';
import { BADGES } from '@/lib/mockApi';
import { Lock } from 'lucide-react';

interface BadgeDisplayProps {
  earnedBadges: string[];
  showAll?: boolean;
}

export function BadgeDisplay({ earnedBadges, showAll = false }: BadgeDisplayProps) {
  const displayBadges = showAll ? BADGES : BADGES.filter(b => earnedBadges.includes(b.id));

  if (displayBadges.length === 0 && !showAll) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-4xl mb-2">🏅</p>
        <p>Complete modules and challenges to earn badges!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {displayBadges.map((badge, index) => {
        const isEarned = earnedBadges.includes(badge.id);
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
              isEarned
                ? 'bg-gradient-to-br from-secondary to-reward/20 shadow-card'
                : 'bg-muted/50 opacity-60'
            }`}
          >
            {!isEarned && (
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <motion.span
              className={`text-4xl ${isEarned ? '' : 'grayscale'}`}
              animate={isEarned ? { 
                scale: [1, 1.1, 1],
              } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {badge.emoji}
            </motion.span>
            <span className={`text-sm font-bold text-center ${
              isEarned ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {badge.name}
            </span>
            <span className="text-xs text-muted-foreground text-center">
              {badge.description}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
