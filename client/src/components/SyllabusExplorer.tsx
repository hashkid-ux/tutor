import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Circle, Lock, BookOpen } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  status: "locked" | "available" | "completed";
  hasDerivation?: boolean;
  hasFormula?: boolean;
  hasVisualization?: boolean;
}

interface Unit {
  id: string;
  title: string;
  topics: Topic[];
  progress: number;
}

interface SyllabusExplorerProps {
  subject: string;
  units: Unit[];
}

export default function SyllabusExplorer({ subject, units }: SyllabusExplorerProps) {
  const totalTopics = units.reduce((sum, unit) => sum + unit.topics.length, 0);
  const completedTopics = units.reduce(
    (sum, unit) => sum + unit.topics.filter((t) => t.status === "completed").length,
    0
  );
  const overallProgress = (completedTopics / totalTopics) * 100;

  return (
    <Card className="overflow-hidden" data-testid="component-syllabus-explorer">
      <div className="border-b bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-4/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-2xl font-bold">{subject} Syllabus</h3>
            <p className="text-sm text-muted-foreground">
              {completedTopics} / {totalTopics} topics completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-primary">
              {Math.round(overallProgress)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall Progress</p>
          </div>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </div>

      <div className="p-6">
        <Accordion type="multiple" className="space-y-4">
          {units.map((unit) => (
            <AccordionItem key={unit.id} value={unit.id} className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline hover-elevate">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <h4 className="font-display font-semibold">{unit.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {unit.topics.filter((t) => t.status === "completed").length} /{" "}
                        {unit.topics.length} topics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <Progress value={unit.progress} className="h-1.5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground min-w-[3rem] text-right">
                      {unit.progress}%
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2 pt-2">
                  {unit.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={`flex items-center justify-between gap-4 rounded-lg border p-3 transition-all ${
                        topic.status === "locked"
                          ? "opacity-50"
                          : "hover-elevate cursor-pointer"
                      }`}
                      data-testid={`topic-${topic.id}`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {topic.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-chart-3" />
                        ) : topic.status === "locked" ? (
                          <Lock className="h-5 w-5 shrink-0 text-muted-foreground" />
                        ) : (
                          <Circle className="h-5 w-5 shrink-0 text-primary" />
                        )}
                        <span className="text-sm font-medium">{topic.title}</span>
                      </div>
                      <div className="flex gap-1">
                        {topic.hasDerivation && (
                          <Badge variant="secondary" className="text-xs">
                            Derivation
                          </Badge>
                        )}
                        {topic.hasFormula && (
                          <Badge variant="secondary" className="text-xs">
                            Formula
                          </Badge>
                        )}
                        {topic.hasVisualization && (
                          <Badge variant="secondary" className="text-xs">
                            3D
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Card>
  );
}
