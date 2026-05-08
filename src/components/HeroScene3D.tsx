import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Floating "video frame" plane — a thin emissive rectangle with a subtle
 * inner play-button glow. Used to suggest levitating editing timeline cards.
 */
const FrameCard = ({
  position,
  rotation,
  color,
  size = [1.6, 0.9],
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  size?: [number, number];
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.6}>
      <group position={position} rotation={rotation}>
        {/* Frame body */}
        <mesh ref={ref}>
          <planeGeometry args={size} />
          <meshBasicMaterial color={color} transparent opacity={0.07} />
        </mesh>
        {/* Border */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(size[0], size[1])]} />
          <lineBasicMaterial color={color} transparent opacity={0.55} />
        </lineSegments>
        {/* Inner play triangle */}
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.12, 3]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  );
};

/** Stacked translucent timeline bars drifting in depth */
const TimelineLayers = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
  });
  const bars = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        y: -1.2 + i * 0.18,
        z: -2 - i * 0.15,
        w: 4.5 - i * 0.2,
        opacity: 0.04 + i * 0.015,
      })),
    [],
  );
  return (
    <group ref={group} position={[2.5, -0.5, 0]} rotation={[0, -0.4, 0.05]}>
      {bars.map((b, i) => (
        <mesh key={i} position={[0, b.y, b.z]}>
          <planeGeometry args={[b.w, 0.12]} />
          <meshBasicMaterial color="#ff3c1e" transparent opacity={b.opacity} />
        </mesh>
      ))}
    </group>
  );
};

/** Glowing dust particles drifting upward */
const Particles = ({ count = 140 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      speeds[i] = 0.05 + Math.random() * 0.12;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffd700"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

/** Receding studio floor grid for cinematic depth */
const FloorGrid = () => {
  return (
    <gridHelper
      args={[24, 24, "#ff3c1e", "#2a1410"]}
      position={[0, -2.4, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

/** Subtle camera parallax following slow time */
const CameraRig = () => {
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.4;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.2;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const Scene = () => (
  <>
    <fog attach="fog" args={["#0a0303", 4, 14]} />
    <ambientLight intensity={0.4} />
    <pointLight position={[3, 2, 2]} intensity={1.2} color="#ff3c1e" />
    <pointLight position={[-3, -1, 2]} intensity={0.8} color="#ffd700" />

    <CameraRig />
    <FloorGrid />
    <TimelineLayers />

    {/* Floating frame cluster */}
    <FrameCard position={[-2.6, 0.8, -1]} rotation={[0, 0.35, 0.05]} color="#ff6a3d" />
    <FrameCard position={[-3.2, -0.6, -2.2]} rotation={[0, 0.45, -0.08]} color="#ffd700" size={[1.2, 0.7]} />
    <FrameCard position={[2.8, 1.2, -1.8]} rotation={[0, -0.5, -0.04]} color="#ff3c1e" size={[1.4, 0.8]} />
    <FrameCard position={[3.4, -1.4, -3]} rotation={[0, -0.3, 0.06]} color="#ffd700" size={[1.0, 0.6]} />
    <FrameCard position={[0.4, 1.9, -3.5]} rotation={[0, 0.05, -0.02]} color="#ff6a3d" size={[1.8, 1.0]} />
    <FrameCard position={[-1.2, -1.8, -2.5]} rotation={[0, 0.15, 0.03]} color="#ff3c1e" size={[1.1, 0.65]} />

    <Particles count={120} />
    <Stars radius={30} depth={20} count={600} factor={2} fade speed={0.4} />
  </>
);

const HeroScene3D = () => {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene3D;
