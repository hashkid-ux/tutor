import DerivationCanvas from '../DerivationCanvas'

export default function DerivationCanvasExample() {
  const steps = [
    {
      expression: 'd/dx(x²)',
      explanation: 'We start with the power rule for differentiation.',
    },
    {
      expression: '= 2x^(2-1)',
      explanation: 'Apply the power rule: bring down the exponent and subtract 1 from it.',
    },
    {
      expression: '= 2x¹',
      explanation: 'Simplify the exponent: 2-1 = 1',
    },
    {
      expression: '= 2x',
      explanation: 'Final result: the derivative of x² is 2x',
    },
  ]

  return <DerivationCanvas title="Power Rule: Derivative of x²" steps={steps} />
}
