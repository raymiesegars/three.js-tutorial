import React, { useEffect, useRef } from "react";
import birdScene from "../assets/3d/bird.glb";
import { useAnimations, useGLTF } from "@react-three/drei";

const Bird = () => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef)

  useEffect(() => {
    actions["Take 001"].play();
  }, [])
  return (
    <mesh ref={birdRef} position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
