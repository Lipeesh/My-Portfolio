import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import Particles from './Particles'
import HeroModel from './HeroModel'
import NeuralNetwork from './NeuralNetwork'
import SkillsModel from './SkillsModel'
import ProjectCards from './ProjectCards'
import AiCore from './AiCore'

/* ── Camera positions per section ── */
const CAM_POS: [number, number, number][] = [
  [0,   0, 10],   // hero
  [3,   1,  7],   // about
  [5,   1,  8],   // skills
  [6,   2,  6],   // projects
  [0,   0,  5],   // contact
]
const CAM_LOOK: [number, number, number][] = [
  [0, 0, 0],
  [3, 0, 0],
  [5, 0, 0],
  [6, 0, 0],
  [0, 0, 0],
]

interface CameraRigProps {
  scrollProgress: number
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}

function CameraRig({ scrollProgress, mouseRef }: CameraRigProps) {
  const { camera } = useThree()
  const targetPos  = useRef(new THREE.Vector3(...CAM_POS[0]))
  const targetLook = useRef(new THREE.Vector3(...CAM_LOOK[0]))
  const curLook    = useRef(new THREE.Vector3(...CAM_LOOK[0]))

  useFrame(() => {
    const N = CAM_POS.length
    const raw = scrollProgress * (N - 1)
    const si  = Math.floor(raw)
    const sn  = Math.min(si + 1, N - 1)
    const t   = raw - si
    const ease = (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
    const et = ease(t)

    const cp = CAM_POS[si],  cn = CAM_POS[sn]
    const lp = CAM_LOOK[si], ln = CAM_LOOK[sn]

    targetPos.current.set(
      cp[0] + (cn[0] - cp[0]) * et,
      cp[1] + (cn[1] - cp[1]) * et,
      cp[2] + (cn[2] - cp[2]) * et,
    )

    // Mouse parallax on hero only
    if (scrollProgress < 0.12) {
      targetPos.current.x += mouseRef.current.x * 0.35
      targetPos.current.y -= mouseRef.current.y * 0.25
    }

    camera.position.lerp(targetPos.current, 0.055)

    targetLook.current.set(
      lp[0] + (ln[0] - lp[0]) * et,
      lp[1] + (ln[1] - lp[1]) * et,
      lp[2] + (ln[2] - lp[2]) * et,
    )
    curLook.current.lerp(targetLook.current, 0.055)
    camera.lookAt(curLook.current)
  })

  return null
}

function Lights() {
  const blueRef   = useRef<THREE.PointLight>(null!)
  const violetRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (blueRef.current)   blueRef.current.intensity   = 7 + Math.sin(t * 0.8) * 1.5
    if (violetRef.current) violetRef.current.intensity = 5 + Math.sin(t * 0.6 + 1) * 1.2
  })

  return (
    <>
      <ambientLight color="#050510" intensity={0.8} />
      <pointLight ref={blueRef}   color="#3B82F6" intensity={8}   distance={40} position={[-5,  4,  5]} />
      <pointLight ref={violetRef} color="#8B5CF6" intensity={5.5} distance={38} position={[ 5, -3,  5]} />
      <pointLight                 color="#06B6D4" intensity={4}   distance={30} position={[ 0,  5, -5]} />
    </>
  )
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, -5.5, 0]}>
      <planeGeometry args={[80, 80, 40, 40]} />
      <meshBasicMaterial color="#1a2a4a" wireframe transparent opacity={0.07} />
    </mesh>
  )
}

interface SceneProps {
  scrollProgress: number
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}

function SceneContent({ scrollProgress, mouseRef }: SceneProps) {
  return (
    <>
      <CameraRig scrollProgress={scrollProgress} mouseRef={mouseRef} />
      <Lights />
      <GridFloor />

      {/* Always-on particles in 3 colours */}
      <Particles count={400} spread={55} color="#3B82F6" size={0.055} speed={0.8} />
      <Particles count={220} spread={50} color="#8B5CF6" size={0.045} speed={0.6} />
      <Particles count={160} spread={45} color="#06B6D4" size={0.04}  speed={1.0} />

      {/* All models — each has its own error boundary + procedural fallback */}
      <HeroModel />
      <NeuralNetwork />
      <SkillsModel />
      <ProjectCards />
      <AiCore />
    </>
  )
}

interface ThreeSceneProps {
  scrollProgress: number
  sectionIndex: number
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}

export default function ThreeScene({ scrollProgress, mouseRef }: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 58, near: 0.1, far: 200 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
        alpha: false,
      }}
      style={{ background: '#03040A' }}
    >
      <SceneContent scrollProgress={scrollProgress} mouseRef={mouseRef} />
      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.28} luminanceSmoothing={0.9} height={400} />
      </EffectComposer>
    </Canvas>
  )
}
