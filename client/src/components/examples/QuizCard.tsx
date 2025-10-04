import QuizCard from '../QuizCard'

export default function QuizCardExample() {
  return (
    <QuizCard
      question="What is the derivative of sin(x)?"
      options={[
        'cos(x)',
        '-cos(x)',
        'tan(x)',
        '-sin(x)',
      ]}
      correctAnswer={0}
      difficulty="medium"
      timeLimit={45}
    />
  )
}
