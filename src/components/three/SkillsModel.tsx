import { useRef, Suspense, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useModelExists } from '../../hooks/useModelExists'
import { MODELS } from '../../config/assets'

const COLORS = ['#3B82F6','#8B5CF6','#06B6D4','#3B82F6','#8B5CF6','#06B6D4']

function Artifact({ index }: { index: number }) {
  const meshRef  = useRef<THREE.Mesh>(null!)
  const angleRef = useRef((index / 6) * Math.PI * 2)
  const color    = COLORS[index]

  const geo = useMemo(() => ([
    new THREE.OctahedronGeometry(0.5),
    new THREE.BoxGeometry(0.7, 0.7, 0.7),
    new THREE.IcosahedronGeometry(0.48),
    new THREE.TetrahedronGeometry(0.52),
    new THREE.TorusGeometry(0.38, 0.11, 8, 30),
    new THREE.ConeGeometry(0.38, 0.75, 8),
  ][index % 6]), [index])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    angleRef.current += 0.003 + index * 0.0008
    const a = angleRef.current, r = 4
    meshRef.current.position.set(
      Math.cos(a) * r,
      Math.sin(a * 0.7) * 1.8 + Math.sin(t + index) * 0.22,
      Math.sin(a) * r * 0.5
    )
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.013
    ;(meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.3 + Math.sin(t * 1.5 + index) * 0.18
  })

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} metalness={0.85} roughness={0.15} />
    </mesh>
  )
}

export function SkillsFallback() {
  return (
    <group position={[5, 0, 0]}>
      {[0,1,2,3,4,5].map(i => <Artifact key={i} index={i} />)}
    </group>
  )
}

function SkillsGLB() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF(MODELS.skills)

  scene.traverse((c) => {
    if ((c as THREE.Mesh).isMesh) {
      const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial
      if (m?.emissive) { m.emissive = new THREE.Color(0x8B5CF6); m.emissiveIntensity = 0.4 }
    }
  })
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.08
  })

  return (
    <group ref={groupRef} position={[5, 0, 0]}>
      <primitive object={scene} scale={1.5} />
    </group>
  )
}

function SkillsSmart() {
  const exists = useModelExists(MODELS.skills)
  if (!exists) return <SkillsFallback />
  return <Suspense fallback={<SkillsFallback />}><SkillsGLB /></Suspense>
}

export default function SkillsModel() { return <SkillsSmart /> }
