import { Progress } from "@/components/ui/progress";
import { Trophy, Zap } from "lucide-react";

interface LevelProgressProps {
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
}

export default function LevelProgress({ level, xp, maxXp, streak }: LevelProgressProps) {
  const progressPercent = (xp / maxXp) * 100;

  return (
    <div className="space-y-3" data-testid="component-level-progress">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 font-display text-xl font-bold text-primary-foreground">
            {level}
          </div>
          <div className="flex-1">
            <div className="font-display text-sm font-semibold">Level {level}</div>
            <div className="text-xs text-muted-foreground">
              {xp} / {maxXp} XP
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 rounded-lg bg-chart-5/20 px-3 py-1.5">
          <Zap className="h-4 w-4 fill-chart-5 text-chart-5" />
          <span className="font-display text-sm font-bold text-chart-5">{streak}</span>
          <span className="text-xs text-muted-foreground">day streak</span>
        </div>
      </div>

      <div className="relative">
        <Progress value={progressPercent} className="h-2" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-50" />
      </div>
    </div>
  );
}
