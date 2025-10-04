import StoryMode from '../StoryMode'

export default function StoryModeExample() {
  const chapters = [
    {
      id: 'ch1',
      title: 'The Beginning: Forces and Motion',
      description: 'Discover the fundamental laws that govern motion in our universe',
      subject: 'Physics',
      status: 'completed' as const,
      progress: 100,
      xpReward: 500,
    },
    {
      id: 'ch2',
      title: 'Energy Unleashed',
      description: 'Master the concepts of kinetic and potential energy',
      subject: 'Physics',
      status: 'available' as const,
      progress: 45,
      xpReward: 750,
    },
    {
      id: 'ch3',
      title: 'The Atomic Realm',
      description: 'Journey into the world of atoms and molecules',
      subject: 'Chemistry',
      status: 'locked' as const,
      progress: 0,
      xpReward: 600,
    },
  ]

  return <StoryMode chapters={chapters} currentChapter="ch2" />
}
