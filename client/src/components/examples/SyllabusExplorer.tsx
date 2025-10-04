import SyllabusExplorer from '../SyllabusExplorer'

export default function SyllabusExplorerExample() {
  const units = [
    {
      id: 'unit1',
      title: 'Unit 1: Kinematics',
      progress: 75,
      topics: [
        { id: 't1', title: 'Motion in a Straight Line', status: 'completed' as const, hasDerivation: true, hasFormula: true },
        { id: 't2', title: 'Equations of Motion', status: 'completed' as const, hasDerivation: true, hasFormula: true },
        { id: 't3', title: 'Relative Velocity', status: 'available' as const, hasDerivation: true, hasVisualization: true },
      ],
    },
    {
      id: 'unit2',
      title: 'Unit 2: Laws of Motion',
      progress: 33,
      topics: [
        { id: 't4', title: 'Newton\'s First Law', status: 'completed' as const, hasVisualization: true },
        { id: 't5', title: 'Newton\'s Second Law', status: 'available' as const, hasDerivation: true, hasFormula: true },
        { id: 't6', title: 'Newton\'s Third Law', status: 'locked' as const, hasVisualization: true },
      ],
    },
  ]

  return <SyllabusExplorer subject="Physics" units={units} />
}
