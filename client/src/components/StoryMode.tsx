import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, Play, CheckCircle2 } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  description: string;
  subject: string;
  status: "locked" | "available" | "completed";
  progress: number;
  xpReward: number;
}

interface StoryModeProps {
  chapters: Chapter[];
  currentChapter?: string;
}

export default function StoryMode({ chapters, currentChapter }: StoryModeProps) {
  return (
    <div className="relative space-y-8" data-testid="component-story-mode">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-chart-2 to-chart-4" />
      
      {chapters.map((chapter, index) => (
        <div key={chapter.id} className="relative pl-20">
          <div
            className={`absolute left-3 top-6 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background ${
              chapter.status === "completed"
                ? "bg-chart-3"
                : chapter.status === "available"
                ? "bg-primary"
                : "bg-muted"
            }`}
          >
            {chapter.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-white" />
            ) : chapter.status === "locked" ? (
              <Lock className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Play className="h-5 w-5 text-primary-foreground" />
            )}
          </div>

          <Card
            className={`overflow-hidden transition-all ${
              chapter.status === "available" && chapter.id === currentChapter
                ? "ring-2 ring-primary shadow-lg shadow-primary/20"
                : ""
            } ${chapter.status === "locked" ? "opacity-60" : "hover-elevate"}`}
          >
            <div className="p-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline">{chapter.subject}</Badge>
                    {chapter.status === "available" && (
                      <Badge className="animate-pulse">Current</Badge>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold">{chapter.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {chapter.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display font-bold text-chart-5">
                    +{chapter.xpReward}
                  </p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </div>

              {chapter.status !== "locked" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Chapter Progress</span>
                    <span>{chapter.progress}%</span>
                  </div>
                  <Progress value={chapter.progress} className="h-2" />
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Button
                  disabled={chapter.status === "locked"}
                  variant={chapter.status === "available" ? "default" : "outline"}
                  size="sm"
                  data-testid={`button-chapter-${chapter.id}`}
                >
                  {chapter.status === "completed"
                    ? "Replay"
                    : chapter.status === "available"
                    ? "Continue"
                    : "Locked"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
