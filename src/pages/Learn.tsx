import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ModuleCard } from '@/components/ModuleCard';
import { MODULES } from '@/lib/gameData';
import { mockApi, type UserProgress } from '@/lib/mockApi';
import { BookOpen, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function Learn() {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      const progress = await mockApi.getUserProgress();
      setUserProgress(progress);
      setLoading(false);
    };
    loadProgress();
  }, []);

  const completedCount = userProgress?.completedModules.length || 0;
  const totalCount = MODULES.length;
  const progressPercent = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen hero-gradient">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-32 md:pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Learning Modules</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Adventure! 🚀
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each module teaches you something amazing about saving our planet. 
            Complete quizzes to earn points and unlock badges!
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-12 bg-card rounded-2xl p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-reward" />
              <span className="font-bold text-foreground">Your Progress</span>
            </div>
            <span className="text-sm font-semibold text-primary">
              {completedCount}/{totalCount} Completed
            </span>
          </div>
          <Progress value={progressPercent} className="h-3" />
          {completedCount === totalCount && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-3 text-sm font-semibold text-primary"
            >
              🎉 Amazing! You've completed all modules!
            </motion.p>
          )}
        </motion.div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {MODULES.map((module, index) => (
            <ModuleCard
              key={module.id}
              id={module.id}
              title={module.title}
              emoji={module.emoji}
              description={module.description}
              color={module.color}
              isCompleted={userProgress?.completedModules.includes(module.id) || false}
              score={userProgress?.moduleScores[module.id]}
              index={index}
            />
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto bg-secondary/50 rounded-2xl p-6 text-center"
        >
          <span className="text-4xl mb-4 block">💡</span>
          <h3 className="font-bold text-foreground mb-2">Learning Tip!</h3>
          <p className="text-muted-foreground text-sm">
            Score 70% or higher on quizzes to complete a module. Get 100% to earn 
            the "Quiz Whiz" badge! Take your time and learn something new! 🌟
          </p>
        </motion.div>
      </div>
    </div>
  );
}
