import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, BookOpen, Loader2 } from "lucide-react";
import DerivationCanvas from "@/components/DerivationCanvas";

interface Doubt {
  id: string;
  userId: string;
  question: string;
  response: string;
  timestamp: string;
}

interface Derivation {
  id: string;
  userId: string;
  topic: string;
  steps: Array<{ expression: string; explanation: string }>;
  timestamp: string;
}

export default function DoubtsDerivations() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [doubtQuestion, setDoubtQuestion] = useState("");
  const [derivationTopic, setDerivationTopic] = useState("");

  const { data: doubts, isLoading: isLoadingDoubts } = useQuery<Doubt[]>({
    queryKey: ["/api/doubts"],
  });

  const { data: derivations, isLoading: isLoadingDerivations } = useQuery<Derivation[]>({
    queryKey: ["/api/derivations"],
  });

  const askDoubtMutation = useMutation({
    mutationFn: async (question: string) => {
      const res = await apiRequest("POST", "/api/doubts", { question });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/doubts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setDoubtQuestion("");
      toast({
        title: "Doubt answered!",
        description: "Your doubt has been processed by the AI tutor.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const requestDerivationMutation = useMutation({
    mutationFn: async (topic: string) => {
      const res = await apiRequest("POST", "/api/derivations", { topic });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/derivations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setDerivationTopic("");
      toast({
        title: "Derivation created!",
        description: "Your derivation has been generated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAskDoubt = () => {
    if (!doubtQuestion.trim()) return;
    askDoubtMutation.mutate(doubtQuestion);
  };

  const handleRequestDerivation = () => {
    if (!derivationTopic.trim()) return;
    requestDerivationMutation.mutate(derivationTopic);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Doubts & Derivations</h1>
        <p className="text-muted-foreground">Free features - unlimited for all users</p>
      </div>

      <Tabs defaultValue="doubts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="doubts" data-testid="tab-doubts">
            <AlertCircle className="mr-2 h-4 w-4" />
            Ask a Doubt
          </TabsTrigger>
          <TabsTrigger value="derivations" data-testid="tab-derivations">
            <BookOpen className="mr-2 h-4 w-4" />
            Request Derivation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="doubts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ask Your Doubt</CardTitle>
              <CardDescription>
                Get instant AI-powered answers to your questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's your doubt? Ask anything from Physics, Chemistry, Math, or any other subject..."
                value={doubtQuestion}
                onChange={(e) => setDoubtQuestion(e.target.value)}
                rows={4}
                data-testid="input-doubt-question"
              />
              <Button
                onClick={handleAskDoubt}
                disabled={askDoubtMutation.isPending || !doubtQuestion.trim()}
                data-testid="button-ask-doubt"
              >
                {askDoubtMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Ask Doubt"
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold">Your Recent Doubts</h2>
            {isLoadingDoubts ? (
              <div className="space-y-3">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : doubts && doubts.length > 0 ? (
              doubts.map((doubt) => (
                <Card key={doubt.id} data-testid={`card-doubt-${doubt.id}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{doubt.question}</CardTitle>
                    <CardDescription>
                      {new Date(doubt.timestamp).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{doubt.response}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No doubts yet. Ask your first doubt above!
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="derivations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request a Derivation</CardTitle>
              <CardDescription>
                Get step-by-step mathematical and scientific derivations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter the topic or formula you want derived (e.g., 'Derive Quadratic Formula', 'Newton's Second Law derivation')"
                value={derivationTopic}
                onChange={(e) => setDerivationTopic(e.target.value)}
                rows={4}
                data-testid="input-derivation-topic"
              />
              <Button
                onClick={handleRequestDerivation}
                disabled={requestDerivationMutation.isPending || !derivationTopic.trim()}
                data-testid="button-request-derivation"
              >
                {requestDerivationMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Request Derivation"
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold">Your Derivations</h2>
            {isLoadingDerivations ? (
              <div className="space-y-3">
                <Skeleton className="h-64 w-full" />
              </div>
            ) : derivations && derivations.length > 0 ? (
              derivations.map((derivation) => (
                <div key={derivation.id} data-testid={`card-derivation-${derivation.id}`}>
                  <DerivationCanvas
                    title={derivation.topic}
                    steps={derivation.steps}
                  />
                </div>
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No derivations yet. Request your first derivation above!
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {user && (
        <Card className="border-primary">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Subscription: {user.subscriptionTier}</p>
                <p className="text-xs text-muted-foreground">
                  {user.subscriptionTier === "free"
                    ? "Doubts & Derivations are free and unlimited!"
                    : "You have unlimited access to all features"}
                </p>
              </div>
              <Badge variant="secondary">Free Features</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
