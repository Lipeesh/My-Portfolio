import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlesProps {
  count?: number
  spread?: number
  color?: string
  size?: number
  speed?: number
}

export default function Particles({
  count = 420,
  spread = 60,
  color = '#3B82F6',
  size = 0.055,
  speed = 1,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, phases }
  }, [count, spread])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime() * speed
    pointsRef.current.rotation.y = t * 0.018
    pointsRef.current.rotation.x = t * 0.009

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t + phases[i]) * 0.001
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
