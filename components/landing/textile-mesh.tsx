'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/* Animated woven fabric: a plane whose vertices ripple like cloth,
   with a wireframe overlay evoking warp & weft threads. Reacts to the pointer. */
function FabricMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const geometry = useMemo(() => new THREE.PlaneGeometry(7, 7, 48, 48), [])
  const basePositions = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry],
  )

  useFrame(({ clock, pointer: p }) => {
    pointer.current.x += (p.x - pointer.current.x) * 0.05
    pointer.current.y += (p.y - pointer.current.y) * 0.05
    const t = clock.getElapsedTime()
    const pos = geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = basePositions[i * 3]
      const y = basePositions[i * 3 + 1]
      const dist = Math.sqrt(x * x + y * y)
      const z =
        Math.sin(x * 0.9 + t * 1.1) * 0.28 +
        Math.cos(y * 0.9 + t * 0.9) * 0.28 +
        Math.sin(dist * 1.4 - t * 1.6) * 0.18 +
        // pointer-driven bulge
        Math.exp(-((x - pointer.current.x * 3.5) ** 2 + (y + pointer.current.y * 3.5) ** 2) / 4) *
          0.8
      pos.setZ(i, z)
    }
    pos.needsUpdate = true
    geometry.computeVertexNormals()

    const rotX = -0.5 + pointer.current.y * 0.25
    const rotZ = pointer.current.x * 0.18
    if (meshRef.current) {
      meshRef.current.rotation.x = rotX
      meshRef.current.rotation.z = rotZ
    }
  })

  return (
    <group scale={Math.min(viewport.width / 7, 1.25)}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={'#1b2a4a'}
          metalness={0.6}
          roughness={0.35}
          emissive={'#0a1830'}
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>
    </group>
  )
}

function FloatingParticles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={'#5fb8ff'}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export default function TextileMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} color={'#8ab4ff'} />
      <pointLight position={[-5, -3, 4]} intensity={2.2} color={'#34d399'} />
      <pointLight position={[3, -4, 2]} intensity={1.4} color={'#6366f1'} />
      <FabricMesh />
      <FloatingParticles />
    </Canvas>
  )
}
