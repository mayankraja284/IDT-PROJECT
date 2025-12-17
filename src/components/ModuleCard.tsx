import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ModuleCardProps {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  isCompleted: boolean;
  score?: number;
  index: number;
}

export function ModuleCard({
  id,
  title,
  emoji,
  description,
  color,
  isCompleted,
  score,
  index,
}: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/learn/${id}`}
        className="block group"
      >
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-1 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]`}>
          <div className="bg-card rounded-xl p-6">
            {/* Emoji & Status */}
            <div className="flex items-start justify-between mb-4">
              <motion.span
                className="text-5xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {emoji}
              </motion.span>
              {isCompleted ? (
                <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Done!</span>
                </div>
              ) : null}
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {description}
            </p>

            {/* Progress or Start */}
            {isCompleted && score !== undefined ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Best Score</span>
                  <span className="font-bold text-primary">{score}/4</span>
                </div>
                <Progress value={(score / 4) * 100} className="h-2" />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-primary font-semibold">
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
