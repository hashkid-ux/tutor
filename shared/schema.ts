import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  subscriptionTier: text("subscription_tier").notNull().default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  level: integer("level").notNull().default(1),
  xp: integer("xp").notNull().default(0),
  tokensUsedToday: integer("tokens_used_today").notNull().default(0),
  lastTokenReset: timestamp("last_token_reset").notNull().defaultNow(),
  selectedClass: text("selected_class").notNull().default("11"),
  characterAvatar: text("character_avatar").default("scholar"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const doubts = pgTable("doubts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  subject: text("subject").notNull(),
  chapter: text("chapter").notNull(),
  topic: text("topic").notNull(),
  question: text("question").notNull(),
  aiResponse: text("ai_response"),
  isResolved: boolean("is_resolved").notNull().default(false),
  tokensUsed: integer("tokens_used").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const derivations = pgTable("derivations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  subject: text("subject").notNull(),
  chapter: text("chapter").notNull(),
  formula: text("formula").notNull(),
  derivationSteps: text("derivation_steps").notNull(),
  visualizationData: jsonb("visualization_data"),
  tokensUsed: integer("tokens_used").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const lessons = pgTable("lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classLevel: text("class_level").notNull(),
  subject: text("subject").notNull(),
  chapter: text("chapter").notNull(),
  topic: text("topic").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  storyScenes: jsonb("story_scenes"),
  visualizations: jsonb("visualizations"),
  keyPoints: text("key_points").array().notNull(),
  difficulty: text("difficulty").notNull().default("medium"),
  order: integer("order").notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  lessonId: text("lesson_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  score: integer("score"),
  timeSpent: integer("time_spent").notNull().default(0),
  weakAreas: text("weak_areas").array(),
  lastAccessed: timestamp("last_accessed").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const quizzes = pgTable("quizzes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  lessonId: text("lesson_id").notNull(),
  question: text("question").notNull(),
  questionType: text("question_type").notNull(),
  options: jsonb("options"),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  difficulty: text("difficulty").notNull(),
  targetsWeakArea: text("targets_weak_area"),
});

export const quizResults = pgTable("quiz_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  quizId: text("quiz_id").notNull(),
  lessonId: text("lesson_id").notNull(),
  userAnswer: text("user_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: integer("time_spent").notNull(),
  aiExplanation: text("ai_explanation"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const quests = pgTable("quests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  questType: text("quest_type").notNull(),
  requirements: jsonb("requirements").notNull(),
  rewards: jsonb("rewards").notNull(),
  xpReward: integer("xp_reward").notNull(),
  difficulty: text("difficulty").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const userQuests = pgTable("user_quests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  questId: text("quest_id").notNull(),
  progress: integer("progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
  requirement: text("requirement").notNull(),
  rarity: text("rarity").notNull(),
});

export const userAchievements = pgTable("user_achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  achievementId: text("achievement_id").notNull(),
  unlockedAt: timestamp("unlocked_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertDoubtSchema = createInsertSchema(doubts).omit({
  id: true,
  aiResponse: true,
  isResolved: true,
  tokensUsed: true,
  createdAt: true,
});

export const insertDerivationSchema = createInsertSchema(derivations).omit({
  id: true,
  derivationSteps: true,
  visualizationData: true,
  tokensUsed: true,
  createdAt: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastAccessed: true,
  completedAt: true,
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Doubt = typeof doubts.$inferSelect;
export type InsertDoubt = z.infer<typeof insertDoubtSchema>;
export type Derivation = typeof derivations.$inferSelect;
export type InsertDerivation = z.infer<typeof insertDerivationSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type Quest = typeof quests.$inferSelect;
export type UserQuest = typeof userQuests.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;

export const subscriptionTiers = {
  free: {
    name: "Free",
    price: 0,
    model: "gpt-4o-mini",
    features: ["Doubt solving", "Derivation viewer"],
    tokenLimit: 0,
  },
  basic: {
    name: "Basic",
    price: 199,
    model: "gpt-4o-mini",
    features: ["All lessons", "Story mode", "Quizzes", "3D visualizations"],
    tokenLimit: 10000,
  },
  pro: {
    name: "Pro",
    price: 899,
    model: "gpt-4o",
    features: ["All Basic features", "Advanced AI", "More daily tokens"],
    tokenLimit: 50000,
  },
  premium: {
    name: "Premium",
    price: 2999,
    model: "gpt-4o",
    features: ["Unlimited access", "Best AI model", "Priority support"],
    tokenLimit: -1,
  },
} as const;

export type SubscriptionTier = keyof typeof subscriptionTiers;
