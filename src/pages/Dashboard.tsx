import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { Progress } from '@/components/ui/progress';
import { mockApi, type UserProgress, BADGES } from '@/lib/mockApi';
import { MODULES } from '@/lib/gameData';
import { 
  LayoutDashboard, 
  Star, 
  Trophy, 
  Target, 
  Flame,
  Leaf,
  Droplet,
  Zap,
  TreeDeciduous
} from 'lucide-react';

export default function Dashboard() {
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

  if (loading || !userProgress) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          🌱
        </motion.div>
      </div>
    );
  }

  const completedModulesCount = userProgress.completedModules.length;
  const totalModules = MODULES.length;
  const totalBadges = BADGES.length;
  const earnedBadges = userProgress.badges.length;

  const motivationalMessages = [
    "You're doing amazing! Keep it up! 🌟",
    "Every eco-action counts! 🌍",
    "You're a planet protector! 🦸",
    "Nature thanks you! 🌿",
    "Keep being awesome! 💪",
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

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
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Your Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome, {userProgress.name}! 👋
          </h1>
          <p className="text-muted-foreground">{randomMessage}</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-card rounded-2xl p-5 shadow-card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{userProgress.points}</div>
            <div className="text-sm text-muted-foreground">Eco Points</div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-reward/10 rounded-full mb-3">
              <Trophy className="w-6 h-6 text-reward" />
            </div>
            <div className="text-2xl font-bold text-foreground">{earnedBadges}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">{completedModulesCount}/{totalModules}</div>
            <div className="text-sm text-muted-foreground">Modules Done</div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full mb-3">
              <Flame className="w-6 h-6 text-destructive" />
            </div>
            <div className="text-2xl font-bold text-foreground">{userProgress.streakDays}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-card mb-8"
        >
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            Learning Progress
          </h2>
          
          <div className="space-y-4">
            {MODULES.map((module, index) => {
              const isCompleted = userProgress.completedModules.includes(module.id);
              const score = userProgress.moduleScores[module.id] || 0;
              const progress = isCompleted ? 100 : (score / 4) * 100;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{module.emoji}</span>
                      <span className="font-semibold text-foreground">{module.title}</span>
                    </div>
                    <span className={`text-sm font-bold ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                      {isCompleted ? '✅ Complete' : `${score}/4`}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Eco Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-foreground mb-6">
            🌍 Your Eco Impact
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-card rounded-full shadow-card mb-2">
                <TreeDeciduous className="w-7 h-7 text-primary" />
              </div>
              <div className="text-xl font-bold text-foreground">{userProgress.treesPlanted}</div>
              <div className="text-xs text-muted-foreground">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-card rounded-full shadow-card mb-2">
                <Droplet className="w-7 h-7 text-accent" />
              </div>
              <div className="text-xl font-bold text-foreground">{userProgress.plasticReduced}</div>
              <div className="text-xs text-muted-foreground">Plastic Reduced</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-card rounded-full shadow-card mb-2">
                <Zap className="w-7 h-7 text-reward" />
              </div>
              <div className="text-xl font-bold text-foreground">{userProgress.energySaved}</div>
              <div className="text-xs text-muted-foreground">Energy Saved</div>
            </div>
          </div>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              🏅 Your Badges
            </h2>
            <span className="text-sm text-muted-foreground">
              {earnedBadges}/{totalBadges} Unlocked
            </span>
          </div>
          
          <BadgeDisplay earnedBadges={userProgress.badges} showAll />
        </motion.div>
      </div>
    </div>
  );
}
