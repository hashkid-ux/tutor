import StoryMode from "@/components/StoryMode";

export default function StoryModePage() {
  //todo: remove mock functionality
  const chapters = [
    {
      id: "ch1",
      title: "The Beginning: Forces and Motion",
      description: "Discover the fundamental laws that govern motion in our universe. Learn about Newton's laws through interactive storytelling.",
      subject: "Physics",
      status: "completed" as const,
      progress: 100,
      xpReward: 500,
    },
    {
      id: "ch2",
      title: "Energy Unleashed",
      description: "Master the concepts of kinetic and potential energy. Understand work-energy theorem through real-world scenarios.",
      subject: "Physics",
      status: "available" as const,
      progress: 45,
      xpReward: 750,
    },
    {
      id: "ch3",
      title: "The Atomic Realm",
      description: "Journey into the world of atoms and molecules. Explore atomic structure and chemical bonding.",
      subject: "Chemistry",
      status: "available" as const,
      progress: 20,
      xpReward: 600,
    },
    {
      id: "ch4",
      title: "Derivatives: The Rate of Change",
      description: "Unlock the power of calculus. Learn how derivatives describe change in the world around us.",
      subject: "Mathematics",
      status: "locked" as const,
      progress: 0,
      xpReward: 800,
    },
    {
      id: "ch5",
      title: "The Living Cell",
      description: "Dive into the microscopic world of cells. Understand the building blocks of life.",
      subject: "Biology",
      status: "locked" as const,
      progress: 0,
      xpReward: 550,
    },
    {
      id: "ch6",
      title: "Algorithms and Logic",
      description: "Think like a computer. Master fundamental algorithms and problem-solving techniques.",
      subject: "Computer Science",
      status: "locked" as const,
      progress: 0,
      xpReward: 700,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Story Mode</h1>
        <p className="text-muted-foreground">
          Embark on an epic learning adventure across all subjects
        </p>
      </div>

      <StoryMode chapters={chapters} currentChapter="ch2" />
    </div>
  );
}
