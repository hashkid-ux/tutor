import QuestCard from '../QuestCard'

export default function QuestCardExample() {
  return (
    <QuestCard
      title="Master of Derivatives"
      description="Complete all calculus challenges in Mathematics"
      progress={2}
      maxProgress={3}
      xpReward={250}
      status="active"
      objectives={[
        'Complete chain rule tutorial',
        'Solve 5 derivative problems',
        'Pass the derivatives quiz',
      ]}
    />
  )
}
