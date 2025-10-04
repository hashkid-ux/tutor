import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizCardProps {
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
  timeLimit?: number;
}

const difficultyColors = {
  easy: "hsl(var(--chart-3))",
  medium: "hsl(var(--chart-5))",
  hard: "hsl(var(--destructive))",
};

export default function QuizCard({
  question,
  options,
  correctAnswer,
  difficulty,
  timeLimit = 60,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const isCorrect = submitted && parseInt(selectedAnswer) === correctAnswer;
  const isIncorrect = submitted && parseInt(selectedAnswer) !== correctAnswer;

  return (
    <Card className="overflow-hidden" data-testid="component-quiz-card">
      <div className="border-b bg-muted/50 p-4">
        <div className="flex items-center justify-between gap-4">
          <Badge
            variant="outline"
            className="capitalize"
            style={{
              borderColor: difficultyColors[difficulty],
              color: difficultyColors[difficulty],
            }}
          >
            {difficulty}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <h3 className="font-display text-lg font-semibold leading-relaxed">
          {question}
        </h3>

        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          <div className="space-y-3">
            {options.map((option, index) => {
              const isThisCorrect = index === correctAnswer;
              const isSelected = parseInt(selectedAnswer) === index;

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-all hover-elevate ${
                    submitted && isThisCorrect
                      ? "border-chart-3 bg-chart-3/10"
                      : submitted && isSelected && !isThisCorrect
                      ? "border-destructive bg-destructive/10"
                      : ""
                  }`}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    disabled={submitted}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option}
                  </Label>
                  {submitted && isThisCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-chart-3" />
                  )}
                  {submitted && isSelected && !isThisCorrect && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              );
            })}
          </div>
        </RadioGroup>

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full"
            data-testid="button-submit-quiz"
          >
            Submit Answer
          </Button>
        ) : (
          <div
            className={`rounded-lg p-4 ${
              isCorrect ? "bg-chart-3/10 text-chart-3" : "bg-destructive/10 text-destructive"
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? "Correct! +50 XP" : "Incorrect. Try again!"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
