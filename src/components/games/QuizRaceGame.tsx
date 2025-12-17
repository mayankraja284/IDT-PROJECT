import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QUIZ_RACE_QUESTIONS } from '@/lib/gameData';
import { mockApi } from '@/lib/mockApi';
import { Sparkles, RefreshCw, Trophy, Timer, Zap } from 'lucide-react';

export function QuizRaceGame() {
  const [questions, setQuestions] = useState<typeof QUIZ_RACE_QUESTIONS>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [totalPoints, setTotalPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null);
  const [streak, setStreak] = useState(0);

  const initGame = useCallback(() => {
    const shuffled = [...QUIZ_RACE_QUESTIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(10);
    setTotalPoints(0);
    setGameOver(false);
    setFeedback(null);
    setStreak(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer
  useEffect(() => {
    if (gameOver || feedback) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, gameOver, feedback]);

  const handleTimeout = () => {
    setStreak(0);
    setFeedback({ correct: false });
    
    setTimeout(() => {
      moveToNext();
    }, 1000);
  };

  const moveToNext = () => {
    setFeedback(null);
    if (currentIndex >= questions.length - 1) {
      setGameOver(true);
      mockApi.addGamePoints(totalPoints);
    } else {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(10);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    if (feedback) return;

    const isCorrect = selectedIndex === questions[currentIndex].correctIndex;
    
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft * 2);
      const streakBonus = streak >= 2 ? 5 : 0;
      const points = 10 + timeBonus + streakBonus;
      
      setScore(prev => prev + 1);
      setTotalPoints(prev => prev + points);
      setStreak(prev => prev + 1);
      setFeedback({ correct: true });
    } else {
      setStreak(0);
      setFeedback({ correct: false });
    }

    setTimeout(() => {
      moveToNext();
    }, 1000);
  };

  const currentQuestion = questions[currentIndex];
  const timerPercent = (timeLeft / 10) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ⚡ Quiz Race
        </h2>
        <p className="text-muted-foreground">
          Answer fast to earn bonus points! Beat the clock!
        </p>
      </motion.div>

      {/* Stats Bar */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="bg-card rounded-xl px-4 py-2 shadow-card flex items-center gap-2">
          <Trophy className="w-4 h-4 text-reward" />
          <span className="font-bold text-foreground">{score}/{questions.length}</span>
        </div>
        <div className="bg-card rounded-xl px-4 py-2 shadow-card flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-bold text-foreground">{totalPoints} pts</span>
        </div>
        {streak >= 2 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-reward to-secondary rounded-xl px-4 py-2 shadow-card flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-reward-foreground" />
            <span className="font-bold text-reward-foreground">{streak}x Streak!</span>
          </motion.div>
        )}
      </div>

      {!gameOver && currentQuestion ? (
        <>
          {/* Timer */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm">
                <Timer className={`w-4 h-4 ${timeLeft <= 3 ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
                <span className={timeLeft <= 3 ? 'text-destructive font-bold' : 'text-muted-foreground'}>
                  {timeLeft}s
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Question {currentIndex + 1}/{questions.length}
              </span>
            </div>
            <Progress 
              value={timerPercent} 
              className={`h-2 ${timeLeft <= 3 ? '[&>div]:bg-destructive' : ''}`}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl p-6 shadow-card mb-4"
          >
            <h3 className="text-xl font-bold text-foreground text-center mb-6">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctIndex;
                const showCorrect = feedback && isCorrect;
                const showWrong = feedback && !feedback.correct && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    whileHover={!feedback ? { scale: 1.02 } : undefined}
                    whileTap={!feedback ? { scale: 0.98 } : undefined}
                    onClick={() => handleAnswer(index)}
                    disabled={!!feedback}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      showCorrect
                        ? 'bg-primary text-primary-foreground'
                        : showWrong
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-muted hover:bg-primary/20 text-foreground'
                    }`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-center p-3 rounded-xl ${
                  feedback.correct 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-destructive/20 text-destructive'
                }`}
              >
                <span className="font-bold">
                  {feedback.correct ? '✅ Correct! Speed bonus!' : '❌ Time ran out or wrong answer!'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : gameOver ? (
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
            {score >= questions.length * 0.7 ? '🏆' : '⚡'}
          </motion.div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {score >= questions.length * 0.7 ? 'Lightning Fast!' : 'Good Effort!'}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            You got {score} out of {questions.length} correct!
          </p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                <Sparkles className="w-6 h-6" />
                +{totalPoints}
              </div>
              <span className="text-sm text-muted-foreground">Points Earned</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="flex items-center gap-1 text-2xl font-bold text-reward">
                <Trophy className="w-6 h-6" />
                {Math.round((score / questions.length) * 100)}%
              </div>
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </div>
          </div>

          <Button variant="hero" onClick={initGame}>
            <RefreshCw className="w-5 h-5" />
            Play Again
          </Button>
        </motion.div>
      ) : null}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        <p>💡 Tip: Answer quickly for time bonuses! Get streaks for extra points!</p>
      </motion.div>
    </div>
  );
}
