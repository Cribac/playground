import { useState } from 'react'

export default function CursorContainer() {
  const [position, setPosition] = useState({
    isLeftHalf: false,
    isRightHalf: false
  })

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { target } = event
    const node = target as HTMLElement
    const rect = node.getBoundingClientRect()
    const { left, width } = rect

    const x = event.clientX - left

    const roundedHalfWidth = Math.round(width / 2)

    const isLeftHalf = x < roundedHalfWidth
    const isRightHalf = x > roundedHalfWidth

    setPosition({ isLeftHalf, isRightHalf })
  }

  function handleMouseLeave() {
    setPosition({ isLeftHalf: false, isRightHalf: false })
  }

  return (
    <div
      className={'bg-slate-600 p-4 text-2xl font-bold w-1/2 h-1/2 p-4'.concat(
        position.isLeftHalf
          ? ' cursor-fancy-left'
          : position.isRightHalf
          ? ' cursor-fancy-right'
          : ''
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => console.log('clicked')}
    >
      Hi mum: {position.isLeftHalf ? 'left' : position.isRightHalf ? 'right' : ''}
    </div>
  )
}
