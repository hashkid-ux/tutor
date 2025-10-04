import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Lightbulb, Play } from "lucide-react";

interface Formula {
  subject: string;
  formula: string;
  name: string;
  explanation: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
  application: string;
}

interface FormulaExplorerProps {
  formulas: Formula[];
}

export default function FormulaExplorer({ formulas }: FormulaExplorerProps) {
  return (
    <div className="space-y-4" data-testid="component-formula-explorer">
      {formulas.map((formula, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="border-b bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline">{formula.subject}</Badge>
                <h3 className="font-display text-lg font-semibold">{formula.name}</h3>
              </div>
              <Button size="sm" variant="default" data-testid="button-view-derivation">
                <Play className="h-4 w-4 mr-2" />
                View Derivation
              </Button>
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="formula" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="formula">Formula</TabsTrigger>
                <TabsTrigger value="variables">Variables</TabsTrigger>
                <TabsTrigger value="application">Application</TabsTrigger>
              </TabsList>

              <TabsContent value="formula" className="mt-4 space-y-4">
                <div className="flex items-center justify-center rounded-lg bg-primary/10 p-8">
                  <div className="font-mono text-3xl font-bold text-primary">
                    {formula.formula}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm leading-relaxed">{formula.explanation}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="variables" className="mt-4">
                <div className="space-y-3">
                  {formula.variables.map((variable, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 rounded-lg border p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <span className="font-mono text-lg font-bold text-primary">
                          {variable.symbol}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{variable.meaning}</p>
                        {variable.unit && (
                          <p className="text-xs text-muted-foreground">
                            Unit: {variable.unit}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="application" className="mt-4">
                <div className="rounded-lg bg-chart-3/10 p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-chart-3" />
                    <p className="text-sm leading-relaxed">{formula.application}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      ))}
    </div>
  );
}
