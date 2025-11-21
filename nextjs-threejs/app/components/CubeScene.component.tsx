'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CubeScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return
    // init three.js scene here using containerRef.current
    const currentContainerRef = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)
    camera.position.z = 5

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: '#ffcc00' })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Render the scene and camera
    renderer.render(scene, camera)

    const renderScene = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
      requestAnimationFrame(renderScene)
    }

    // Call the renderScene function to start the animation loop
    renderScene()

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component is unmounted
    return () => {
      if (currentContainerRef) {
        window.removeEventListener('resize', handleResize)
        currentContainerRef.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} />
}
