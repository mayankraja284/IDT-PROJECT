// Mock API - Simulates backend calls with LocalStorage persistence

export interface UserProgress {
  id: string;
  name: string;
  points: number;
  badges: string[];
  completedModules: string[];
  moduleScores: Record<string, number>;
  dailyChallengesCompleted: string[];
  streakDays: number;
  lastActiveDate: string;
  treesPlanted: number;
  plasticReduced: number;
  energySaved: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  points: number;
  date: string;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requiredPoints?: number;
  requiredModules?: string[];
}

// Available badges
export const BADGES: Badge[] = [
  { id: 'recycle-hero', name: 'Recycle Hero', emoji: '♻️', description: 'Complete the Recycling module', requiredModules: ['recycling'] },
  { id: 'water-saver', name: 'Water Saver', emoji: '💧', description: 'Complete the Water & Energy module', requiredModules: ['water-energy'] },
  { id: 'energy-champion', name: 'Energy Champion', emoji: '⚡', description: 'Earn 500 Eco Points', requiredPoints: 500 },
  { id: 'climate-warrior', name: 'Climate Warrior', emoji: '🌍', description: 'Complete the Climate module', requiredModules: ['climate'] },
  { id: 'green-thumb', name: 'Green Thumb', emoji: '🌱', description: 'Complete the Green Habits module', requiredModules: ['green-habits'] },
  { id: 'eco-master', name: 'Eco Master', emoji: '🏆', description: 'Complete all modules', requiredModules: ['climate', 'recycling', 'water-energy', 'green-habits'] },
  { id: 'quiz-whiz', name: 'Quiz Whiz', emoji: '🧠', description: 'Score 100% on any quiz' },
  { id: 'daily-star', name: 'Daily Star', emoji: '⭐', description: 'Complete 5 daily challenges', requiredPoints: 5 },
];

// Daily challenges pool
const CHALLENGE_POOL: Omit<DailyChallenge, 'id' | 'date'>[] = [
  { title: 'Light Saver', description: 'Turn off lights when you leave a room', emoji: '💡', points: 10 },
  { title: 'Water Wise', description: 'Take a shorter shower today', emoji: '🚿', points: 15 },
  { title: 'Reuse Master', description: 'Reuse a water bottle instead of plastic', emoji: '🍶', points: 20 },
  { title: 'Recycle Star', description: 'Sort your trash into recyclables', emoji: '♻️', points: 15 },
  { title: 'Plant Friend', description: 'Water a plant or spend time in nature', emoji: '🌿', points: 10 },
  { title: 'Bag Hero', description: 'Use a reusable bag when shopping', emoji: '🛍️', points: 20 },
  { title: 'Unplug It', description: 'Unplug devices you\'re not using', emoji: '🔌', points: 10 },
  { title: 'Walk the Walk', description: 'Walk or bike instead of driving', emoji: '🚶', points: 25 },
  { title: 'Zero Waste', description: 'Try to produce no trash today', emoji: '🗑️', points: 30 },
  { title: 'Spread the Word', description: 'Tell a friend about saving the planet', emoji: '📢', points: 15 },
];

const STORAGE_KEY = 'eco_edu_user_progress';
const DELAY_MS = 300; // Simulated network delay

// Helper to simulate async delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get today's date string
const getTodayString = () => new Date().toISOString().split('T')[0];

// Initialize default user
const getDefaultUser = (): UserProgress => ({
  id: 'guest-user',
  name: 'Eco Explorer',
  points: 0,
  badges: [],
  completedModules: [],
  moduleScores: {},
  dailyChallengesCompleted: [],
  streakDays: 0,
  lastActiveDate: getTodayString(),
  treesPlanted: 0,
  plasticReduced: 0,
  energySaved: 0,
});

// Load from LocalStorage
const loadProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading progress:', e);
  }
  return getDefaultUser();
};

// Save to LocalStorage
const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
};

// Check and award badges
const checkBadges = (progress: UserProgress): string[] => {
  const newBadges: string[] = [];
  
  for (const badge of BADGES) {
    if (progress.badges.includes(badge.id)) continue;
    
    let earned = false;
    
    if (badge.requiredPoints && badge.id === 'daily-star') {
      earned = progress.dailyChallengesCompleted.length >= badge.requiredPoints;
    } else if (badge.requiredPoints) {
      earned = progress.points >= badge.requiredPoints;
    }
    
    if (badge.requiredModules) {
      earned = badge.requiredModules.every(m => progress.completedModules.includes(m));
    }
    
    if (earned) {
      newBadges.push(badge.id);
    }
  }
  
  return newBadges;
};

// Update streak
const updateStreak = (progress: UserProgress): UserProgress => {
  const today = getTodayString();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (progress.lastActiveDate === today) {
    return progress;
  }
  
  if (progress.lastActiveDate === yesterday) {
    return {
      ...progress,
      streakDays: progress.streakDays + 1,
      lastActiveDate: today,
    };
  }
  
  return {
    ...progress,
    streakDays: 1,
    lastActiveDate: today,
  };
};

// API Functions
export const mockApi = {
  // Get user progress
  getUserProgress: async (): Promise<UserProgress> => {
    await delay(DELAY_MS);
    let progress = loadProgress();
    progress = updateStreak(progress);
    saveProgress(progress);
    return progress;
  },
  
  // Save quiz result
  saveQuizResult: async (moduleId: string, score: number, totalQuestions: number): Promise<{ 
    progress: UserProgress; 
    pointsEarned: number; 
    newBadges: string[];
    isNewCompletion: boolean;
  }> => {
    await delay(DELAY_MS);
    let progress = loadProgress();
    
    const isNewCompletion = !progress.completedModules.includes(moduleId);
    const percentage = (score / totalQuestions) * 100;
    const basePoints = Math.round(percentage);
    const bonusPoints = percentage === 100 ? 50 : 0;
    const pointsEarned = basePoints + bonusPoints;
    
    progress.points += pointsEarned;
    progress.moduleScores[moduleId] = Math.max(progress.moduleScores[moduleId] || 0, score);
    
    if (percentage >= 70 && !progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId);
    }
    
    // Update fake stats
    progress.treesPlanted += Math.floor(pointsEarned / 20);
    progress.plasticReduced += Math.floor(pointsEarned / 15);
    progress.energySaved += pointsEarned;
    
    // Check for perfect score badge
    if (percentage === 100 && !progress.badges.includes('quiz-whiz')) {
      progress.badges.push('quiz-whiz');
    }
    
    const newBadges = checkBadges(progress);
    progress.badges = [...progress.badges, ...newBadges];
    
    if (percentage === 100 && !newBadges.includes('quiz-whiz')) {
      newBadges.push('quiz-whiz');
    }
    
    progress = updateStreak(progress);
    saveProgress(progress);
    
    return { progress, pointsEarned, newBadges, isNewCompletion };
  },
  
  // Get daily challenge
  getDailyChallenge: async (): Promise<DailyChallenge> => {
    await delay(DELAY_MS);
    const today = getTodayString();
    
    // Use date to consistently pick the same challenge for the day
    const dateHash = today.split('-').reduce((acc, num) => acc + parseInt(num), 0);
    const challengeIndex = dateHash % CHALLENGE_POOL.length;
    const challenge = CHALLENGE_POOL[challengeIndex];
    
    return {
      ...challenge,
      id: `challenge-${today}`,
      date: today,
    };
  },
  
  // Complete daily challenge
  completeDailyChallenge: async (challengeId: string, points: number): Promise<{
    progress: UserProgress;
    newBadges: string[];
  }> => {
    await delay(DELAY_MS);
    let progress = loadProgress();
    
    if (progress.dailyChallengesCompleted.includes(challengeId)) {
      return { progress, newBadges: [] };
    }
    
    progress.dailyChallengesCompleted.push(challengeId);
    progress.points += points;
    
    // Update fake stats
    progress.treesPlanted += 1;
    progress.plasticReduced += 2;
    progress.energySaved += points;
    
    const newBadges = checkBadges(progress);
    progress.badges = [...progress.badges, ...newBadges];
    
    progress = updateStreak(progress);
    saveProgress(progress);
    
    return { progress, newBadges };
  },
  
  // Add points from games
  addGamePoints: async (points: number): Promise<UserProgress> => {
    await delay(DELAY_MS);
    let progress = loadProgress();
    
    progress.points += points;
    progress.plasticReduced += Math.floor(points / 10);
    progress.treesPlanted += Math.floor(points / 30);
    progress.energySaved += points;
    
    const newBadges = checkBadges(progress);
    progress.badges = [...progress.badges, ...newBadges];
    
    progress = updateStreak(progress);
    saveProgress(progress);
    
    return progress;
  },
  
  // Reset progress (for testing)
  resetProgress: async (): Promise<UserProgress> => {
    await delay(DELAY_MS);
    const defaultUser = getDefaultUser();
    saveProgress(defaultUser);
    return defaultUser;
  },
  
  // Get all badges
  getAllBadges: async (): Promise<Badge[]> => {
    await delay(DELAY_MS);
    return BADGES;
  },
};
