
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

// Bridge component to represent a bridge structure 
const Bridge = () => {
  // Create a reference for animation if needed later
  const bridgeRef = useRef<THREE.Group>(null);
  
  // Position the bridge at Z=5 with pillars on both sides
  return (
    <group ref={bridgeRef}>
      {/* Bridge deck - dark gray, positioned at Z=5 with 0.5m thickness */}
      <Box 
        position={[5, 5, 5]} 
        args={[8, 0.5, 4]} 
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#333333" />
      </Box>
      
      {/* Left pillar */}
      <Box 
        position={[2.5, 2.75, 5]} 
        args={[1, 5, 4]} 
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#555555" />
      </Box>
      
      {/* Right pillar */}
      <Box 
        position={[7.5, 2.75, 5]} 
        args={[1, 5, 4]} 
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#555555" />
      </Box>
    </group>
  );
};

export default Bridge;
