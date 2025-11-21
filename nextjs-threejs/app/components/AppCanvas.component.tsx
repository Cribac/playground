'use client'

import { Canvas } from '@react-three/fiber'
import CanvasWrapper from '@/app/components/atoms/CanvasWrapper.component'

interface IAppCanvasProps {
  children: React.ReactNode
}

export default function AppCanvas({ children }: IAppCanvasProps) {
  return (
    <CanvasWrapper>
      <Canvas>{children}</Canvas>
    </CanvasWrapper>
  )
}
