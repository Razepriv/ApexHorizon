import { useRef, useEffect } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Effects } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, RenderPass, UnrealBloomPass } from 'three/examples/jsm/postprocessing';

// Extend Three.js components
extend({ EffectComposer, RenderPass, UnrealBloomPass });

interface Scene3DProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  ambientLight?: boolean;
  spotLight?: boolean;
  controls?: boolean;
  bloom?: boolean;
  className?: string;
}

function Effects3D({ bloom = true }) {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<any>();

  useEffect(() => {
    if (!bloom) return;

    const effectComposer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.5, // Intensity
      0.4, // Radius
      0.85 // Threshold
    );

    effectComposer.addPass(renderPass);
    effectComposer.addPass(bloomPass);

    composer.current = effectComposer;

    return () => {
      effectComposer.dispose();
    };
  }, [gl, scene, camera, size, bloom]);

  useFrame(() => {
    if (composer.current && bloom) {
      composer.current.render();
    }
  }, 1);

  return null;
}

export default function Scene3D({
  children,
  cameraPosition = [0, 0, 5],
  ambientLight = true,
  spotLight = true,
  controls = true,
  bloom = true,
  className = '',
}: Scene3DProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: new THREE.Vector3(...cameraPosition), fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {ambientLight && (
          <ambientLight intensity={0.5} />
        )}

        {spotLight && (
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
        )}

        {controls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        )}

        {children}

        <Effects3D bloom={bloom} />
      </Canvas>
    </div>
  );
}