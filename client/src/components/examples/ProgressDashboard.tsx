import ProgressDashboard from '../ProgressDashboard'

export default function ProgressDashboardExample() {
  const subjects = [
    { name: 'Physics', mastery: 68, color: 'hsl(220, 90%, 60%)' },
    { name: 'Chemistry', mastery: 45, color: 'hsl(165, 75%, 50%)' },
    { name: 'Mathematics', mastery: 82, color: 'hsl(265, 85%, 65%)' },
    { name: 'Biology', mastery: 55, color: 'hsl(145, 70%, 55%)' },
  ]

  return (
    <ProgressDashboard
      subjects={subjects}
      learningStyle={{ visual: 65, verbal: 25, kinesthetic: 10 }}
      totalStudyTime={47}
      topicsCompleted={128}
    />
  )
}
