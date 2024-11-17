export default function Fruit({
  name,
  color,
  emoji,
  showEmoji
}: {
  name: string
  color: string
  emoji: string
  showEmoji: boolean
}) {
  function displayEmoji(emoji: string): '' | JSX.Element {
    return showEmoji ? <span>{emoji}</span> : ''
  }

  return (
    <>
      <span style={{ color }}>{name}</span>

      {displayEmoji(emoji)}
    </>
  )
}
