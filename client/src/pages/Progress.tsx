import ProgressDashboard from "@/components/ProgressDashboard";

export default function Progress() {
  //todo: remove mock functionality
  const subjects = [
    { name: "Physics", mastery: 68, color: "hsl(220, 90%, 60%)" },
    { name: "Chemistry", mastery: 45, color: "hsl(165, 75%, 50%)" },
    { name: "Mathematics", mastery: 82, color: "hsl(265, 85%, 65%)" },
    { name: "Biology", mastery: 55, color: "hsl(145, 70%, 55%)" },
    { name: "Computer Science", mastery: 72, color: "hsl(195, 100%, 50%)" },
    { name: "Agriculture", mastery: 38, color: "hsl(90, 60%, 50%)" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and achievements</p>
      </div>

      <ProgressDashboard
        subjects={subjects}
        learningStyle={{ visual: 65, verbal: 25, kinesthetic: 10 }}
        totalStudyTime={47}
        topicsCompleted={128}
      />
    </div>
  );
}
