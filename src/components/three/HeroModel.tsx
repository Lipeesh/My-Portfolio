import { useRef, Suspense } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useModelExists } from '../../hooks/useModelExists'
import { MODELS, IMAGES } from '../../config/assets'   // ← all paths from one place

export function HeroFallback() {
  const groupRef = useRef<THREE.Group>(null!)
  const t1 = useRef<THREE.Mesh>(null!)
  const t2 = useRef<THREE.Mesh>(null!)
  const t3 = useRef<THREE.Mesh>(null!)
  const core = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) groupRef.current.position.y = Math.sin(t * 0.6) * 0.18
    if (t1.current) t1.current.rotation.z = t * 0.35
    if (t2.current) t2.current.rotation.z = -t * 0.22
    if (t3.current) { t3.current.rotation.x = t * 0.18; t3.current.rotation.y = t * 0.12 }
    if (core.current)
      (core.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.7 + Math.sin(t * 2.2) * 0.3
  })

  return (
    <group ref={groupRef}>
      <mesh ref={t1} rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 8, 120]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.55} />
      </mesh>
      <mesh ref={t2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 8, 120]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
      </mesh>
      <mesh ref={t3} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[2.9, 0.01, 8, 120]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.28} />
      </mesh>
      <mesh ref={core}>
        <sphereGeometry args={[0.88, 64, 64]} />
        <meshStandardMaterial color="#1d4ed8" emissive="#3B82F6" emissiveIntensity={0.9} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.0, 18, 18]} />
        <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.75, 32, 32]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function HeroGLB() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF(MODELS.hero)
  const bgTex    = useTexture(IMAGES.heroBg)

  scene.traverse((c) => {
    if ((c as THREE.Mesh).isMesh) {
      const mats = Array.isArray((c as THREE.Mesh).material)
        ? (c as THREE.Mesh).material as THREE.MeshStandardMaterial[]
        : [(c as THREE.Mesh).material as THREE.MeshStandardMaterial]
      mats.forEach(m => {
        if (m.emissive !== undefined) { m.emissive = new THREE.Color(0x3B82F6); m.emissiveIntensity = 0.4 }
      })
    }
  })

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y   = t * 0.12
    groupRef.current.position.y   = Math.sin(t * 0.6) * 0.15
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -8]} scale={[22, 14, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={bgTex} transparent opacity={0.65} depthWrite={false} />
      </mesh>
      <primitive object={scene} scale={1.8} />
    </group>
  )
}

function HeroModelSmart() {
  const exists = useModelExists(MODELS.hero)
  if (!exists) return <HeroFallback />
  return <Suspense fallback={<HeroFallback />}><HeroGLB /></Suspense>
}

export default function HeroModel() { return <HeroModelSmart /> }
