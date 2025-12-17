import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Mascot } from '@/components/Mascot';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { DailyChallenge } from '@/components/DailyChallenge';
import { mockApi, type UserProgress, type DailyChallenge as DailyChallengeType } from '@/lib/mockApi';
import { ArrowRight, BookOpen, Gamepad2, Sparkles } from 'lucide-react';

const Index = () => {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallengeType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [progress, challenge] = await Promise.all([
        mockApi.getUserProgress(),
        mockApi.getDailyChallenge(),
      ]);
      setUserProgress(progress);
      setDailyChallenge(challenge);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleCompleteChallenge = async () => {
    if (!dailyChallenge) return;
    const { progress } = await mockApi.completeDailyChallenge(
      dailyChallenge.id,
      dailyChallenge.points
    );
    setUserProgress(progress);
  };

  const isChallengeCompleted = userProgress?.dailyChallengesCompleted.includes(
    dailyChallenge?.id || ''
  );

  return (
    <div className="min-h-screen hero-gradient">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Learn & Play for the Planet!</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                🌱 Learn to Save the Planet –
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">One Fun Step at a Time!</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Join thousands of eco-kids on an exciting adventure to learn about 
                recycling, saving energy, and protecting our beautiful Earth! 🌍
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/learn">
                    <BookOpen className="w-6 h-6" />
                    Start Learning
                  </Link>
                </Button>
                <Button variant="game" size="xl" asChild>
                  <Link to="/games">
                    <Gamepad2 className="w-6 h-6" />
                    Play Eco Games
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right - Mascot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <Mascot 
                size="lg" 
                message={loading ? "Loading..." : `Welcome, Eco Explorer! 🎉`} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Our Eco Impact Together! 🌟
            </h2>
            <p className="text-muted-foreground">
              Every action counts - see what we've achieved!
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimatedCounter
              end={(userProgress?.treesPlanted || 0) + 12847}
              label="Trees Planted"
              emoji="🌳"
              duration={2}
            />
            <AnimatedCounter
              end={(userProgress?.plasticReduced || 0) + 5234}
              label="Plastic Items Reduced"
              emoji="♻️"
              suffix=" kg"
              duration={2.2}
            />
            <AnimatedCounter
              end={(userProgress?.energySaved || 0) + 98765}
              label="Energy Points Saved"
              emoji="⚡"
              duration={2.4}
            />
          </div>
        </div>
      </section>

      {/* Daily Challenge Section */}
      {dailyChallenge && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <DailyChallenge
                challenge={dailyChallenge}
                isCompleted={isChallengeCompleted || false}
                onComplete={handleCompleteChallenge}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Modules Preview */}
      <section className="py-12 px-4 pb-32 md:pb-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              What Will You Learn? 📚
            </h2>
            <p className="text-muted-foreground">
              Exciting topics waiting for you!
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { emoji: '🌍', title: 'Climate', color: 'from-blue-400 to-green-400' },
              { emoji: '♻️', title: 'Recycling', color: 'from-green-400 to-emerald-400' },
              { emoji: '💧', title: 'Water & Energy', color: 'from-cyan-400 to-blue-400' },
              { emoji: '🌱', title: 'Green Habits', color: 'from-green-400 to-lime-400' },
            ].map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${module.color} p-1 rounded-2xl shadow-card`}
              >
                <div className="bg-card rounded-xl p-4 text-center h-full">
                  <span className="text-4xl block mb-2">{module.emoji}</span>
                  <span className="font-bold text-foreground text-sm">{module.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8"
          >
            <Button variant="outline" size="lg" asChild>
              <Link to="/learn">
                Explore All Modules
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
