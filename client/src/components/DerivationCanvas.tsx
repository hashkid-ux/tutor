import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface DerivationStep {
  expression: string;
  explanation: string;
  highlighted?: string[];
}

interface DerivationCanvasProps {
  title: string;
  steps: DerivationStep[];
}

export default function DerivationCanvas({ title, steps }: DerivationCanvasProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
  };

  return (
    <Card className="overflow-hidden" data-testid="component-derivation-canvas">
      <div className="border-b bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <Badge variant="secondary">
            Step {currentStep + 1} of {steps.length}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 min-h-[120px] rounded-lg bg-muted/30 p-6 font-mono text-2xl">
          <div className="flex items-center justify-center">
            {steps[currentStep].expression}
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-primary/10 p-4">
          <p className="text-sm leading-relaxed">{steps[currentStep].explanation}</p>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            disabled={currentStep === 0}
            data-testid="button-reset-derivation"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              disabled={currentStep === 0}
              data-testid="button-prev-step"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              data-testid="button-next-step"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
