import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: LucideIcon;
  tier: "bronze" | "silver" | "gold";
  unlocked?: boolean;
}

const tierColors = {
  bronze: "hsl(30, 75%, 50%)",
  silver: "hsl(0, 0%, 70%)",
  gold: "hsl(45, 100%, 50%)",
};

export default function AchievementBadge({
  title,
  description,
  icon: Icon,
  tier,
  unlocked = true,
}: AchievementBadgeProps) {
  const tierColor = tierColors[tier];

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover-elevate ${
        !unlocked && "opacity-50 grayscale"
      }`}
      data-testid={`badge-achievement-${title.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg"
          style={{
            backgroundColor: unlocked ? `${tierColor}20` : "hsl(var(--muted))",
          }}
        >
          <Icon
            className="h-6 w-6"
            style={{ color: unlocked ? tierColor : "hsl(var(--muted-foreground))" }}
          />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-display text-sm font-semibold">{title}</h4>
            {unlocked && (
              <Badge
                variant="outline"
                className="text-xs capitalize"
                style={{
                  borderColor: tierColor,
                  color: tierColor,
                }}
              >
                {tier}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <Badge variant="secondary">Locked</Badge>
        </div>
      )}
    </div>
  );
}
