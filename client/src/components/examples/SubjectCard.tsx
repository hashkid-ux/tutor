import SubjectCard from '../SubjectCard'
import { Atom } from 'lucide-react'

export default function SubjectCardExample() {
  return (
    <SubjectCard
      name="Physics"
      icon={Atom}
      color="hsl(220, 90%, 60%)"
      progress={68}
      topics={24}
      completedTopics={16}
    />
  )
}
