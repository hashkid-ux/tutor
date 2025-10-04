import SyllabusExplorer from "@/components/SyllabusExplorer";
import FormulaExplorer from "@/components/FormulaExplorer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SubjectSyllabus() {
  //todo: remove mock functionality
  const physicsUnits = [
    {
      id: "unit1",
      title: "Unit 1: Kinematics",
      progress: 75,
      topics: [
        { id: "t1", title: "Motion in a Straight Line", status: "completed" as const, hasDerivation: true, hasFormula: true },
        { id: "t2", title: "Equations of Motion", status: "completed" as const, hasDerivation: true, hasFormula: true },
        { id: "t3", title: "Relative Velocity", status: "available" as const, hasDerivation: true, hasVisualization: true },
        { id: "t4", title: "Projectile Motion", status: "available" as const, hasDerivation: true, hasVisualization: true, hasFormula: true },
      ],
    },
    {
      id: "unit2",
      title: "Unit 2: Laws of Motion",
      progress: 33,
      topics: [
        { id: "t5", title: "Newton's First Law", status: "completed" as const, hasVisualization: true },
        { id: "t6", title: "Newton's Second Law", status: "available" as const, hasDerivation: true, hasFormula: true },
        { id: "t7", title: "Newton's Third Law", status: "locked" as const, hasVisualization: true },
        { id: "t8", title: "Friction and Dynamics", status: "locked" as const, hasFormula: true, hasVisualization: true },
      ],
    },
    {
      id: "unit3",
      title: "Unit 3: Work, Energy and Power",
      progress: 0,
      topics: [
        { id: "t9", title: "Work and Energy", status: "locked" as const, hasDerivation: true, hasFormula: true },
        { id: "t10", title: "Conservation of Energy", status: "locked" as const, hasDerivation: true, hasVisualization: true },
        { id: "t11", title: "Power", status: "locked" as const, hasFormula: true },
      ],
    },
  ];

  const chemistryUnits = [
    {
      id: "unit1",
      title: "Unit 1: Atomic Structure",
      progress: 50,
      topics: [
        { id: "c1", title: "Atomic Models", status: "completed" as const, hasVisualization: true },
        { id: "c2", title: "Quantum Numbers", status: "available" as const, hasFormula: true },
        { id: "c3", title: "Electronic Configuration", status: "locked" as const, hasFormula: true },
      ],
    },
    {
      id: "unit2",
      title: "Unit 2: Chemical Bonding",
      progress: 25,
      topics: [
        { id: "c4", title: "Ionic Bonding", status: "completed" as const, hasVisualization: true },
        { id: "c5", title: "Covalent Bonding", status: "available" as const, hasVisualization: true, hasFormula: true },
        { id: "c6", title: "Molecular Orbital Theory", status: "locked" as const, hasDerivation: true },
      ],
    },
  ];

  const formulas = [
    {
      subject: "Physics",
      formula: "F = ma",
      name: "Newton's Second Law",
      explanation: "Force equals mass times acceleration. This fundamental law describes how the motion of an object changes when forces are applied.",
      variables: [
        { symbol: "F", meaning: "Force", unit: "Newton (N)" },
        { symbol: "m", meaning: "Mass", unit: "Kilogram (kg)" },
        { symbol: "a", meaning: "Acceleration", unit: "m/s²" },
      ],
      application: "Used to calculate the force needed to accelerate an object, design vehicle braking systems, and analyze rocket propulsion.",
    },
    {
      subject: "Physics",
      formula: "v² = u² + 2as",
      name: "Third Equation of Motion",
      explanation: "Relates final velocity, initial velocity, acceleration, and displacement without involving time.",
      variables: [
        { symbol: "v", meaning: "Final velocity", unit: "m/s" },
        { symbol: "u", meaning: "Initial velocity", unit: "m/s" },
        { symbol: "a", meaning: "Acceleration", unit: "m/s²" },
        { symbol: "s", meaning: "Displacement", unit: "m" },
      ],
      application: "Essential for solving problems involving motion where time is unknown, such as finding stopping distance of vehicles.",
    },
    {
      subject: "Chemistry",
      formula: "PV = nRT",
      name: "Ideal Gas Law",
      explanation: "The ideal gas law relates pressure, volume, temperature, and amount of gas particles in a system.",
      variables: [
        { symbol: "P", meaning: "Pressure", unit: "Pascal (Pa)" },
        { symbol: "V", meaning: "Volume", unit: "Cubic meter (m³)" },
        { symbol: "n", meaning: "Amount of substance", unit: "Mole (mol)" },
        { symbol: "R", meaning: "Gas constant", unit: "8.314 J/(mol·K)" },
        { symbol: "T", meaning: "Temperature", unit: "Kelvin (K)" },
      ],
      application: "Essential for understanding gas behavior, chemical reactions involving gases, and industrial processes.",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Complete Syllabus</h1>
        <p className="text-muted-foreground">
          Comprehensive coverage with derivations, formulas, and visualizations
        </p>
      </div>

      <Tabs defaultValue="physics" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="math">Math</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
          <TabsTrigger value="cs">CS</TabsTrigger>
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
        </TabsList>

        <TabsContent value="physics" className="mt-6">
          <SyllabusExplorer subject="Physics" units={physicsUnits} />
        </TabsContent>

        <TabsContent value="chemistry" className="mt-6">
          <SyllabusExplorer subject="Chemistry" units={chemistryUnits} />
        </TabsContent>

        <TabsContent value="math" className="mt-6">
          <SyllabusExplorer
            subject="Mathematics"
            units={[
              {
                id: "m1",
                title: "Unit 1: Calculus",
                progress: 60,
                topics: [
                  { id: "m1", title: "Limits and Continuity", status: "completed" as const, hasDerivation: true },
                  { id: "m2", title: "Derivatives", status: "available" as const, hasDerivation: true, hasFormula: true },
                  { id: "m3", title: "Integration", status: "locked" as const, hasDerivation: true, hasFormula: true },
                ],
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="biology" className="mt-6">
          <SyllabusExplorer
            subject="Biology"
            units={[
              {
                id: "b1",
                title: "Unit 1: Cell Biology",
                progress: 40,
                topics: [
                  { id: "b1", title: "Cell Structure", status: "completed" as const, hasVisualization: true },
                  { id: "b2", title: "Cell Division", status: "available" as const, hasVisualization: true },
                  { id: "b3", title: "Biomolecules", status: "locked" as const, hasFormula: true },
                ],
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="cs" className="mt-6">
          <SyllabusExplorer
            subject="Computer Science"
            units={[
              {
                id: "cs1",
                title: "Unit 1: Programming Fundamentals",
                progress: 55,
                topics: [
                  { id: "cs1", title: "Data Structures", status: "completed" as const, hasVisualization: true },
                  { id: "cs2", title: "Algorithms", status: "available" as const, hasVisualization: true },
                  { id: "cs3", title: "Time Complexity", status: "locked" as const, hasFormula: true },
                ],
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="formulas" className="mt-6">
          <FormulaExplorer formulas={formulas} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
