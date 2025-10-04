import AchievementBadge from "@/components/AchievementBadge";
import { Award, BookOpen, Flame, Sparkles, Target, TrendingUp, Trophy, Zap } from "lucide-react";

export default function Achievements() {
  //todo: remove mock functionality
  const achievements = [
    { title: "Week Warrior", description: "Maintain a 7-day learning streak", icon: Flame, tier: "gold" as const, unlocked: true },
    { title: "Quick Learner", description: "Complete 10 topics in one week", icon: BookOpen, tier: "silver" as const, unlocked: true },
    { title: "Perfect Score", description: "Get 100% on any quiz", icon: Target, tier: "silver" as const, unlocked: true },
    { title: "Early Bird", description: "Study before 8 AM for 5 days", icon: Sparkles, tier: "bronze" as const, unlocked: true },
    { title: "Subject Master", description: "Achieve 100% mastery in any subject", icon: Award, tier: "gold" as const, unlocked: false },
    { title: "Speed Demon", description: "Complete 5 quizzes in under 30 seconds each", icon: Zap, tier: "silver" as const, unlocked: false },
    { title: "Consistent Scholar", description: "Study for 30 days straight", icon: Trophy, tier: "gold" as const, unlocked: false },
    { title: "Rising Star", description: "Gain 1000 XP in a single day", icon: TrendingUp, tier: "bronze" as const, unlocked: false },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Achievements</h1>
        <p className="text-muted-foreground">
          {unlockedCount} of {achievements.length} unlocked
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.title} {...achievement} />
        ))}
      </div>
    </div>
  );
}
