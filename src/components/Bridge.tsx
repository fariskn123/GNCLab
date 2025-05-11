
import React from "react";
import { Box } from "@react-three/drei";

/**
 * Bridge component that renders a bridge with a deck and two pillars
 */
const Bridge: React.FC = () => {
  // Deck: X=3 to 7, Y=4 to 6, Z=5, thickness=0.5
  const deckWidth = 4; // 7-3
  const deckDepth = 2; // 6-4
  const deckHeight = 0.5;
  const deckPosition = [5, 5, 5]; // center position
  
  // Pillars: at (3,5) and (7,5), size 1×1×5
  const pillarSize = [1, 1, 5];
  const pillarHeight = 2.5; // half of the height for positioning
  const leftPillarPosition = [3, 5, pillarHeight];
  const rightPillarPosition = [7, 5, pillarHeight];
  
  // Colors
  const deckColor = "#333333"; // dark gray
  const pillarColor = "#8A898C"; // medium gray
  
  return (
    <group>
      {/* Bridge deck */}
      <Box 
        args={[deckWidth, deckDepth, deckHeight]} 
        position={deckPosition}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={deckColor} />
      </Box>
      
      {/* Left pillar */}
      <Box 
        args={pillarSize} 
        position={leftPillarPosition}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={pillarColor} />
      </Box>
      
      {/* Right pillar */}
      <Box 
        args={pillarSize} 
        position={rightPillarPosition}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={pillarColor} />
      </Box>
    </group>
  );
};

export default Bridge;
