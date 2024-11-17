import Fruit from './Fruit'

export default function Fruits({
  fruits,
  handleRemove,
  showEmoji
}: {
  fruits: { name: string; color: string; emoji: string }[]
  handleRemove: (name: string) => void
  showEmoji: boolean
}) {
  const fruitsMap = fruits.map(({ name, color, emoji }) => (
    <li key={name}>
      <Fruit
        name={name}
        color={color}
        emoji={emoji}
        showEmoji={showEmoji}
      />

      <button onClick={() => handleRemove(name)}>Remove</button>
    </li>
  ))

  return (
    <>
      <h1>Fruits:</h1>

      <ul>{fruitsMap}</ul>
    </>
  )
}
