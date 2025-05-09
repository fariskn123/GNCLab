
import React from "react";
import { Box } from "@react-three/drei";

const ConstructionSite = () => {
  return (
    <group>
      {/* Main building structure */}
      <Box args={[4, 3, 4]} position={[3, 1.5, 3]}>
        <meshStandardMaterial color="#888888" />
      </Box>
      
      {/* Construction equipment */}
      <Box args={[1, 1, 2]} position={[1, 0.5, 6]}>
        <meshStandardMaterial color="#FFA500" />
      </Box>
      
      {/* Container */}
      <Box args={[2, 1.2, 1]} position={[6, 0.6, 6]}>
        <meshStandardMaterial color="#2C75FF" />
      </Box>
      
      {/* Small equipment */}
      <Box args={[0.8, 0.5, 0.8]} position={[5, 0.25, 1]}>
        <meshStandardMaterial color="#993300" />
      </Box>
    </group>
  );
};

export default ConstructionSite;
