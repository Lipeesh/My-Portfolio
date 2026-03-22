import { useRef, Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useModelExists } from '../../hooks/useModelExists'
import { MODELS } from '../../config/assets'

export function AiCoreFallback() {
  const ringsRef = useRef<THREE.Group>(null!)
  const coreRef  = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ringsRef.current)
      ringsRef.current.children.forEach((c, i) => {
        const spd = (0.006 - i * 0.0005) * (i % 2 === 0 ? 1 : -1)
        ;(c as THREE.Mesh).rotation.z += spd
        ;(c as THREE.Mesh).rotation.x += spd * 0.4
      })
    if (coreRef.current)
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.9 + Math.sin(t * 3) * 0.45
  })

  return (
    <>
      <group ref={ringsRef}>
        {[1.5,2.0,2.5,3.0,3.5].map((r,i)=>(
          <mesh key={i} rotation={[i*0.4,0,i*0.6]}>
            <torusGeometry args={[r, 0.018, 8, 100]} />
            <meshBasicMaterial color={['#3B82F6','#8B5CF6','#06B6D4','#3B82F6','#8B5CF6'][i]}
              transparent opacity={0.42 - i*0.05} />
          </mesh>
        ))}
      </group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.65, 64, 64]} />
        <meshStandardMaterial color="#0d1b4e" emissive="#8B5CF6" emissiveIntensity={1.1} metalness={1} roughness={0} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.76, 16, 16]} />
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </>
  )
}

function AiCoreGLB() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF(MODELS.aiCore)

  scene.traverse((c) => {
    if ((c as THREE.Mesh).isMesh) {
      const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial
      if (m?.emissive) { m.emissive = new THREE.Color(0x8B5CF6); m.emissiveIntensity = 1.0 }
    }
  })
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.14
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08
  })

  return <group ref={groupRef}><primitive object={scene} scale={1.6} /></group>
}

function AiCoreSmart() {
  const exists = useModelExists(MODELS.aiCore)
  if (!exists) return <AiCoreFallback />
  return <Suspense fallback={<AiCoreFallback />}><AiCoreGLB /></Suspense>
}

export default function AiCore() { return <AiCoreSmart /> }
