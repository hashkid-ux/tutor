import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

interface CharacterStatsProps {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  intelligence: number;
  focus: number;
  accuracy: number;
  growth: number;
  title: string;
}

export default function CharacterStats({
  name,
  level,
  xp,
  maxXp,
  intelligence,
  focus,
  accuracy,
  growth,
  title,
}: CharacterStatsProps) {
  const stats = [
    { label: "Intelligence", value: intelligence, icon: Brain, color: "hsl(265, 85%, 65%)" },
    { label: "Focus", value: focus, icon: Zap, color: "hsl(195, 100%, 50%)" },
    { label: "Accuracy", value: accuracy, icon: Target, color: "hsl(145, 70%, 50%)" },
    { label: "Growth", value: growth, icon: TrendingUp, color: "hsl(38, 95%, 60%)" },
  ];

  return (
    <Card className="overflow-hidden" data-testid="component-character-stats">
      <div className="border-b bg-gradient-to-r from-primary/20 via-chart-2/20 to-primary/20 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
            <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2 text-2xl font-display font-bold text-white">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-2xl font-bold">{name}</h3>
              <Badge className="bg-gradient-to-r from-primary to-chart-2">
                Lv. {level}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground italic">{title}</p>
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Experience</span>
                <span>
                  {xp} / {maxXp} XP
                </span>
              </div>
              <Progress value={(xp / maxXp) * 100} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h4 className="mb-4 font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Character Stats
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <div className="space-y-1">
                <Progress
                  value={stat.value}
                  className="h-2"
                  style={
                    {
                      "--progress-background": stat.color,
                    } as React.CSSProperties
                  }
                />
                <div className="flex items-center justify-between">
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${stat.value}%`,
                        backgroundColor: stat.color,
                      }}
                    />
                  </div>
                  <span className="ml-2 text-xs font-medium" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
