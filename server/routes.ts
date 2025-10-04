import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertDoubtSchema,
  insertDerivationSchema,
  insertUserProgressSchema,
  insertQuizResultSchema,
  subscriptionTiers,
  type SubscriptionTier,
} from "@shared/schema";
import OpenAI from "openai";
import Stripe from "stripe";
import bcrypt from "bcrypt";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

let openai: OpenAI | null = null;
let stripe: Stripe | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16" as any,
  });
}

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

async function checkTokenLimit(userId: string, subscriptionTier: SubscriptionTier): Promise<{ allowed: boolean; remaining: number }> {
  const user = await storage.getUser(userId);
  if (!user) return { allowed: false, remaining: 0 };

  const tier = subscriptionTiers[subscriptionTier];
  
  if (tier.tokenLimit === -1 || tier.tokenLimit === 0) {
    return { allowed: true, remaining: -1 };
  }

  const now = new Date();
  const lastReset = new Date(user.lastTokenReset);
  
  if (now.getDate() !== lastReset.getDate() || now.getMonth() !== lastReset.getMonth()) {
    await storage.updateUser(userId, {
      tokensUsedToday: 0,
      lastTokenReset: now,
    });
    return { allowed: true, remaining: tier.tokenLimit };
  }

  const remaining = Math.max(0, tier.tokenLimit - user.tokensUsedToday);
  return { allowed: remaining > 0, remaining };
}

async function incrementTokenUsage(userId: string, tokensUsed: number): Promise<void> {
  const user = await storage.getUser(userId);
  if (!user) return;

  await storage.updateUser(userId, {
    tokensUsedToday: user.tokensUsedToday + tokensUsed,
  });
}

async function getModelForTier(tier: SubscriptionTier): Promise<string> {
  return subscriptionTiers[tier].model;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password, email } = insertUserSchema.parse(req.body);

      const existing = await storage.getUserByUsername(username);
      if (existing) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ username, password: hashedPassword, email });
      
      req.session.userId = user.id;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/logout", requireAuth, async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/user/profile", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { selectedClass, characterAvatar } = req.body;
      
      const allowedUpdates: Partial<typeof req.body> = {};
      if (selectedClass !== undefined) allowedUpdates.selectedClass = selectedClass;
      if (characterAvatar !== undefined) allowedUpdates.characterAvatar = characterAvatar;

      const user = await storage.updateUser(userId, allowedUpdates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/doubts", requireAuth, async (req, res) => {
    try {
      if (!openai) {
        return res.status(503).json({ message: "AI service not configured. Please add OPENAI_API_KEY." });
      }

      const userId = req.session.userId!;
      const doubtData = { ...req.body, userId };
      const validated = insertDoubtSchema.parse(doubtData);
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { allowed, remaining } = await checkTokenLimit(user.id, user.subscriptionTier as SubscriptionTier);
      
      if (user.subscriptionTier === "free" || allowed) {
        const doubt = await storage.createDoubt(validated);

        const model = await getModelForTier(user.subscriptionTier as SubscriptionTier);
        
        const prompt = `You are an expert AI tutor for Class ${user.selectedClass} ${validated.subject}. 
A student has the following doubt about ${validated.chapter} - ${validated.topic}:

"${validated.question}"

Provide a clear, comprehensive explanation that:
1. Addresses the question directly
2. Uses simple language appropriate for Class ${user.selectedClass}
3. Includes relevant examples
4. Helps build intuition about the concept

Keep your response engaging and encouraging.`;

        const completion = await openai.chat.completions.create({
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        });

        const aiResponse = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
        const tokensUsed = completion.usage?.total_tokens || 0;

        await storage.updateDoubt(doubt.id, {
          aiResponse,
          isResolved: true,
          tokensUsed,
        });

        if (user.subscriptionTier !== "free") {
          await incrementTokenUsage(user.id, tokensUsed);
        }

        const updatedDoubt = await storage.getDoubt(doubt.id);
        const newRemaining = remaining === -1 ? -1 : Math.max(0, remaining - tokensUsed);
        res.json({ doubt: updatedDoubt, tokensRemaining: newRemaining });
      } else {
        res.status(403).json({ message: "Daily token limit reached. Please upgrade your subscription." });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/doubts", requireAuth, async (req, res) => {
    try {
      const doubts = await storage.getUserDoubts(req.session.userId!);
      res.json(doubts);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/derivations", requireAuth, async (req, res) => {
    try {
      if (!openai) {
        return res.status(503).json({ message: "AI service not configured. Please add OPENAI_API_KEY." });
      }

      const userId = req.session.userId!;
      const derivationData = { ...req.body, userId };
      const validated = insertDerivationSchema.parse(derivationData);
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { allowed, remaining } = await checkTokenLimit(user.id, user.subscriptionTier as SubscriptionTier);
      
      if (user.subscriptionTier === "free" || allowed) {
        const derivation = await storage.createDerivation(validated);

        const model = await getModelForTier(user.subscriptionTier as SubscriptionTier);
        
        const prompt = `You are an expert mathematics and physics tutor for Class ${user.selectedClass}.
Provide a detailed, step-by-step derivation of the formula: ${validated.formula}
from ${validated.chapter} - ${validated.subject}.

For each step:
1. Show the mathematical expression
2. Explain the reasoning
3. Highlight key principles or laws used

Make it clear and easy to follow for a Class ${user.selectedClass} student.
Format your response with clear step numbering.`;

        const completion = await openai.chat.completions.create({
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.6,
        });

        const derivationSteps = completion.choices[0].message.content || "Unable to generate derivation.";
        const tokensUsed = completion.usage?.total_tokens || 0;

        await storage.updateDoubt(derivation.id, {
          derivationSteps,
          tokensUsed,
        } as any);

        if (user.subscriptionTier !== "free") {
          await incrementTokenUsage(user.id, tokensUsed);
        }

        const updatedDerivation = await storage.getDerivation(derivation.id);
        const newRemaining = remaining === -1 ? -1 : Math.max(0, remaining - tokensUsed);
        res.json({ derivation: updatedDerivation, tokensRemaining: newRemaining });
      } else {
        res.status(403).json({ message: "Daily token limit reached. Please upgrade your subscription." });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/derivations", requireAuth, async (req, res) => {
    try {
      const derivations = await storage.getUserDerivations(req.session.userId!);
      res.json(derivations);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/lessons", async (req, res) => {
    try {
      const { classLevel, subject } = req.query;
      
      if (!classLevel) {
        return res.status(400).json({ message: "classLevel is required" });
      }

      const lessons = await storage.getLessons(
        classLevel as string,
        subject as string | undefined
      );
      
      res.json(lessons);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await storage.getLesson(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/lessons/:lessonId/start", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { lessonId } = req.params;

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.subscriptionTier === "free") {
        return res.status(403).json({ message: "Upgrade to access lessons" });
      }

      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      const existingProgress = await storage.getUserProgress(userId, lessonId);
      
      if (existingProgress.length > 0) {
        res.json(existingProgress[0]);
      } else {
        const progress = await storage.createUserProgress({
          userId,
          lessonId,
          completed: false,
          timeSpent: 0,
        });
        res.json(progress);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/progress", requireAuth, async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.session.userId!);
      res.json(progress);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/progress/:progressId", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const updates = req.body;
      
      const allProgress = await storage.getUserProgress(userId);
      const existingProgress = allProgress.find(p => p.id === req.params.progressId);
      
      if (!existingProgress) {
        return res.status(404).json({ message: "Progress not found or unauthorized" });
      }

      const progress = await storage.updateUserProgress(req.params.progressId, updates);
      
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }

      if (updates.completed) {
        const user = await storage.getUser(userId);
        if (user) {
          const xpGained = 50;
          const newXp = user.xp + xpGained;
          const newLevel = Math.floor(newXp / 1000) + 1;
          
          await storage.updateUser(user.id, {
            xp: newXp,
            level: newLevel,
          });
        }
      }

      res.json(progress);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/quizzes/:lessonId", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { lessonId } = req.params;

      const adaptiveQuizzes = await storage.getAdaptiveQuizzes(userId, lessonId, 5);
      res.json(adaptiveQuizzes);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/quiz-results", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const resultData = { ...req.body, userId };
      const validated = insertQuizResultSchema.parse(resultData);
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.subscriptionTier === "free") {
        return res.status(403).json({ message: "Upgrade to access quizzes" });
      }

      const model = await getModelForTier(user.subscriptionTier as SubscriptionTier);
      const quiz = await storage.getQuizzesByLesson(resultData.lessonId);
      const currentQuiz = quiz.find(q => q.id === resultData.quizId);

      let aiExplanation = null;
      
      if (openai && currentQuiz && !resultData.isCorrect) {
        const prompt = `A Class ${user.selectedClass} student answered incorrectly: "${resultData.userAnswer}" 
to the question: "${currentQuiz.question}"
The correct answer is: "${currentQuiz.correctAnswer}"

Provide a brief, encouraging explanation helping them understand why they got it wrong and how to think about it correctly.`;

        const completion = await openai.chat.completions.create({
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 200,
        });

        aiExplanation = completion.choices[0].message.content;
      }

      const result = await storage.createQuizResult({
        ...validated,
        aiExplanation,
      });

      if (validated.isCorrect) {
        const xpGained = 10;
        await storage.updateUser(user.id, {
          xp: user.xp + xpGained,
          level: Math.floor((user.xp + xpGained) / 1000) + 1,
        });
      }

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/quiz-results", requireAuth, async (req, res) => {
    try {
      const { lessonId } = req.query;
      const results = await storage.getUserQuizResults(
        req.session.userId!,
        lessonId as string | undefined
      );
      res.json(results);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/quests", requireAuth, async (req, res) => {
    try {
      const quests = await storage.getActiveQuests();
      res.json(quests);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/user-quests", requireAuth, async (req, res) => {
    try {
      const userQuests = await storage.getUserQuests(req.session.userId!);
      const questDetails = await Promise.all(
        userQuests.map(async (uq) => {
          const quests = await storage.getActiveQuests();
          const quest = quests.find(q => q.id === uq.questId);
          return { ...uq, quest };
        })
      );
      res.json(questDetails);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/quests/:questId/start", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { questId } = req.params;

      const existing = await storage.getUserQuests(userId);
      const alreadyStarted = existing.find(uq => uq.questId === questId);

      if (alreadyStarted) {
        return res.json(alreadyStarted);
      }

      const userQuest = await storage.createUserQuest(userId, questId);
      res.json(userQuest);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/achievements", requireAuth, async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/user-achievements", requireAuth, async (req, res) => {
    try {
      const userAchievements = await storage.getUserAchievements(req.session.userId!);
      const achievementDetails = await Promise.all(
        userAchievements.map(async (ua) => {
          const achievements = await storage.getAchievements();
          const achievement = achievements.find(a => a.id === ua.achievementId);
          return { ...ua, achievement };
        })
      );
      res.json(achievementDetails);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/subscription/create-checkout", requireAuth, async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ message: "Payment service not configured. Please add STRIPE_SECRET_KEY." });
      }

      const userId = req.session.userId!;
      const { tier } = req.body;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (tier === "free") {
        return res.status(400).json({ message: "Cannot checkout for free tier" });
      }

      const tierInfo = subscriptionTiers[tier as SubscriptionTier];
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: `${tierInfo.name} Plan`,
                description: tierInfo.features.join(", "),
              },
              unit_amount: tierInfo.price * 100,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.VITE_APP_URL || "http://localhost:5000"}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.VITE_APP_URL || "http://localhost:5000"}/subscription/cancel`,
        client_reference_id: userId,
        metadata: {
          userId,
          tier,
        },
      });

      res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/subscription/webhook", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Payment service not configured" });
    }

    const sig = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        process.env.STRIPE_WEBHOOK_SECRET || ""
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        const userId = session.metadata.userId;
        const tier = session.metadata.tier;

        await storage.updateUser(userId, {
          subscriptionTier: tier,
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
        });
      }

      res.json({ received: true });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/subscription/tiers", (_req, res) => {
    res.json(subscriptionTiers);
  });

  return httpServer;
}
