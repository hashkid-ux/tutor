import CharacterStats from "@/components/CharacterStats";
import AchievementBadge from "@/components/AchievementBadge";
import { Award, BookOpen, Flame, Target } from "lucide-react";

export default function Character() {
  //todo: remove mock functionality
  const achievements = [
    { title: "Week Warrior", description: "7-day streak", icon: Flame, tier: "gold" as const, unlocked: true },
    { title: "Quick Learner", description: "10 topics in a week", icon: BookOpen, tier: "silver" as const, unlocked: true },
    { title: "Perfect Score", description: "100% on quiz", icon: Target, tier: "silver" as const, unlocked: true },
    { title: "Subject Master", description: "100% mastery", icon: Award, tier: "gold" as const, unlocked: false },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Your Character</h1>
        <p className="text-muted-foreground">Level up your stats and unlock achievements</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CharacterStats
            name="Scholar"
            level={12}
            xp={850}
            maxXp={1200}
            intelligence={85}
            focus={72}
            accuracy={68}
            growth={90}
            title="Master of Sciences"
          />
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-xl font-semibold">Recent Achievements</h2>
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.title} {...achievement} />
          ))}
        </div>
      </div>
    </div>
  );
}
