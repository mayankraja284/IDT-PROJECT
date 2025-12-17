import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { RecyclingGame } from '@/components/games/RecyclingGame';
import { QuizRaceGame } from '@/components/games/QuizRaceGame';
import { Gamepad2, Recycle, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type GameType = 'menu' | 'recycling' | 'quiz-race';

export default function Games() {
  const [activeGame, setActiveGame] = useState<GameType>('menu');

  const games = [
    {
      id: 'recycling' as const,
      title: 'Recycling Sort',
      emoji: '♻️',
      description: 'Sort items into the correct recycling bins! Learn what goes where.',
      color: 'from-green-400 to-emerald-400',
      icon: Recycle,
    },
    {
      id: 'quiz-race' as const,
      title: 'Quiz Race',
      emoji: '⚡',
      description: 'Answer eco questions fast to earn bonus points! Race against time.',
      color: 'from-yellow-400 to-orange-400',
      icon: Zap,
    },
  ];

  if (activeGame !== 'menu') {
    return (
      <div className="min-h-screen hero-gradient">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-32 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Button variant="ghost" onClick={() => setActiveGame('menu')}>
              <ArrowLeft className="w-5 h-5" />
              Back to Games
            </Button>
          </motion.div>
          
          {activeGame === 'recycling' && <RecyclingGame />}
          {activeGame === 'quiz-race' && <QuizRaceGame />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-32 md:pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-4">
            <Gamepad2 className="w-5 h-5 text-accent" />
            <span className="font-semibold text-accent">Eco Games</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Play & Learn! 🎮
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have fun while learning about sustainability! Play games to earn 
            Eco Points and become an environmental champion! 🌟
          </p>
        </motion.div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveGame(game.id)}
              className="cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${game.color} p-1 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow`}>
                <div className="bg-card rounded-xl p-6 h-full">
                  <div className="flex items-start gap-4">
                    <motion.span
                      className="text-5xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {game.emoji}
                    </motion.span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {game.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {game.description}
                      </p>
                      <Button variant="game" size="sm">
                        <game.icon className="w-4 h-4" />
                        Play Now!
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 max-w-xl mx-auto bg-secondary/50 rounded-2xl p-6 text-center"
        >
          <span className="text-4xl block mb-3">🎯</span>
          <h3 className="font-bold text-foreground mb-2">Pro Tip!</h3>
          <p className="text-muted-foreground text-sm">
            The more you play, the more you learn! Each game teaches you real 
            skills for helping the environment. Good luck, eco hero! 🌍
          </p>
        </motion.div>
      </div>
    </div>
  );
}
