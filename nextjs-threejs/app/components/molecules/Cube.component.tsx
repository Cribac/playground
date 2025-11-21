'use client'

import * as THREE from 'three'
import { useRef, useState } from 'react'
import { ThreeElements, useFrame } from '@react-three/fiber'

interface CubeProps {
  meshProps: ThreeElements['mesh']
  rotate?: boolean
  direction?: 'up' | 'down'
}

export default function Cube({
  meshProps,
  rotate = true,
  direction = 'up',
}: CubeProps) {
  const cubeRef = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    switch (direction) {
      case 'up':
        return (
          cubeRef.current && rotate && (cubeRef.current.rotation.x += delta)
        )
      case 'down':
        return (
          cubeRef.current && rotate && (cubeRef.current.rotation.x -= delta)
        )
    }
  })
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  return (
    <mesh
      {...meshProps}
      ref={cubeRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
    </mesh>
  )
}
