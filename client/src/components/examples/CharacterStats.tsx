import CharacterStats from '../CharacterStats'

export default function CharacterStatsExample() {
  return (
    <CharacterStats
      name="Scholar"
      level={12}
      xp={850}
      maxXp={1200}
      intelligence={85}
      focus={72}
      accuracy={68}
      growth={90}
      title="Master of Sciences"
    />
  )
}
