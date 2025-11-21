export default function CanvasWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      id='canvas-wrapper'
      className='w-full h-full'
    >
      {children}
    </div>
  )
}
