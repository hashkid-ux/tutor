import FormulaExplorer from '../FormulaExplorer'

export default function FormulaExplorerExample() {
  const formulas = [
    {
      subject: 'Physics',
      formula: 'F = ma',
      name: "Newton's Second Law",
      explanation: 'Force equals mass times acceleration. This fundamental law describes how the motion of an object changes when forces are applied.',
      variables: [
        { symbol: 'F', meaning: 'Force', unit: 'Newton (N)' },
        { symbol: 'm', meaning: 'Mass', unit: 'Kilogram (kg)' },
        { symbol: 'a', meaning: 'Acceleration', unit: 'm/s²' },
      ],
      application: 'Used to calculate the force needed to accelerate an object, design vehicle braking systems, and analyze rocket propulsion.',
    },
    {
      subject: 'Chemistry',
      formula: 'PV = nRT',
      name: 'Ideal Gas Law',
      explanation: 'The ideal gas law relates pressure, volume, temperature, and amount of gas particles in a system.',
      variables: [
        { symbol: 'P', meaning: 'Pressure', unit: 'Pascal (Pa)' },
        { symbol: 'V', meaning: 'Volume', unit: 'Cubic meter (m³)' },
        { symbol: 'n', meaning: 'Amount of substance', unit: 'Mole (mol)' },
        { symbol: 'R', meaning: 'Gas constant', unit: '8.314 J/(mol·K)' },
        { symbol: 'T', meaning: 'Temperature', unit: 'Kelvin (K)' },
      ],
      application: 'Essential for understanding gas behavior, chemical reactions involving gases, and industrial processes.',
    },
  ]

  return <FormulaExplorer formulas={formulas} />
}
