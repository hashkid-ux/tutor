import { useState } from "react";
import SubjectCard from "@/components/SubjectCard";
import QuestCard from "@/components/QuestCard";
import AchievementBadge from "@/components/AchievementBadge";
import ChatInterface from "@/components/ChatInterface";
import MultimodalInput from "@/components/MultimodalInput";
import DerivationCanvas from "@/components/DerivationCanvas";
import QuizCard from "@/components/QuizCard";
import VisualizationCanvas from "@/components/VisualizationCanvas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Atom, Beaker, Calculator, Leaf, Binary, Award, Sparkles, BookOpen } from "lucide-react";

export default function Home() {
  //todo: remove mock functionality
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant" as const,
      content: "Hello! I'm your AI tutor. What would you like to learn today? I can help with any subject from Physics to Computer Science!",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      role: "user" as const,
      content: "Can you explain Newton's laws of motion with visualizations?",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      role: "assistant" as const,
      content: "Great question! Let me break down Newton's three laws with interactive 3D visualizations. I'll also create a quiz to test your understanding!",
      timestamp: new Date(Date.now() - 180000),
      type: "visualization" as const,
    },
  ]);

  const subjects = [
    { name: "Physics", icon: Atom, color: "hsl(220, 90%, 60%)", progress: 68, topics: 24, completedTopics: 16 },
    { name: "Chemistry", icon: Beaker, color: "hsl(165, 75%, 50%)", progress: 45, topics: 20, completedTopics: 9 },
    { name: "Mathematics", icon: Calculator, color: "hsl(265, 85%, 65%)", progress: 82, topics: 30, completedTopics: 25 },
    { name: "Biology", icon: Leaf, color: "hsl(145, 70%, 55%)", progress: 55, topics: 18, completedTopics: 10 },
    { name: "Computer Science", icon: Binary, color: "hsl(195, 100%, 50%)", progress: 72, topics: 22, completedTopics: 16 },
  ];

  const derivationSteps = [
    { expression: "d/dx(x²)", explanation: "We start with the power rule for differentiation." },
    { expression: "= 2x^(2-1)", explanation: "Apply the power rule: bring down the exponent and subtract 1 from it." },
    { expression: "= 2x¹", explanation: "Simplify the exponent: 2-1 = 1" },
    { expression: "= 2x", explanation: "Final result: the derivative of x² is 2x" },
  ];

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: message,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "I understand your question. Let me create an interactive explanation with visualizations and practice problems!",
        timestamp: new Date(),
        type: "visualization" as const,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">Continue your learning journey</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold">Your Subjects</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {subjects.map((subject) => (
                <SubjectCard key={subject.name} {...subject} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold">Active Quest</h2>
            <QuestCard
              title="Master of Derivatives"
              description="Complete all calculus challenges in Mathematics"
              progress={2}
              maxProgress={3}
              xpReward={250}
              status="active"
              objectives={[
                "Complete chain rule tutorial",
                "Solve 5 derivative problems",
                "Pass the derivatives quiz",
              ]}
            />
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold">Learning Tools</h2>
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="chat">AI Chat</TabsTrigger>
                <TabsTrigger value="derivation">Derivation</TabsTrigger>
                <TabsTrigger value="visualization">3D View</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-4 space-y-4">
                <div className="h-[400px] rounded-lg border bg-card p-4">
                  <ChatInterface messages={messages} />
                </div>
                <MultimodalInput
                  onSend={handleSendMessage}
                  onVoiceToggle={() => console.log("Voice toggled")}
                  onImageUpload={(file) => console.log("Image uploaded:", file.name)}
                  onScreenShare={() => console.log("Screen share started")}
                />
              </TabsContent>

              <TabsContent value="derivation" className="mt-4">
                <DerivationCanvas title="Power Rule: Derivative of x²" steps={derivationSteps} />
              </TabsContent>

              <TabsContent value="visualization" className="mt-4">
                <VisualizationCanvas
                  title="Newton's First Law"
                  description="Interactive 3D demonstration of inertia"
                />
              </TabsContent>

              <TabsContent value="quiz" className="mt-4">
                <QuizCard
                  question="What is the derivative of sin(x)?"
                  options={["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"]}
                  correctAnswer={0}
                  difficulty="medium"
                  timeLimit={45}
                />
              </TabsContent>
            </Tabs>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold flex items-center gap-2">
              <Award className="h-6 w-6 text-chart-5" />
              Achievements
            </h2>
            <div className="space-y-3">
              <AchievementBadge
                title="Week Warrior"
                description="Maintain a 7-day learning streak"
                icon={Sparkles}
                tier="gold"
                unlocked={true}
              />
              <AchievementBadge
                title="Quick Learner"
                description="Complete 10 topics in one week"
                icon={BookOpen}
                tier="silver"
                unlocked={true}
              />
              <AchievementBadge
                title="Subject Master"
                description="Achieve 100% mastery in any subject"
                icon={Award}
                tier="gold"
                unlocked={false}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
