import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Eye, Headphones, Zap } from "lucide-react";

interface SubjectProgress {
  name: string;
  mastery: number;
  color: string;
}

interface ProgressDashboardProps {
  subjects: SubjectProgress[];
  learningStyle: {
    visual: number;
    verbal: number;
    kinesthetic: number;
  };
  totalStudyTime: number;
  topicsCompleted: number;
}

export default function ProgressDashboard({
  subjects,
  learningStyle,
  totalStudyTime,
  topicsCompleted,
}: ProgressDashboardProps) {
  const maxLearningStyle = Math.max(
    learningStyle.visual,
    learningStyle.verbal,
    learningStyle.kinesthetic
  );

  return (
    <div className="grid gap-4 md:grid-cols-2" data-testid="component-progress-dashboard">
      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Subject Mastery</h3>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{subject.name}</span>
                <span className="text-muted-foreground">{subject.mastery}%</span>
              </div>
              <Progress
                value={subject.mastery}
                className="h-2"
                style={
                  {
                    "--progress-background": subject.color,
                  } as React.CSSProperties
                }
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Learning Style</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-chart-4" />
                <span className="font-medium">Visual</span>
              </div>
              <span className="text-muted-foreground">{learningStyle.visual}%</span>
            </div>
            <Progress value={learningStyle.visual} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-chart-2" />
                <span className="font-medium">Verbal</span>
              </div>
              <span className="text-muted-foreground">{learningStyle.verbal}%</span>
            </div>
            <Progress value={learningStyle.verbal} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-chart-5" />
                <span className="font-medium">Kinesthetic</span>
              </div>
              <span className="text-muted-foreground">
                {learningStyle.kinesthetic}%
              </span>
            </div>
            <Progress value={learningStyle.kinesthetic} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Study Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-3xl font-display font-bold text-primary">
              {totalStudyTime}h
            </p>
            <p className="text-sm text-muted-foreground">Total Study Time</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-display font-bold text-chart-3">
              {topicsCompleted}
            </p>
            <p className="text-sm text-muted-foreground">Topics Completed</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">
          Personalized Insights
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-primary/10 p-3">
            <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Strong Progress in Physics</p>
              <p className="text-xs text-muted-foreground">
                You're 25% ahead of the average pace
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-chart-5/10 p-3">
            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-chart-5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Visual Learner Detected</p>
              <p className="text-xs text-muted-foreground">
                We'll show more diagrams and animations
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
