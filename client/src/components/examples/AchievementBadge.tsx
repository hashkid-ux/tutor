import AchievementBadge from '../AchievementBadge'
import { Flame } from 'lucide-react'

export default function AchievementBadgeExample() {
  return (
    <AchievementBadge
      title="Week Warrior"
      description="Maintain a 7-day learning streak"
      icon={Flame}
      tier="gold"
      unlocked={true}
    />
  )
}
