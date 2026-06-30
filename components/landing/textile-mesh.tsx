'use client'

import { Float, Sparkles, Stars } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/* ─── Woven fabric plane — vertex displacement + dual-layer materials ─── */
function FabricMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const geometry = useMemo(() => new THREE.PlaneGeometry(6.5, 6.5, 64, 64), [])
  const basePositions = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry],
  )

  useFrame(({ clock, pointer: p }) => {
    pointer.current.x += (p.x - pointer.current.x) * 0.06
    pointer.current.y += (p.y - pointer.current.y) * 0.06
    const t = clock.getElapsedTime()
    const pos = geometry.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const x = basePositions[i * 3]
      const y = basePositions[i * 3 + 1]
      const dist = Math.sqrt(x * x + y * y)
      const bulge = Math.exp(
        -((x - pointer.current.x * 3.2) ** 2 +
          (y + pointer.current.y * 3.2) ** 2) /
          3.5,
      )
      const z =
        Math.sin(x * 1.1 + t * 1.2) * 0.22 +
        Math.cos(y * 1.1 + t * 0.95) * 0.22 +
        Math.sin(dist * 1.6 - t * 1.8) * 0.14 +
        bulge * 1.1
      pos.setZ(i, z)
    }
    pos.needsUpdate = true
    geometry.computeVertexNormals()

    const rotX = -0.42 + pointer.current.y * 0.22
    const rotZ = pointer.current.x * 0.16
    const rotY = pointer.current.x * 0.08 + Math.sin(t * 0.25) * 0.04

    for (const ref of [meshRef, wireRef]) {
      if (ref.current) {
        ref.current.rotation.x = rotX
        ref.current.rotation.z = rotZ
        ref.current.rotation.y = rotY
      }
    }
  })

  const scale = Math.min(viewport.width / 6.5, 1.15)

  return (
    <group scale={scale}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#0f1f3d"
          metalness={0.85}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
          emissive="#1a3a6e"
          emissiveIntensity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={wireRef} geometry={geometry} scale={1.002}>
        <meshBasicMaterial
          color="#5fb8ff"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  )
}

/* ─── Orbiting thread rings ─── */
function ThreadRings() {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.y = t * 0.15
    group.current.rotation.x = Math.sin(t * 0.3) * 0.12
  })

  const rings = useMemo(
    () => [
      { r: 3.8, tube: 0.018, color: '#34d399', opacity: 0.7 },
      { r: 4.2, tube: 0.012, color: '#5fb8ff', opacity: 0.5 },
      { r: 4.6, tube: 0.008, color: '#a78bfa', opacity: 0.35 },
    ],
    [],
  )

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
          <torusGeometry args={[ring.r, ring.tube, 8, 128]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Floating thread spools ─── */
function ThreadSpools() {
  const spools = useMemo(
    () => [
      { pos: [-2.8, 1.6, 0.5] as const, color: '#34d399', speed: 1.2 },
      { pos: [2.6, -1.4, 0.8] as const, color: '#5fb8ff', speed: 1.6 },
      { pos: [-1.8, -2.2, 1.2] as const, color: '#818cf8', speed: 1.0 },
      { pos: [2.2, 2.0, 0.3] as const, color: '#2dd4bf', speed: 1.4 },
    ],
    [],
  )

  return (
    <>
      {spools.map((s, i) => (
        <Float
          key={i}
          speed={s.speed}
          rotationIntensity={0.5}
          floatIntensity={0.8}
        >
          <group position={s.pos}>
            <mesh>
              <torusGeometry args={[0.32, 0.07, 12, 36]} />
              <meshStandardMaterial
                color={s.color}
                metalness={0.95}
                roughness={0.08}
                emissive={s.color}
                emissiveIntensity={0.45}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
              <meshStandardMaterial
                color="#1a2744"
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  )
}

/* ─── Inner glow core ─── */
function GlowCore() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.06)
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.08 + Math.sin(t * 2) * 0.03
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.2, 32, 32]} />
      <meshBasicMaterial
        color="#5fb8ff"
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function Scene() {
  const { pointer } = useThree()
  const cameraGroup = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!cameraGroup.current) return
    cameraGroup.current.position.x = pointer.x * 0.35
    cameraGroup.current.position.y = pointer.y * 0.25
  })

  return (
    <group ref={cameraGroup}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.8} color="#8ab4ff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.6} color="#34d399" />
      <pointLight position={[-3, 2, 4]} intensity={2.5} color="#34d399" />
      <pointLight position={[4, -2, 3]} intensity={2} color="#6366f1" />
      <pointLight position={[0, 0, 2]} intensity={1.2} color="#5fb8ff" />

      <GlowCore />
      <ThreadRings />
      <FabricMesh />
      <ThreadSpools />

      <Sparkles
        count={80}
        scale={10}
        size={1.8}
        speed={0.3}
        opacity={0.55}
        color="#5fb8ff"
      />
      <Stars
        radius={50}
        depth={30}
        count={1200}
        factor={2}
        saturation={0}
        fade
        speed={0.4}
      />
    </group>
  )
}

export default function TextileMesh({ className }: { className?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      className={className ?? '!absolute inset-0'}
      style={{ touchAction: 'none' }}
    >
      <Scene />
    </Canvas>
  )
}
