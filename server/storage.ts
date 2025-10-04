import {
  type User,
  type InsertUser,
  type Doubt,
  type InsertDoubt,
  type Derivation,
  type InsertDerivation,
  type Lesson,
  type InsertLesson,
  type UserProgress,
  type InsertUserProgress,
  type Quiz,
  type QuizResult,
  type InsertQuizResult,
  type Quest,
  type UserQuest,
  type Achievement,
  type UserAchievement,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  createDoubt(doubt: InsertDoubt): Promise<Doubt>;
  getDoubt(id: string): Promise<Doubt | undefined>;
  getUserDoubts(userId: string): Promise<Doubt[]>;
  updateDoubt(id: string, updates: Partial<Doubt>): Promise<Doubt | undefined>;
  
  createDerivation(derivation: InsertDerivation): Promise<Derivation>;
  getDerivation(id: string): Promise<Derivation | undefined>;
  getUserDerivations(userId: string): Promise<Derivation[]>;
  
  getLessons(classLevel: string, subject?: string): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  
  getUserProgress(userId: string, lessonId?: string): Promise<UserProgress[]>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined>;
  
  getQuizzesByLesson(lessonId: string): Promise<Quiz[]>;
  getAdaptiveQuizzes(userId: string, lessonId: string, limit: number): Promise<Quiz[]>;
  
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getUserQuizResults(userId: string, lessonId?: string): Promise<QuizResult[]>;
  
  getActiveQuests(): Promise<Quest[]>;
  getUserQuests(userId: string): Promise<UserQuest[]>;
  createUserQuest(userId: string, questId: string): Promise<UserQuest>;
  updateUserQuest(id: string, updates: Partial<UserQuest>): Promise<UserQuest | undefined>;
  
  getAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  createUserAchievement(userId: string, achievementId: string): Promise<UserAchievement>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private doubts: Map<string, Doubt>;
  private derivations: Map<string, Derivation>;
  private lessons: Map<string, Lesson>;
  private userProgress: Map<string, UserProgress>;
  private quizzes: Map<string, Quiz>;
  private quizResults: Map<string, QuizResult>;
  private quests: Map<string, Quest>;
  private userQuests: Map<string, UserQuest>;
  private achievements: Map<string, Achievement>;
  private userAchievements: Map<string, UserAchievement>;

  constructor() {
    this.users = new Map();
    this.doubts = new Map();
    this.derivations = new Map();
    this.lessons = new Map();
    this.userProgress = new Map();
    this.quizzes = new Map();
    this.quizResults = new Map();
    this.quests = new Map();
    this.userQuests = new Map();
    this.achievements = new Map();
    this.userAchievements = new Map();
    
    this.seedData();
  }

  private seedData() {
    this.seedLessons();
    this.seedQuizzes();
    this.seedQuests();
    this.seedAchievements();
  }

  private seedLessons() {
    const class11Physics: Lesson[] = [
      {
        id: randomUUID(),
        classLevel: "11",
        subject: "Physics",
        chapter: "1",
        topic: "Physical World",
        title: "Introduction to Physics",
        description: "Understanding the fundamental nature of physics and scientific method",
        content: "Physics is the study of matter, energy, and their interactions...",
        storyScenes: [
          { scene: 1, title: "The Curious Observer", content: "Meet Alex, a young scientist who wonders about the world..." }
        ] as any,
        visualizations: { type: "interactive", models: ["atom", "forces"] } as any,
        keyPoints: ["Scientific method", "Measurement", "Units", "Dimensions"],
        difficulty: "easy",
        order: 1,
      },
    ];

    const class12Physics: Lesson[] = [
      {
        id: randomUUID(),
        classLevel: "12",
        subject: "Physics",
        chapter: "1",
        topic: "Electric Charges and Fields",
        title: "Introduction to Electrostatics",
        description: "Learn about electric charges, Coulomb's law, and electric fields",
        content: "Electric charge is a fundamental property of matter...",
        storyScenes: [
          { scene: 1, title: "The Lightning Storm", content: "During a thunderstorm, witness the power of electricity..." }
        ] as any,
        visualizations: { type: "3d", models: ["electric-field", "charge-distribution"] } as any,
        keyPoints: ["Coulomb's law", "Electric field", "Field lines", "Gauss's law"],
        difficulty: "medium",
        order: 1,
      },
    ];

    [...class11Physics, ...class12Physics].forEach(lesson => {
      this.lessons.set(lesson.id, lesson);
    });
  }

  private seedQuizzes() {
    const sampleQuizzes = [
      {
        id: randomUUID(),
        lessonId: Array.from(this.lessons.values())[0]?.id || "lesson-1",
        question: "What is the SI unit of force?",
        questionType: "multiple-choice",
        options: { a: "Newton", b: "Joule", c: "Watt", d: "Pascal" },
        correctAnswer: "a",
        explanation: "Force is measured in Newtons (N), named after Sir Isaac Newton. 1 N = 1 kg⋅m/s²",
        difficulty: "easy",
        targetsWeakArea: null,
      },
    ];

    sampleQuizzes.forEach(quiz => {
      this.quizzes.set(quiz.id, quiz as Quiz);
    });
  }

  private seedQuests() {
    const initialQuests = [
      {
        id: randomUUID(),
        title: "First Steps",
        description: "Complete your first lesson",
        questType: "lesson-completion",
        requirements: { lessonsCompleted: 1 },
        rewards: { badge: "Scholar" },
        xpReward: 100,
        difficulty: "easy",
        isActive: true,
      },
      {
        id: randomUUID(),
        title: "Doubt Resolver",
        description: "Ask and resolve 5 doubts",
        questType: "doubt-resolution",
        requirements: { doubtsResolved: 5 },
        rewards: { badge: "Curious Mind" },
        xpReward: 250,
        difficulty: "medium",
        isActive: true,
      },
    ];

    initialQuests.forEach(quest => {
      this.quests.set(quest.id, quest as Quest);
    });
  }

  private seedAchievements() {
    const initialAchievements = [
      {
        id: randomUUID(),
        title: "Knowledge Seeker",
        description: "Complete 10 lessons",
        icon: "book",
        category: "learning",
        requirement: "lessons:10",
        rarity: "common",
      },
      {
        id: randomUUID(),
        title: "Master of Derivations",
        description: "View 20 derivations",
        icon: "formula",
        category: "exploration",
        requirement: "derivations:20",
        rarity: "rare",
      },
    ];

    initialAchievements.forEach(achievement => {
      this.achievements.set(achievement.id, achievement as Achievement);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      subscriptionTier: "free",
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      level: 1,
      xp: 0,
      tokensUsedToday: 0,
      lastTokenReset: new Date(),
      selectedClass: "11",
      characterAvatar: "scholar",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
  }

  async createDoubt(insertDoubt: InsertDoubt): Promise<Doubt> {
    const id = randomUUID();
    const doubt: Doubt = {
      ...insertDoubt,
      id,
      aiResponse: null,
      isResolved: false,
      tokensUsed: 0,
      createdAt: new Date(),
    };
    this.doubts.set(id, doubt);
    return doubt;
  }

  async getDoubt(id: string): Promise<Doubt | undefined> {
    return this.doubts.get(id);
  }

  async getUserDoubts(userId: string): Promise<Doubt[]> {
    return Array.from(this.doubts.values())
      .filter(doubt => doubt.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateDoubt(id: string, updates: Partial<Doubt>): Promise<Doubt | undefined> {
    const doubt = this.doubts.get(id);
    if (!doubt) return undefined;
    const updated = { ...doubt, ...updates };
    this.doubts.set(id, updated);
    return updated;
  }

  async createDerivation(insertDerivation: InsertDerivation): Promise<Derivation> {
    const id = randomUUID();
    const derivation: Derivation = {
      ...insertDerivation,
      id,
      derivationSteps: "",
      visualizationData: null,
      tokensUsed: 0,
      createdAt: new Date(),
    };
    this.derivations.set(id, derivation);
    return derivation;
  }

  async getDerivation(id: string): Promise<Derivation | undefined> {
    return this.derivations.get(id);
  }

  async getUserDerivations(userId: string): Promise<Derivation[]> {
    return Array.from(this.derivations.values())
      .filter(der => der.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getLessons(classLevel: string, subject?: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => 
        lesson.classLevel === classLevel && 
        (!subject || lesson.subject === subject)
      )
      .sort((a, b) => a.order - b.order);
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = randomUUID();
    const lesson: Lesson = { ...insertLesson, id };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async getUserProgress(userId: string, lessonId?: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => 
        progress.userId === userId && 
        (!lessonId || progress.lessonId === lessonId)
      );
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = {
      ...insertProgress,
      id,
      completed: insertProgress.completed ?? false,
      score: insertProgress.score ?? null,
      timeSpent: insertProgress.timeSpent ?? 0,
      weakAreas: insertProgress.weakAreas ?? null,
      lastAccessed: new Date(),
      completedAt: insertProgress.completed ? new Date() : null,
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(id: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const progress = this.userProgress.get(id);
    if (!progress) return undefined;
    const updated = {
      ...progress,
      ...updates,
      lastAccessed: new Date(),
      completedAt: updates.completed ? new Date() : progress.completedAt,
    };
    this.userProgress.set(id, updated);
    return updated;
  }

  async getQuizzesByLesson(lessonId: string): Promise<Quiz[]> {
    return Array.from(this.quizzes.values())
      .filter(quiz => quiz.lessonId === lessonId);
  }

  async getAdaptiveQuizzes(userId: string, lessonId: string, limit: number): Promise<Quiz[]> {
    const userResults = await this.getUserQuizResults(userId, lessonId);
    const weakAreas = this.identifyWeakAreas(userResults);
    
    const allQuizzes = await this.getQuizzesByLesson(lessonId);
    
    const targetedQuizzes = allQuizzes.filter(quiz => 
      weakAreas.includes(quiz.targetsWeakArea || "")
    );
    
    const remainingQuizzes = allQuizzes.filter(quiz => 
      !weakAreas.includes(quiz.targetsWeakArea || "")
    );
    
    return [...targetedQuizzes, ...remainingQuizzes].slice(0, limit);
  }

  private identifyWeakAreas(results: QuizResult[]): string[] {
    const topicPerformance = new Map<string, { correct: number; total: number }>();
    
    results.forEach(result => {
      const quiz = this.quizzes.get(result.quizId);
      if (!quiz?.targetsWeakArea) return;
      
      const stats = topicPerformance.get(quiz.targetsWeakArea) || { correct: 0, total: 0 };
      stats.total++;
      if (result.isCorrect) stats.correct++;
      topicPerformance.set(quiz.targetsWeakArea, stats);
    });
    
    return Array.from(topicPerformance.entries())
      .filter(([_, stats]) => stats.total > 0 && stats.correct / stats.total < 0.7)
      .map(([topic, _]) => topic);
  }

  async createQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = randomUUID();
    const result: QuizResult = {
      ...insertResult,
      id,
      aiExplanation: insertResult.aiExplanation ?? null,
      createdAt: new Date(),
    };
    this.quizResults.set(id, result);
    return result;
  }

  async getUserQuizResults(userId: string, lessonId?: string): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values())
      .filter(result => 
        result.userId === userId && 
        (!lessonId || result.lessonId === lessonId)
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getActiveQuests(): Promise<Quest[]> {
    return Array.from(this.quests.values())
      .filter(quest => quest.isActive);
  }

  async getUserQuests(userId: string): Promise<UserQuest[]> {
    return Array.from(this.userQuests.values())
      .filter(uq => uq.userId === userId);
  }

  async createUserQuest(userId: string, questId: string): Promise<UserQuest> {
    const id = randomUUID();
    const userQuest: UserQuest = {
      id,
      userId,
      questId,
      progress: 0,
      completed: false,
      startedAt: new Date(),
      completedAt: null,
    };
    this.userQuests.set(id, userQuest);
    return userQuest;
  }

  async updateUserQuest(id: string, updates: Partial<UserQuest>): Promise<UserQuest | undefined> {
    const userQuest = this.userQuests.get(id);
    if (!userQuest) return undefined;
    const updated = {
      ...userQuest,
      ...updates,
      completedAt: updates.completed ? new Date() : userQuest.completedAt,
    };
    this.userQuests.set(id, updated);
    return updated;
  }

  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return Array.from(this.userAchievements.values())
      .filter(ua => ua.userId === userId)
      .sort((a, b) => b.unlockedAt.getTime() - a.unlockedAt.getTime());
  }

  async createUserAchievement(userId: string, achievementId: string): Promise<UserAchievement> {
    const id = randomUUID();
    const userAchievement: UserAchievement = {
      id,
      userId,
      achievementId,
      unlockedAt: new Date(),
    };
    this.userAchievements.set(id, userAchievement);
    return userAchievement;
  }
}

export const storage = new MemStorage();
