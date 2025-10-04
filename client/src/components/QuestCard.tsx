import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Lock } from "lucide-react";

interface QuestCardProps {
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  xpReward: number;
  status: "locked" | "active" | "completed";
  objectives: string[];
}

export default function QuestCard({
  title,
  description,
  progress,
  maxProgress,
  xpReward,
  status,
  objectives,
}: QuestCardProps) {
  const progressPercent = (progress / maxProgress) * 100;

  return (
    <Card
      className={`overflow-hidden transition-all hover-elevate ${
        status === "locked" && "opacity-60"
      }`}
      data-testid={`card-quest-${title.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              {status === "locked" && <Lock className="h-4 w-4 text-muted-foreground" />}
              {status === "completed" && (
                <CheckCircle2 className="h-4 w-4 text-chart-3" />
              )}
              <h3 className="font-display text-base font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className="shrink-0"
          >
            +{xpReward} XP
          </Badge>
        </div>

        {status !== "locked" && (
          <>
            <div className="space-y-2">
              {objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  {index < progress ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-3" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span
                    className={
                      index < progress ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    {objective}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>
                  {progress}/{maxProgress}
                </span>
              </div>
              <Progress value={progressPercent} />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
