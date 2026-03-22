import { useRef, Suspense, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useModelExists } from '../../hooks/useModelExists'
import { MODELS, IMAGES } from '../../config/assets'

const POSITIONS: [number,number,number][] = [[-3.2,0,0],[-1.1,0.6,-1.8],[1.1,-0.3,-1.8],[3.2,0.3,0]]
const ROTATIONS: [number,number,number][] = [[0,0.45,0],[0,0.18,0],[0,-0.18,0],[0,-0.45,0]]
const COLORS = ['#3B82F6','#8B5CF6','#06B6D4','#3B82F6']

function FloatingPanel({ pos, rot, index, color, tex }: {
  pos:[number,number,number], rot:[number,number,number],
  index:number, color:string, tex?:THREE.Texture
}) {
  const ref  = useRef<THREE.Group>(null!)
  const [hov, setHov] = useState(false)
  const baseY = pos[1]

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = baseY + Math.sin(clock.getElapsedTime() * 0.7 + index * 1.2) * 0.18
    const s = hov ? 1.07 : 1.0
    ref.current.scale.lerp(new THREE.Vector3(s,s,s), 0.1)
  })

  return (
    <group ref={ref} position={pos} rotation={rot}
      onPointerEnter={()=>setHov(true)} onPointerLeave={()=>setHov(false)}>
      {tex && (
        <mesh>
          <planeGeometry args={[2.1, 2.9]} />
          <meshBasicMaterial map={tex} transparent opacity={hov ? 0.88 : 0.7} side={THREE.DoubleSide} />
        </mesh>
      )}
      <mesh>
        <planeGeometry args={[2.1, 2.9]} />
        <meshBasicMaterial color={color} transparent opacity={hov ? 0.10 : 0.05} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.1, 2.9)]} />
        <lineBasicMaterial color={hov ? '#06B6D4' : color} transparent opacity={hov ? 0.95 : 0.5} />
      </lineSegments>
      <mesh position={[0, 1.32, 0.01]}>
        <planeGeometry args={[2.1, 0.04]} />
        <meshBasicMaterial color={hov ? '#06B6D4' : color} transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

function ProjectCardsFallbackInner() {
  const tex1 = useTexture(IMAGES.project1)
  const tex2 = useTexture(IMAGES.project2)
  const texArr = [tex1, tex2, tex1, tex2]
  return (
    <group position={[6, 0, 0]}>
      {POSITIONS.map((pos, i) => (
        <FloatingPanel key={i} pos={pos} rot={ROTATIONS[i]} index={i} color={COLORS[i]} tex={texArr[i]} />
      ))}
    </group>
  )
}

export function ProjectCardsFallback() {
  return (
    <group position={[6, 0, 0]}>
      {POSITIONS.map((pos, i) => (
        <FloatingPanel key={i} pos={pos} rot={ROTATIONS[i]} index={i} color={COLORS[i]} />
      ))}
    </group>
  )
}

function ProjectCardsWithImages() {
  const img1 = useModelExists(IMAGES.project1)
  const img2 = useModelExists(IMAGES.project2)
  if (img1 === null || img2 === null) return <ProjectCardsFallback />
  if (!img1 || !img2) return <ProjectCardsFallback />
  return <Suspense fallback={<ProjectCardsFallback />}><ProjectCardsFallbackInner /></Suspense>
}

function HoloGLB() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF(MODELS.holoCard)
  const tex1 = useTexture(IMAGES.project1)
  const tex2 = useTexture(IMAGES.project2)
  const texArr = [tex1, tex2, tex1, tex2]

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.04
  })

  const clones = [0,1,2,3].map(i => {
    const cl = scene.clone(true)
    cl.traverse(c => {
      if ((c as THREE.Mesh).isMesh) {
        const mesh = c as THREE.Mesh
        const mat = (mesh.material as THREE.MeshStandardMaterial).clone()
        mat.emissive = new THREE.Color(0x3B82F6)
        mat.emissiveIntensity = 0.35
        if (mat.map !== undefined) mat.map = texArr[i]
        mesh.material = mat
      }
    })
    return { cl, pos: POSITIONS[i], rot: ROTATIONS[i] }
  })

  return (
    <group ref={groupRef} position={[6,0,0]}>
      {clones.map(({cl,pos,rot},i)=>(
        <group key={i} position={pos} rotation={rot}>
          <primitive object={cl} scale={0.8} />
        </group>
      ))}
    </group>
  )
}

function ProjectCardsSmart() {
  const glbExists = useModelExists(MODELS.holoCard)
  if (glbExists === null) return <ProjectCardsFallback />
  if (glbExists) return <Suspense fallback={<ProjectCardsFallback />}><HoloGLB /></Suspense>
  return <ProjectCardsWithImages />
}

export default function ProjectCards() { return <ProjectCardsSmart /> }
