
import React from "react";
import { Box } from "@react-three/drei";

const Bridge = () => {
  return (
    <group>
      {/* Bridge deck - dark gray flat box at z=5, from x:3 to x:7, y:4 to y:6 */}
      <Box 
        args={[4, 2, 0.5]} // width, depth, height
        position={[5, 5, 5]} // centered at x:5, y:5, z:5
      >
        <meshStandardMaterial color="#333333" />
      </Box>
      
      {/* Bridge pillars */}
      <Box
        args={[1, 1, 5]} // width, depth, height
        position={[3, 5, 2.5]} // left pillar
      >
        <meshStandardMaterial color="#403E43" />
      </Box>
      
      <Box
        args={[1, 1, 5]} // width, depth, height
        position={[7, 5, 2.5]} // right pillar
      >
        <meshStandardMaterial color="#403E43" />
      </Box>
      
      {/* Water surface below bridge */}
      <Box
        args={[10, 10, 0.1]} // width, depth, minimal height
        position={[5, 5, 0.05]} // just above the ground
      >
        <meshStandardMaterial color="#4d80b3" transparent opacity={0.7} />
      </Box>
    </group>
  );
};

export default Bridge;
