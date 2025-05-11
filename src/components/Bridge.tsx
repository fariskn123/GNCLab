
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const Bridge = () => {
  const deckRef = useRef<Mesh>(null);
  const pillar1Ref = useRef<Mesh>(null);
  const pillar2Ref = useRef<Mesh>(null);
  
  // Optional: Add animation or interaction logic here with useFrame if needed
  useFrame(() => {
    // Animation logic can go here
  });
  
  return (
    <>
      {/* Bridge deck */}
      <mesh 
        ref={deckRef}
        position={[5, 5, 5]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[4, 2, 0.5]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Pillars */}
      <mesh 
        ref={pillar1Ref}
        position={[3, 5, 2.5]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[1, 1, 5]} />
        <meshStandardMaterial color="#8A898C" />
      </mesh>
      
      <mesh 
        ref={pillar2Ref}
        position={[7, 5, 2.5]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[1, 1, 5]} />
        <meshStandardMaterial color="#8A898C" />
      </mesh>
    </>
  );
};

export default Bridge;
