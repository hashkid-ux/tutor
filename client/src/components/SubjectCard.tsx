import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  name: string;
  icon: LucideIcon;
  color: string;
  progress: number;
  topics: number;
  completedTopics: number;
}

export default function SubjectCard({
  name,
  icon: Icon,
  color,
  progress,
  topics,
  completedTopics,
}: SubjectCardProps) {
  return (
    <Card
      className="group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all"
      data-testid={`card-subject-${name.toLowerCase()}`}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
          <div className="text-right">
            <div className="text-2xl font-display font-bold" style={{ color }}>
              {progress}%
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {completedTopics} / {topics} topics completed
          </p>
        </div>

        <Progress value={progress} className="h-1.5" />
      </div>
    </Card>
  );
}
