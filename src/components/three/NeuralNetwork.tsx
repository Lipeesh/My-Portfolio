import { useRef, Suspense, useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useModelExists } from '../../hooks/useModelExists'
import { MODELS, IMAGES } from '../../config/assets'

export function NeuralFallback() {
  const groupRef = useRef<THREE.Group>(null!)
  const { nodes, linePoints } = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < 26; i++)
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 17,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 7
      ))
    const linePoints: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++)
        if (nodes[i].distanceTo(nodes[j]) < 5.8)
          linePoints.push([nodes[i], nodes[j]])
    return { nodes, linePoints }
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
  })

  const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4']
  return (
    <group ref={groupRef} position={[3, 0, -2]}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.09 + (i % 3) * 0.04, 10, 10]} />
          <meshStandardMaterial color={COLORS[i%3]} emissive={COLORS[i%3]} emissiveIntensity={0.55} />
        </mesh>
      ))}
      {linePoints.map(([a, b], i) => (
        <primitive key={i} object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([a, b]),
          new THREE.LineBasicMaterial({ color: '#3B82F6', transparent: true, opacity: 0.14 })
        )} />
      ))}
    </group>
  )
}

function NeuralGLB() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF(MODELS.neural)
  const aboutTex  = useTexture(IMAGES.about)

  scene.traverse((c) => {
    if ((c as THREE.Mesh).isMesh) {
      const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial
      if (m?.emissive) { m.emissive = new THREE.Color(0x3B82F6); m.emissiveIntensity = 0.5 }
    }
  })
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.06
  })

  return (
    <group ref={groupRef} position={[3, 0, -2]}>
      <mesh position={[-4, 1, 2]} rotation={[0, 0.4, 0]}>
        <planeGeometry args={[3.5, 2.2]} />
        <meshBasicMaterial map={aboutTex} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <primitive object={scene} scale={2.2} />
    </group>
  )
}

function NeuralSmart() {
  const exists = useModelExists(MODELS.neural)
  if (!exists) return <NeuralFallback />
  return <Suspense fallback={<NeuralFallback />}><NeuralGLB /></Suspense>
}

export default function NeuralNetwork() { return <NeuralSmart /> }
