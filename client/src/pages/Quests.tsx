import QuestCard from "@/components/QuestCard";

export default function Quests() {
  //todo: remove mock functionality
  const quests = [
    {
      title: "Master of Derivatives",
      description: "Complete all calculus challenges in Mathematics",
      progress: 2,
      maxProgress: 3,
      xpReward: 250,
      status: "active" as const,
      objectives: [
        "Complete chain rule tutorial",
        "Solve 5 derivative problems",
        "Pass the derivatives quiz",
      ],
    },
    {
      title: "Chemical Reactions Expert",
      description: "Learn all types of chemical reactions",
      progress: 0,
      maxProgress: 4,
      xpReward: 200,
      status: "active" as const,
      objectives: [
        "Study synthesis reactions",
        "Study decomposition reactions",
        "Study single replacement",
        "Complete reactions quiz",
      ],
    },
    {
      title: "Newton's Legacy",
      description: "Master all three laws of motion",
      progress: 3,
      maxProgress: 3,
      xpReward: 300,
      status: "completed" as const,
      objectives: [
        "Understand first law (inertia)",
        "Understand second law (F=ma)",
        "Understand third law (action-reaction)",
      ],
    },
    {
      title: "Algorithm Master",
      description: "Learn fundamental sorting algorithms",
      progress: 0,
      maxProgress: 5,
      xpReward: 350,
      status: "locked" as const,
      objectives: [
        "Learn bubble sort",
        "Learn merge sort",
        "Learn quick sort",
        "Implement all algorithms",
        "Pass algorithms test",
      ],
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Story Quests</h1>
        <p className="text-muted-foreground">
          Complete quests to unlock achievements and level up
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {quests.map((quest) => (
          <QuestCard key={quest.title} {...quest} />
        ))}
      </div>
    </div>
  );
}
