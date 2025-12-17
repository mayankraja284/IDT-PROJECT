import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RECYCLE_ITEMS, BINS, type RecycleItem } from '@/lib/gameData';
import { mockApi } from '@/lib/mockApi';
import { Sparkles, RefreshCw, Trophy } from 'lucide-react';

export function RecyclingGame() {
  const [items, setItems] = useState<RecycleItem[]>([]);
  const [currentItem, setCurrentItem] = useState<RecycleItem | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);

  const initGame = useCallback(() => {
    const shuffled = [...RECYCLE_ITEMS].sort(() => Math.random() - 0.5).slice(0, 8);
    setItems(shuffled);
    setCurrentItem(shuffled[0]);
    setScore(0);
    setMistakes(0);
    setGameOver(false);
    setFeedback(null);
    setTotalPoints(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleBinSelect = async (binId: string) => {
    if (!currentItem || feedback) return;

    const isCorrect = currentItem.bin === binId;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setTotalPoints(prev => prev + 10);
      setFeedback({ correct: true, message: 'Perfect! 🎉' });
    } else {
      setMistakes(prev => prev + 1);
      const correctBin = BINS.find(b => b.id === currentItem.bin);
      setFeedback({ 
        correct: false, 
        message: `Oops! ${currentItem.name} goes in ${correctBin?.name}! 💡` 
      });
    }

    setTimeout(() => {
      setFeedback(null);
      const currentIndex = items.indexOf(currentItem);
      
      if (currentIndex === items.length - 1) {
        setGameOver(true);
        // Save points
        mockApi.addGamePoints(totalPoints + (isCorrect ? 10 : 0));
      } else {
        setCurrentItem(items[currentIndex + 1]);
      }
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ♻️ Recycling Sort
        </h2>
        <p className="text-muted-foreground">
          Drag items to the correct bin! Learn proper recycling!
        </p>
      </motion.div>

      {/* Score Display */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="bg-card rounded-xl px-4 py-2 shadow-card">
          <span className="text-sm text-muted-foreground">Score: </span>
          <span className="font-bold text-primary">{score}/{items.length}</span>
        </div>
        <div className="bg-card rounded-xl px-4 py-2 shadow-card">
          <span className="text-sm text-muted-foreground">Points: </span>
          <span className="font-bold text-reward">{totalPoints}</span>
        </div>
      </div>

      {!gameOver ? (
        <>
          {/* Current Item */}
          <motion.div
            key={currentItem?.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-8 shadow-card mb-6 text-center"
          >
            <motion.span
              className="text-7xl block mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {currentItem?.emoji}
            </motion.span>
            <h3 className="text-xl font-bold text-foreground">{currentItem?.name}</h3>
            <p className="text-muted-foreground">Click the correct bin below!</p>
          </motion.div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-center p-4 rounded-xl mb-6 ${
                  feedback.correct 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-destructive/20 text-destructive'
                }`}
              >
                <span className="font-bold">{feedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bins */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BINS.map((bin) => (
              <motion.button
                key={bin.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBinSelect(bin.id)}
                disabled={!!feedback}
                className={`${bin.color} text-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all`}
              >
                <span className="text-3xl block mb-2">{bin.emoji}</span>
                <span className="font-bold">{bin.name}</span>
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        /* Game Over */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl p-8 shadow-card text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6 }}
            className="text-7xl mb-6"
          >
            {score >= items.length * 0.7 ? '🏆' : '💪'}
          </motion.div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {score >= items.length * 0.7 ? 'Great Job!' : 'Good Try!'}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            You sorted {score} out of {items.length} items correctly!
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-xl font-bold text-primary">
                <Sparkles className="w-5 h-5" />
                +{totalPoints}
              </div>
              <span className="text-sm text-muted-foreground">Points Earned</span>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="flex items-center gap-1 text-xl font-bold text-reward">
                <Trophy className="w-5 h-5" />
                {Math.round((score / items.length) * 100)}%
              </div>
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </div>
          </div>

          <Button variant="hero" onClick={initGame}>
            <RefreshCw className="w-5 h-5" />
            Play Again
          </Button>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        <p>💡 Tip: Paper, cardboard → Paper bin | Bottles, bags → Plastic bin</p>
        <p>Cans, foil → Metal bin | Food scraps → Organic bin</p>
      </motion.div>
    </div>
  );
}
