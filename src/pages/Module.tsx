import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MODULES } from '@/lib/gameData';
import { mockApi } from '@/lib/mockApi';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Trophy, Sparkles } from 'lucide-react';

type Stage = 'content' | 'quiz' | 'results';

export default function Module() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  
  const [stage, setStage] = useState<Stage>('content');
  const [contentIndex, setContentIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ pointsEarned: number; newBadges: string[] } | null>(null);

  const module = MODULES.find(m => m.id === moduleId);

  useEffect(() => {
    if (!module) {
      navigate('/learn');
    }
  }, [module, navigate]);

  if (!module) return null;

  const currentContent = module.content[contentIndex];
  const currentQuiz = module.quiz[quizIndex];
  const isLastContent = contentIndex === module.content.length - 1;
  const isLastQuiz = quizIndex === module.quiz.length - 1;

  const handleNextContent = () => {
    if (isLastContent) {
      setStage('quiz');
    } else {
      setContentIndex(prev => prev + 1);
    }
  };

  const handlePrevContent = () => {
    if (contentIndex > 0) {
      setContentIndex(prev => prev - 1);
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === currentQuiz.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = async () => {
    if (isLastQuiz) {
      // Save results
      const result = await mockApi.saveQuizResult(module.id, score + (selectedAnswer === currentQuiz.correctIndex ? 1 : 0), module.quiz.length);
      setResults({
        pointsEarned: result.pointsEarned,
        newBadges: result.newBadges,
      });
      setStage('results');
    } else {
      setQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const contentProgress = ((contentIndex + 1) / module.content.length) * 100;
  const quizProgress = ((quizIndex + 1) / module.quiz.length) * 100;

  return (
    <div className="min-h-screen hero-gradient">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-32 md:pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button variant="ghost" size="icon" onClick={() => navigate('/learn')}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{module.emoji}</span>
              <h1 className="text-2xl font-bold text-foreground">{module.title}</h1>
            </div>
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Content Stage */}
            {stage === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Learning Progress</span>
                    <span>{contentIndex + 1}/{module.content.length}</span>
                  </div>
                  <Progress value={contentProgress} />
                </div>

                {/* Content Card */}
                <motion.div
                  key={contentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-2xl p-8 shadow-card mb-6"
                >
                  <motion.span
                    className="text-6xl block text-center mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentContent.emoji}
                  </motion.span>
                  <h2 className="text-2xl font-bold text-foreground text-center mb-4">
                    {currentContent.title}
                  </h2>
                  <p className="text-lg text-muted-foreground text-center leading-relaxed">
                    {currentContent.text}
                  </p>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevContent}
                    disabled={contentIndex === 0}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Previous
                  </Button>
                  <Button variant="hero" onClick={handleNextContent}>
                    {isLastContent ? 'Start Quiz!' : 'Next'}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Quiz Stage */}
            {stage === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Quiz Progress</span>
                    <span>Question {quizIndex + 1}/{module.quiz.length}</span>
                  </div>
                  <Progress value={quizProgress} />
                </div>

                {/* Quiz Card */}
                <motion.div
                  key={quizIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-2xl p-8 shadow-card mb-6"
                >
                  <span className="text-4xl block text-center mb-4">🤔</span>
                  <h2 className="text-xl font-bold text-foreground text-center mb-6">
                    {currentQuiz.question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuiz.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === currentQuiz.correctIndex;
                      const showCorrect = showResult && isCorrect;
                      const showWrong = showResult && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={index}
                          whileHover={!showResult ? { scale: 1.02 } : undefined}
                          whileTap={!showResult ? { scale: 0.98 } : undefined}
                          onClick={() => handleSelectAnswer(index)}
                          disabled={showResult}
                          className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                            showCorrect
                              ? 'bg-primary/20 border-2 border-primary text-primary'
                              : showWrong
                              ? 'bg-destructive/20 border-2 border-destructive text-destructive'
                              : isSelected
                              ? 'bg-primary/10 border-2 border-primary'
                              : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showCorrect && <CheckCircle className="w-5 h-5" />}
                            {showWrong && <XCircle className="w-5 h-5" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-4 bg-secondary rounded-xl"
                      >
                        <p className="text-sm text-foreground">
                          <span className="font-bold">
                            {selectedAnswer === currentQuiz.correctIndex ? '✅ Correct! ' : '❌ Not quite! '}
                          </span>
                          {currentQuiz.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Continue Button */}
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Button variant="hero" className="w-full" onClick={handleNextQuiz}>
                      {isLastQuiz ? 'See Results!' : 'Next Question'}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Results Stage */}
            {stage === 'results' && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  className="bg-card rounded-2xl p-8 shadow-card mb-6"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.6 }}
                    className="text-7xl mb-6"
                  >
                    {score >= module.quiz.length * 0.7 ? '🎉' : '💪'}
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {score >= module.quiz.length * 0.7 ? 'Great Job!' : 'Keep Trying!'}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6">
                    You got {score} out of {module.quiz.length} questions correct!
                  </p>

                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                        <Sparkles className="w-6 h-6" />
                        +{results.pointsEarned}
                      </div>
                      <span className="text-sm text-muted-foreground">Points Earned</span>
                    </div>
                    <div className="w-px h-12 bg-border" />
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-2xl font-bold text-reward">
                        <Trophy className="w-6 h-6" />
                        {score}/{module.quiz.length}
                      </div>
                      <span className="text-sm text-muted-foreground">Score</span>
                    </div>
                  </div>

                  {/* New Badges */}
                  {results.newBadges.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-secondary to-reward/20 rounded-xl p-4 mb-6"
                    >
                      <h3 className="font-bold text-foreground mb-2">🏅 New Badge Earned!</h3>
                      <div className="flex justify-center gap-2">
                        {results.newBadges.map(badge => (
                          <span key={badge} className="text-3xl">
                            {badge === 'quiz-whiz' ? '🧠' : badge === 'recycle-hero' ? '♻️' : badge === 'water-saver' ? '💧' : badge === 'energy-champion' ? '⚡' : badge === 'climate-warrior' ? '🌍' : badge === 'green-thumb' ? '🌱' : '🏆'}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {score < module.quiz.length * 0.7 && (
                    <p className="text-sm text-muted-foreground mb-4">
                      Score 70% or higher to complete this module. You can do it! 🌟
                    </p>
                  )}
                </motion.div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setStage('content');
                      setContentIndex(0);
                      setQuizIndex(0);
                      setSelectedAnswer(null);
                      setShowResult(false);
                      setScore(0);
                      setResults(null);
                    }}
                  >
                    Try Again
                  </Button>
                  <Button variant="hero" className="flex-1" onClick={() => navigate('/learn')}>
                    Back to Modules
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
